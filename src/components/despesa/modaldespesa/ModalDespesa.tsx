import { useContext, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { AuthContext } from '../../../contexts/AuthContext';
import { cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import type { Despesa } from '../../../models/Despesa';

interface ModalDespesaProps {
    open: boolean;
    viagemId: number;
    onClose: () => void;
    onCreated: (despesa: Despesa) => void;
}

function ModalDespesa({
    open,
    viagemId,
    onClose,
    onCreated,
}: ModalDespesaProps) {
    const { usuario } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [despesa, setDespesa] = useState<Despesa>({ 
        descricao: '',
        valor: 0,
        categoria: '',
        data: '',
        viagemId,
    });

    if (!open) return null;

    function atualizarEstado(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
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

    async function salvar(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        try {
            await cadastrar(
                '/despesas/cadastrar',
                {
                    ...despesa,
                    viagemId,
                },
                (resp: Despesa) => {
                    onCreated(resp);
                },
                {
                    headers: {
                        Authorization: usuario.token,
                    },
                }
            );

            ToastAlerta(
                'Despesa cadastrada!',
                'sucesso'
            );

            onClose();
        } catch {
            ToastAlerta(
                'Erro ao cadastrar despesa',
                'erro'
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">
                        Nova Despesa
                    </h2>

                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                <form
                    onSubmit={salvar}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="descricao"
                        placeholder="Descrição"
                        value={despesa.descricao}
                        onChange={atualizarEstado}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <input
                        type="number"
                        step="0.01"
                        name="valor"
                        placeholder="Valor"
                        value={despesa.valor}
                        onChange={atualizarEstado}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <select
                        name="categoria"
                        value={despesa.categoria}
                        onChange={atualizarEstado}
                        className="w-full border rounded-lg p-3"
                        required
                    >
                        <option value="">
                            Categoria
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

                        <option value="Outro">
                            Outro
                        </option>
                    </select>

                    <input
                        type="date"
                        name="data"
                        value={despesa.data}
                        onChange={atualizarEstado}
                        className="w-full border rounded-lg p-3"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-600 text-white rounded-lg py-3 font-bold"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin mx-auto" />
                        ) : (
                            'Salvar'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalDespesa;