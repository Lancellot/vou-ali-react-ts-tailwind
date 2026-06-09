import { Link } from 'react-router-dom';
import type { Parada } from '../../../models/Parada';
import { MapPin, Calendar, Activity, Pencil, Trash2 } from 'lucide-react';

interface CardParadaProps {
    parada: Parada;
}

function CardParada({ parada }: CardParadaProps) {
    const formatarData = (data?: string) =>
        data
            ? new Date(data).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'short',
              })
            : '—';

    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                    <span className="bg-teal-100 text-teal-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        Parada #{parada.ordem}
                    </span>
                </div>
                <div className="flex gap-2">
                    <Link
                        to={`/editarparada/${parada.id}`}
                        className="text-gray-400 hover:text-teal-600 transition-colors"
                        title="Editar"
                    >
                        <Pencil size={15} />
                    </Link>
                    <Link
                        to={`/deletarparada/${parada.id}`}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                        title="Excluir"
                    >
                        <Trash2 size={15} />
                    </Link>
                </div>
            </div>

            {parada.cidade && (
                <div className="flex items-center gap-2 text-gray-700 font-semibold text-base">
                    <MapPin size={16} className="text-teal-500 shrink-0" />
                    <span>
                        {parada.cidade.nome}
                        {parada.cidade.pais && (
                            <span className="text-gray-400 font-normal">
                                {' '}· {parada.cidade.pais}
                            </span>
                        )}
                    </span>
                </div>
            )}

            <div className="flex items-center gap-2 text-gray-500 text-sm">
                <Calendar size={14} className="text-teal-400 shrink-0" />
                <span>
                    {formatarData(parada.dataChegada)} → {formatarData(parada.dataSaida)}
                </span>
            </div>

            {parada.atividades && parada.atividades.length > 0 && (
                <div className="flex items-center gap-2 text-gray-500 text-sm">
                    <Activity size={14} className="text-cyan-400 shrink-0" />
                    <span>{parada.atividades.length} atividade(s)</span>
                </div>
            )}
        </div>
    );
}

export default CardParada;