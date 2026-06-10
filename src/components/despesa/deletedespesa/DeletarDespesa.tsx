import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { buscar, deletar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import type { Despesa } from '../../../models/Despesa';

import {
    Loader2,
    Trash2,
    X,
} from 'lucide-react';

function DeletarDespesa() {
    const navigate = useNavigate();

    const { id } = useParams();

    const { usuario } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [despesa, setDespesa] =
        useState<Despesa>({} as Despesa);

    useEffect(() => {
        if (id) {
            buscar(
                `/despesas/${id}`,
                setDespesa,
                {
                    headers: {
                        Authorization:
                            usuario.token,
                    },
                }
            );
        }
    }, [id]);

    async function confirmarExclusao() {
        setLoading(true);

        try {
            await deletar(
                `/despesas/remover`,
                {
                    headers: {
                        Authorization:
                            usuario.token,
                    },
                }
            );

            ToastAlerta(
                'Despesa excluída!',
                'sucesso'
            );

            navigate(-1);
        } catch {
            ToastAlerta(
                'Erro ao excluir despesa',
                'erro'
            );
        }

        setLoading(false);
    }

    return (
        <div className="min-h-[60vh] flex justify-center items-center">

            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-4 rounded-full">
                        <Trash2 className="text-red-500" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-center">
                    Excluir Despesa
                </h2>

                <p className="text-center text-gray-500 mt-2">
                    Deseja realmente excluir:
                </p>

                <div className="bg-slate-50 rounded-xl p-4 my-6">
                    <p className="font-semibold">
                        {despesa.descricao}
                    </p>

                    <p className="text-sm text-gray-500">
                        {despesa.categoria}
                    </p>

                    <p className="text-red-500 font-bold mt-2">
                        R$ {despesa.valor}
                    </p>
                </div>

                <div className="flex gap-3">

                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 border rounded-xl py-2 flex justify-center items-center gap-2"
                    >
                        <X size={16} />
                        Cancelar
                    </button>

                    <button
                        onClick={confirmarExclusao}
                        disabled={loading}
                        className="flex-1 bg-red-500 text-white rounded-xl py-2 flex justify-center items-center gap-2"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin" />
                        ) : (
                            <Trash2 size={16} />
                        )}

                        Excluir
                    </button>

                </div>
            </div>
        </div>
    );
}

export default DeletarDespesa;