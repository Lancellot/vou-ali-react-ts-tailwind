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
import { Loader2 } from 'lucide-react';

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

    const isEditing = Boolean(id);

    async function buscarParadaPorId(id: string) {
        const data = await buscar(`/paradas/${id}`, undefined, {
            headers: { Authorization: token },
        });

        setParada(data);
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

        if (id) {
            buscarParadaPorId(id);
        }

        if (viagemId) {
            buscarViagem();
            setParada((prev) => ({
                ...prev,
                viagemId: Number(viagemId),
            }));
        }
    }, [id, viagemId]);

    function atualizarEstado(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
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
        'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400';

    return (
        <div className="max-w-xl mx-auto px-4 py-10">

            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isEditing ? 'Editar Parada' : 'Nova Parada'}
            </h2>

            <p className="text-gray-500 mb-8">
                {isEditing
                    ? 'Atualize os dados da parada.'
                    : 'Crie uma nova parada para sua viagem.'}
            </p>

            <form onSubmit={salvarParada} className="flex flex-col gap-5">

                <input
                    type="number"
                    name="ordem"
                    value={parada.ordem || ''}
                    onChange={atualizarEstado}
                    placeholder="Ordem"
                    className={inputClass}
                    required
                />

                <div className="grid grid-cols-2 gap-4">
                    <input
                        type="date"
                        name="dataChegada"
                        value={parada.dataChegada || ''}
                        onChange={atualizarEstado}
                        className={inputClass}
                    />

                    <input
                        type="date"
                        name="dataSaida"
                        value={parada.dataSaida || ''}
                        onChange={atualizarEstado}
                        className={inputClass}
                    />
                </div>

                <div className="p-3 bg-gray-50 rounded-xl text-gray-700">
                    {viagem?.titulo ?? 'Carregando viagem...'}
                </div>

                <div className="relative">

                    <label className="text-sm font-semibold text-gray-600">
                        Cidade
                    </label>

                    <input
                        type="text"
                        value={cidadeBusca}
                        onChange={(e) => setCidadeBusca(e.target.value)}
                        placeholder="Digite a cidade..."
                        className={inputClass}
                    />

                    {cidadeBusca && (
                        <div className="absolute z-10 w-full bg-white border rounded-xl shadow max-h-48 overflow-auto">

                            {cidadesFiltradas.map((cidade) => (
                                <div
                                    key={cidade.id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setParada((prev) => ({
                                            ...prev,
                                            cidadeId: cidade.id!,
                                        }));

                                        setCidadeBusca(cidade.nome);
                                    }}
                                >
                                    {cidade.nome}
                                </div>
                            ))}

                            {cidadesFiltradas.length === 0 && (
                                <button
                                    type="button"
                                    onClick={() => setMostrarModalCidade(true)}
                                    className="w-full text-left px-4 py-2 text-cyan-600 font-semibold hover:bg-gray-100"
                                >
                                    + Criar "{cidadeBusca}"
                                </button>
                            )}
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 rounded-xl"
                >
                    {isLoading && <Loader2 size={18} className="animate-spin" />}
                    {isEditing ? 'Atualizar' : 'Criar'}
                </button>
            </form>

            <ModalCidade
                open={mostrarModalCidade}
                nomeInicial={cidadeBusca}
                onClose={() => setMostrarModalCidade(false)}
                onCreated={(cidade) => {
                    setCidades((prev) => [...prev, cidade]);

                    setParada((prev) => ({
                        ...prev,
                        cidadeId: cidade.id!,
                    }));

                    setCidadeBusca(cidade.nome);
                    setMostrarModalCidade(false);
                }}
            />
        </div>
    );
}

export default FormParada;