import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import type { Parada } from '../../../models/Parada';
import { buscar } from '../../../services/Service';
import CardParada from '../cardparada/CardParada';
import { Link } from 'react-router-dom';
import { Plus, Loader2 } from 'lucide-react';

function ListaParadas() {
    const [paradas, setParadas] = useState<Parada[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const { usuario } = useContext(AuthContext);

    async function buscarParadas() {
        setIsLoading(true);
        try {
            await buscar('/paradas', setParadas, {
                headers: { Authorization: usuario.token },
            });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        buscarParadas();
    }, []);

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        Minhas Paradas
                    </h2>
                    <p className="text-gray-500 mt-1">
                        Gerencie as paradas das suas viagens
                    </p>
                </div>

                <Link
                    to="/cadastrarparada"
                    className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold px-4 py-2 rounded-xl transition-colors shadow"
                >
                    <Plus size={18} />
                    Nova Parada
                </Link>
            </div>

            {isLoading ? (
                <div className="flex justify-center items-center py-20">
                    <Loader2 className="animate-spin text-cyan-500" size={40} />
                </div>
            ) : paradas.length === 0 ? (
                <div className="text-center py-20 text-gray-400">
                    <p className="text-lg font-medium">
                        Nenhuma parada encontrada.
                    </p>
                    <p className="text-sm mt-1">
                        Adicione uma nova parada para sua viagem.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paradas.map((parada) => (
                        <CardParada key={parada.id} parada={parada} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListaParadas;