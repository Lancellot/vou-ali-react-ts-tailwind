import type { Parada } from '../../../models/Parada';
import {
    MapPin,
    Calendar,
    Hash,
    ChevronRight,
    Trash2,
    Pencil
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface CardParadaProps {
    parada: Parada;
}

function CardParada({ parada }: CardParadaProps) {

    const formatarData = (data?: string) => {
        if (!data) return '—';

        return new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
            
            <div className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 w-full" />

            <div className="p-5 flex flex-col gap-3 flex-1">

                <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {parada.cidade?.nome || 'Cidade não definida'}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Hash size={15} className="text-cyan-500 shrink-0" />
                    <span>Ordem: {parada.ordem}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar size={15} className="text-cyan-500 shrink-0" />
                    <span>
                        {formatarData(parada.dataChegada)} → {formatarData(parada.dataSaida)}
                    </span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={15} className="text-cyan-500 shrink-0" />
                    <span>
                        {parada.cidade?.estado} - {parada.cidade?.pais}
                    </span>
                </div>

                <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">

                    <Link
                        to={`/editarparada/${parada.id}`}
                        className="flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-800 font-medium"
                    >
                        <Pencil size={14} />
                        Editar
                    </Link>

                    <Link
                        to={`/deletarparada/${parada.id}`}
                        className="flex items-center gap-1 text-sm text-red-500 hover:text-red-700 font-medium ml-auto"
                    >
                        <Trash2 size={14} />
                        Excluir
                    </Link>

                    <Link
                        to={`/detalhesparada/${parada.id}`}
                        className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                        Ver detalhes
                        <ChevronRight size={14} />
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default CardParada;