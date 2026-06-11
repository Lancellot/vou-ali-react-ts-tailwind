import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type { Parada } from '../../../models/Parada';
import type { Cidade } from '../../../models/Cidade';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import {
    ArrowLeft,
    Check,
    Loader2,
    MapPin,
    Plus,
    Route,
    Search,
} from 'lucide-react';
import ModalCidade from '../../cidade/modalcidade/ModalCidade';

function FormParada() {
    const navigate = useNavigate();
    const { id, viagemId } = useParams<{ id?: string; viagemId?: string }>();
    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState(false);
    const [parada, setParada] = useState<Parada>({} as Parada);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [viagem, setViagem] = useState<any>(null);
    const [cidadeBusca, setCidadeBusca] = useState('');
    const [mostrarModalCidade, setMostrarModalCidade] = useState(false);
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
    const isEditing = Boolean(id);


    async function buscarParadaPorId(id: string) {
        const data = await buscar(`/paradas/${id}`, undefined, {
            headers: { Authorization: token },
        });
        setParada({
            ...data,
            dataChegada: data.dataChegada?.split('T')[0],
            dataSaida: data.dataSaida?.split('T')[0],
        });

        if (data.cidade?.nome) {
            setCidadeBusca(data.cidade.nome);
        }
    }

    async function buscarCidades() {
        const data = await buscar('/cidades/all', undefined, {
            headers: { Authorization: token },
        });
        setCidades(data);
    }

    async function buscarViagem() {
        const data = await buscar(`/viagens/${viagemId}`, undefined, {
            headers: { Authorization: token },
        });
        setViagem(data);
    }

    useEffect(() => {
        buscarCidades();

        if (id) buscarParadaPorId(id);

        if (viagemId) {
            buscarViagem();
            setParada((prev) => ({ ...prev, viagemId: Number(viagemId) }));
        }
    }, [id, viagemId]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setParada((prev) => ({
            ...prev,
            [name]: ['ordem', 'viagemId', 'cidadeId'].includes(name)
                ? Number(value)
                : value,
        }));
    }

    async function salvarParada(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditing) {
                await atualizar(`/paradas/atualizar`, parada, setParada, {
                    headers: { Authorization: token },
                });
                ToastAlerta('Parada atualizada!', 'sucesso');
            } else {
                await cadastrar('/paradas/cadastrar', parada, setParada, {
                    headers: { Authorization: token },
                });
                ToastAlerta('Parada criada!', 'sucesso');
            }
            navigate(-1);
        } catch {
            ToastAlerta('Erro ao salvar parada', 'erro');
        } finally {
            setIsLoading(false);
        }
    }

    const cidadesFiltradas = cidades.filter((c) =>
        c.nome.toLowerCase().includes(cidadeBusca.toLowerCase())
    );

    const inputClass =
        'w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 transition-colors';

    const labelClass = 'block text-xs font-medium text-slate-500 mb-1.5 tracking-wide';

    return (
        <div className="max-w-lg mx-auto px-4 py-8">

            <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 mb-5 transition-colors"
            >
                <ArrowLeft size={14} />
                Voltar
            </button>

            <div className="bg-white border border-slate-200 rounded-2xl p-7">

                <h1 className="text-lg font-semibold text-slate-800 mb-1">
                    {isEditing ? 'Editar parada' : 'Nova parada'}
                </h1>
                <p className="text-sm text-slate-400 mb-6">
                    {isEditing
                        ? 'Atualize os dados desta parada.'
                        : 'Adicione uma cidade à sua rota de viagem.'}
                </p>

                {/* Referência da viagem */}
                <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 mb-6">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                        <Route size={15} className="text-teal-600" />
                    </div>
                    <div>
                        <p className="text-xs text-slate-400 leading-none mb-0.5">Viagem</p>
                        <p className="text-sm font-medium text-slate-700">
                            {viagem?.titulo ?? 'Carregando...'}
                        </p>
                    </div>
                </div>

                <form onSubmit={salvarParada} className="space-y-5">


                    <div>
                        <label className={labelClass}>Cidade</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={cidadeBusca}
                                onChange={(e) => {
                                    setCidadeBusca(e.target.value);
                                    setMostrarSugestoes(true);
                                }}
                                placeholder="Digite para buscar uma cidade..."
                                className={`${inputClass} pr-9`}
                                autoComplete="off"
                            />
                            <Search
                                size={14}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />

                            {mostrarSugestoes && cidadeBusca && (
                                <div className="absolute z-20 w-full mt-1 bg-white border border-slate-200 rounded-xl overflow-hidden">
                                    {cidadesFiltradas.slice(0, 6).map((cidade) => (
                                        <button
                                            key={cidade.id}
                                            type="button"
                                            onClick={() => {
                                                setParada((prev) => ({
                                                    ...prev,
                                                    cidadeId: cidade.id!,
                                                }));
                                                setCidadeBusca(cidade.nome);
                                                setMostrarSugestoes(false);
                                            }}
                                            className="w-full flex items-center gap-2.5 px-3 py-2.5 text-sm text-left hover:bg-slate-50 transition-colors"
                                        >
                                            <MapPin size={13} className="text-slate-400 shrink-0" />
                                            {cidade.nome}
                                        </button>
                                    ))}

                                    {cidadesFiltradas.length === 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setMostrarModalCidade(true)}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-teal-600 font-medium hover:bg-teal-50 transition-colors border-t border-slate-100"
                                        >
                                            <Plus size={14} />
                                            Criar "{cidadeBusca}"
                                        </button>
                                    )}

                                    {cidadesFiltradas.length > 0 && (
                                        <button
                                            type="button"
                                            onClick={() => setMostrarModalCidade(true)}
                                            className="w-full flex items-center gap-2 px-3 py-2.5 text-xs text-teal-600 font-medium hover:bg-teal-50 transition-colors border-t border-slate-100"
                                        >
                                            <Plus size={12} />
                                            Adicionar nova cidade
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className={labelClass}>Ordem na rota</label>
                        <input
                            type="number"
                            name="ordem"
                            value={parada.ordem || ''}
                            onChange={atualizarEstado}
                            min={1}
                            placeholder="1"
                            className={`${inputClass} w-28`}
                            required
                        />
                        <p className="text-xs text-slate-400 mt-1.5">
                            Posição desta cidade na sequência da viagem.
                        </p>
                    </div>

                    <div className="border-t border-slate-100 pt-5">
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wide mb-3">
                            Datas
                        </p>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className={labelClass}>Chegada</label>
                                <input
                                    type="date"
                                    name="dataChegada"
                                    value={parada.dataChegada || ''}
                                    onChange={atualizarEstado}
                                    className={inputClass}
                                />
                            </div>
                            <div>
                                <label className={labelClass}>Saída</label>
                                <input
                                    type="date"
                                    name="dataSaida"
                                    value={parada.dataSaida || ''}
                                    onChange={atualizarEstado}
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white text-sm font-medium transition-colors"
                        >
                            {isLoading ? (
                                <Loader2 size={15} className="animate-spin" />
                            ) : (
                                <Check size={15} />
                            )}
                            {isEditing ? 'Salvar alterações' : 'Criar parada'}
                        </button>
                    </div>
                </form>
            </div>

            <ModalCidade
                open={mostrarModalCidade}
                nomeInicial={cidadeBusca}
                onClose={() => setMostrarModalCidade(false)}
                onCreated={(cidade) => {
                    setCidades((prev) => [...prev, cidade]);
                    setParada((prev) => ({ ...prev, cidadeId: cidade.id! }));
                    setCidadeBusca(cidade.nome);
                    setMostrarModalCidade(false);
                }}
            />
        </div>
    );
}

export default FormParada;