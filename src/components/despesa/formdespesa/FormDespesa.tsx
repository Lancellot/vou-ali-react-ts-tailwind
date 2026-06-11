import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
} from 'react';

import { useNavigate, useParams } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext';

import type { Despesa } from '../../../models/Despesa';

import {
    atualizar,
    buscar,
    cadastrar,
} from '../../../services/Service';

import { ToastAlerta } from '../../../utils/ToastAlerta';

import { Loader2 } from 'lucide-react';

function FormDespesa() {
    const navigate = useNavigate();

    const { id, viagemId } = useParams<{
        id?: string;
        viagemId?: string;
    }>();

    const { usuario } = useContext(AuthContext);

    const token = usuario.token;

    const [isLoading, setIsLoading] = useState(false);

    const [viagem, setViagem] = useState<any>(null);

    const [despesa, setDespesa] = useState<Despesa>({
        descricao: '',
        valor: 0,
        categoria: '',
        data: '',
        viagemId: viagemId
            ? Number(viagemId)
            : undefined,
    });

    const isEditing = Boolean(id);

    useEffect(() => {
        if (id) {
            buscarDespesa(id);
        }

        if (viagemId) {
            buscarViagem();
        }
    }, [id, viagemId]);

    async function buscarDespesa(id: string) {
        try {
            const resposta = await buscar(
                `/despesas/${id}`,
                undefined,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setDespesa(resposta);
        } catch {
            ToastAlerta(
                'Erro ao buscar despesa',
                'erro'
            );
        }
    }

    async function buscarViagem() {
        try {
            const resposta = await buscar(
                `/viagens/${viagemId}`,
                undefined,
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );

            setViagem(resposta);
        } catch {
            ToastAlerta(
                'Erro ao buscar viagem',
                'erro'
            );
        }
    }

    function atualizarEstado(
        e: ChangeEvent<
            HTMLInputElement | HTMLSelectElement
        >
    ) {
        const { name, value } = e.target;

        setDespesa({
            ...despesa,
            [name]:
                name === 'valor'
                    ? Number(value)
                    : value,
        });
    }

    async function salvarDespesa(
        e: React.FormEvent<HTMLFormElement>
    ) {
        e.preventDefault();

        setIsLoading(true);

        try {
            if (isEditing) {
                await atualizar(
                    '/despesas/atualizar',
                    despesa,
                    setDespesa,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                ToastAlerta(
                    'Despesa atualizada com sucesso!',
                    'sucesso'
                );
            } else {
                await cadastrar(
                    '/despesas/cadastrar',
                    despesa,
                    setDespesa,
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );

                ToastAlerta(
                    'Despesa cadastrada com sucesso!',
                    'sucesso'
                );
            }

            navigate(-1);
        } catch {
            ToastAlerta(
                'Erro ao salvar despesa!',
                'erro'
            );
        } finally {
            setIsLoading(false);
        }
    }

    const inputClass =
        'w-full border border-gray-200 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-400';

    return (
        <div className="max-w-xl mx-auto py-10 px-4">

            <h1 className="text-3xl font-bold text-slate-800 mb-2">
                {isEditing
                    ? 'Editar Despesa'
                    : 'Nova Despesa'}
            </h1>

            <p className="text-gray-500 mb-8">
                {isEditing
                    ? 'Atualize os dados da despesa.'
                    : 'Cadastre uma nova despesa para a viagem.'}
            </p>

            <form
                onSubmit={salvarDespesa}
                className="bg-white rounded-2xl shadow p-6 flex flex-col gap-5"
            >
                <input
                    type="text"
                    name="descricao"
                    value={despesa.descricao}
                    onChange={atualizarEstado}
                    placeholder="Descrição da despesa"
                    className={inputClass}
                    required
                />

                <input
                    type="number"
                    step="0.01"
                    min="0"
                    name="valor"
                    value={despesa.valor}
                    onChange={atualizarEstado}
                    placeholder="Valor"
                    className={inputClass}
                    required
                />

                <select
                    name="categoria"
                    value={despesa.categoria}
                    onChange={atualizarEstado}
                    className={inputClass}
                    required
                >
                    <option value="">
                        Selecione uma categoria
                    </option>

                    <option value="Hospedagem">
                        Hospedagem
                    </option>

                    <option value="Alimentação">
                        Alimentação
                    </option>

                    <option value="Transporte">
                        Transporte
                    </option>

                    <option value="Passeio">
                        Passeio
                    </option>

                    <option value="Compras">
                        Compras
                    </option>

                    <option value="Outro">
                        Outro
                    </option>
                </select>

                <input
                    type="date"
                    name="data"
                    value={despesa.data || ''}
                    onChange={atualizarEstado}
                    className={inputClass}
                />

                {viagem && (
                    <div className="bg-slate-50 border rounded-xl p-4">
                        <p className="text-sm text-gray-500">
                            Viagem
                        </p>

                        <p className="font-semibold text-slate-700">
                            {viagem.titulo}
                        </p>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl flex justify-center items-center gap-2 transition"
                >
                    {isLoading && (
                        <Loader2
                            size={18}
                            className="animate-spin"
                        />
                    )}

                    {isEditing
                        ? 'Atualizar Despesa'
                        : 'Cadastrar Despesa'}
                </button>
            </form>
        </div>
    );
}

export default FormDespesa;