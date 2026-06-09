import { Link } from 'react-router-dom';
import type { Viagem } from '../../../models/Viagem';
import { MapPin, Calendar, ChevronRight, Trash2, Pencil } from 'lucide-react';

interface CardViagemProps {
    viagem: Viagem;
}

function CardViagem({ viagem }: CardViagemProps) {
    const formatarData = (data: string) =>
        new Date(data).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
            <div className="bg-linear-to-r from-teal-500 to-cyan-600 h-2 w-full" />

            <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                    {viagem.titulo}
                </h3>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <MapPin size={15} className="text-teal-500 shrink-0" />
                    <span className="line-clamp-1">{viagem.destino}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Calendar size={15} className="text-teal-500 shrink-0" />
                    <span>
                        {formatarData(viagem.dataInicio)} →{' '}
                        {formatarData(viagem.dataFim)}
                    </span>
                </div>

                {viagem.descricao && (
                    <p className="text-gray-500 text-sm line-clamp-2">
                        {viagem.descricao}
                    </p>
                )}

                <div className="flex gap-2 mt-auto pt-3 border-t border-gray-100">
                    <Link
                        to={`/editarviagem/${viagem.id}`}
                        className="flex items-center gap-1 text-sm text-teal-600 hover:text-teal-800 font-medium transition-colors"
                    >
                        <Pencil size={14} />
                        Editar
                    </Link>

                    <Link
                        to={`/deletarviagem/${viagem.id}`}
                        className="flex items-center gap-1 text-sm text-red-400 hover:text-red-600 font-medium transition-colors ml-auto"
                    >
                        <Trash2 size={14} />
                        Excluir
                    </Link>

                    <Link
                        to={`/detalhesviagem/${viagem.id}`}
                        className="flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-800 font-medium transition-colors"
                    >
                        Ver detalhes
                        <ChevronRight size={14} />
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CardViagem;