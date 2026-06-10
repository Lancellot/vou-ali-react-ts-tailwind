import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type { Parada } from '../../../models/Parada';
import { buscar, deletar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { Loader2, Trash2, X } from 'lucide-react';

function DeletarParada() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState(false);
    const [parada, setParada] = useState<Parada | null>(null);

    useEffect(() => {
        buscar(`/paradas/${id}`, setParada, {
            headers: { Authorization: token },
        });
    }, [id]);

    async function confirmarDelecao() {
        setIsLoading(true);
        try {
            await deletar(`/paradas/${id}`, {
                headers: { Authorization: token },
            });

            ToastAlerta('Parada excluída com sucesso!', 'sucesso');
            navigate('/paradas');
        } catch {
            ToastAlerta('Erro ao excluir parada.', 'erro');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-[60vh] flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">

                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-4 rounded-full">
                        <Trash2 size={32} className="text-red-500" />
                    </div>
                </div>

                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Excluir Parada
                </h2>

                <p className="text-gray-500 mb-1">
                    Você está prestes a excluir:
                </p>

                <p className="text-lg font-semibold text-gray-800 mb-1">
                    Ordem: {parada?.ordem ?? '...'}
                </p>

                <p className="text-gray-400 text-sm mb-8">
                    Data Chegada: {parada?.dataChegada ?? '...'} <br />
                    Data Saída: {parada?.dataSaida ?? '...'} <br />
                    Esta ação não pode ser desfeita.
                </p>

                <div className="flex gap-3 justify-center">
                    <button
                        onClick={() => navigate('/paradas')}
                        className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold px-5 py-2.5 rounded-xl transition"
                    >
                        <X size={16} />
                        Cancelar
                    </button>

                    <button
                        onClick={confirmarDelecao}
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold px-5 py-2.5 rounded-xl transition"
                    >
                        {isLoading ? (
                            <Loader2 size={16} className="animate-spin" />
                        ) : (
                            <Trash2 size={16} />
                        )}
                        Confirmar exclusão
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletarParada;