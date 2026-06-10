import { useContext, useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type { Atividade } from '../../../models/Atividade';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { Loader2 } from 'lucide-react';

function FormAtividade() {
    const navigate = useNavigate();

    const { id, paradaId } = useParams<{
        id?: string;
        paradaId?: string;
    }>();

    const { usuario } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);

    const [atividade, setAtividade] = useState<Atividade>({
        titulo: '',
        categoria: '',
        dataHora: '',
        paradaId: paradaId ? Number(paradaId) : undefined,
    });

    const isEditing = Boolean(id);

    useEffect(() => {
        if (id) {
            buscarAtividade(id);
        }
    }, [id]);

    async function buscarAtividade(id: string) {
        try {
            const resposta = await buscar(
                `/atividades/${id}`,
                undefined,
                {
                    headers: {
                        Authorization: usuario.token,
                    },
                }
            );

            setAtividade(resposta);
        } catch {
            ToastAlerta('Erro ao carregar atividade', 'erro');
        }
    }

    function atualizarEstado(
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setAtividade({
            ...atividade,
            [e.target.name]: e.target.value,
        });
    }

    async function gerarNovaAtividade(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setIsLoading(true);

        try {
            if (isEditing) {
                await atualizar(
                    '/atividades',
                    atividade,
                    setAtividade,
                    {
                        headers: {
                            Authorization: usuario.token,
                        },
                    }
                );

                ToastAlerta(
                    'Atividade atualizada com sucesso!',
                    'sucesso'
                );
            } else {
                await cadastrar(
                    '/atividades/cadastrar',
                    atividade,
                    setAtividade,
                    {
                        headers: {
                            Authorization: usuario.token,
                        },
                    }
                );

                ToastAlerta(
                    'Atividade criada com sucesso!',
                    'sucesso'
                );
            }

            navigate(`/detalhes-viagem/${atividade.paradaId}`);
        } catch {
            ToastAlerta(
                'Erro ao salvar atividade!',
                'erro'
            );
        }

        setIsLoading(false);
    }

    return (
        <div className="max-w-xl mx-auto py-10 px-4">

            <h1 className="text-3xl font-bold mb-6">
                {isEditing
                    ? 'Editar Atividade'
                    : 'Nova Atividade'}
            </h1>

            <form
                onSubmit={gerarNovaAtividade}
                className="space-y-4 bg-white p-6 rounded-2xl shadow"
            >
                <input
                    type="text"
                    name="titulo"
                    value={atividade.titulo}
                    onChange={atualizarEstado}
                    placeholder="Título"
                    className="w-full border rounded-lg p-3"
                    required
                />

                <select
                    name="categoria"
                    value={atividade.categoria}
                    onChange={atualizarEstado}
                    className="w-full border rounded-lg p-3"
                    required
                >
                    <option value="">Selecione</option>
                    <option value="Passeio">
                        Passeio
                    </option>
                    <option value="Restaurante">
                        Restaurante
                    </option>
                    <option value="Evento">
                        Evento
                    </option>
                    <option value="Compras">
                        Compras
                    </option>
                    <option value="Outro">
                        Outro
                    </option>
                </select>

                <input
                    type="datetime-local"
                    name="dataHora"
                    value={atividade.dataHora}
                    onChange={atualizarEstado}
                    className="w-full border rounded-lg p-3"
                />

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-teal-600 text-white py-3 rounded-lg font-bold flex justify-center items-center gap-2"
                >
                    {isLoading && (
                        <Loader2 className="animate-spin" />
                    )}

                    {isEditing
                        ? 'Atualizar'
                        : 'Cadastrar'}
                </button>
            </form>
        </div>
    );
}

export default FormAtividade;