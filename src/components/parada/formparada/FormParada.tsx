import { useContext, useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type { Parada } from '../../../models/Parada';
import type { Cidade } from '../../../models/Cidade';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { Loader2 } from 'lucide-react';

function FormParada() {
    const navigate = useNavigate();
    const { id, viagemId } = useParams<{ id?: string; viagemId?: string }>();
    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState(false);
    const [parada, setParada] = useState<Parada>({} as Parada);
    const [cidades, setCidades] = useState<Cidade[]>([]);
    const [viagem, setViagem] = useState<any>(null);

    const isEditing = Boolean(id);

    async function buscarParadaPorId(id: string) {
        await buscar(`/paradas/${id}`, setParada, {
            headers: { Authorization: token },
        });
    }

    async function buscarCidades() {
        await buscar('/cidades/all', setCidades, {
            headers: { Authorization: token },
        });
    }

    async function buscarViagem() {
        await buscar(`/viagens/${viagemId}`, setViagem, {
            headers: { Authorization: token },
        });
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
            [name]:
                name === 'ordem' || name === 'viagemId' || name === 'cidadeId'
                    ? Number(value)
                    : value,
        }));
    }

    async function salvarParada(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditing) {
                await atualizar('/paradas', parada, setParada, {
                    headers: { Authorization: token },
                });

                ToastAlerta('Parada atualizada com sucesso!', 'sucesso');
            } else {
                await cadastrar('/paradas/cadastrar', parada, setParada, {
                    headers: { Authorization: token },
                });

                ToastAlerta('Parada criada com sucesso!', 'sucesso');
            }

            navigate('/paradas');
        } catch {
            ToastAlerta('Erro ao salvar parada.', 'erro');
        } finally {
            setIsLoading(false);
        }
    }

    const inputClass =
        'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition';

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

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                        Ordem
                    </label>
                    <input
                        type="number"
                        name="ordem"
                        value={parada.ordem || ''}
                        onChange={atualizarEstado}
                        className={inputClass}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-600">
                            Data Chegada
                        </label>
                        <input
                            type="date"
                            name="dataChegada"
                            value={parada.dataChegada || ''}
                            onChange={atualizarEstado}
                            className={inputClass}
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-600">
                            Data Saída
                        </label>
                        <input
                            type="date"
                            name="dataSaida"
                            value={parada.dataSaida || ''}
                            onChange={atualizarEstado}
                            className={inputClass}
                        />
                    </div>
                </div>


                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                        Viagem
                    </label>

                    <div className="w-full border border-gray-200 rounded-xl px-4 py-2.5 bg-gray-50 text-gray-700">
                        {viagem?.titulo ?? 'Carregando viagem...'}
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                        Cidade
                    </label>

                    <select
                        name="cidadeId"
                        value={parada.cidadeId || ''}
                        onChange={atualizarEstado}
                        className={inputClass}
                        required
                    >
                        <option value="">Selecione uma cidade</option>

                        {cidades.map((cidade) => (
                            <option key={cidade.id} value={cidade.id}>
                                {cidade.nome}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors mt-2"
                >
                    {isLoading && (
                        <Loader2 size={18} className="animate-spin" />
                    )}
                    {isEditing ? 'Atualizar Parada' : 'Criar Parada'}
                </button>
            </form>
        </div>
    );
}

export default FormParada;