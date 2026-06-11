import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';
import { ToastAlerta } from '../../utils/ToastAlerta';
import ModalAtividade from '../../components/atividade/modalatividade/ModalAtividade';
import ModalDespesa from '../../components/despesa/modaldespesa/ModalDespesa';

import {
    Plus,
    Pencil,
    Trash2,
    MapPin,
    Calendar,
    Clock,
    Route,
    Receipt,
    CalendarDays,
} from 'lucide-react';

function DetalhesViagem() {
    const { id } = useParams();
    const { usuario } = useContext(AuthContext);
    const navigate = useNavigate();

    const [viagem, setViagem] = useState<any>(null);
    const [modalAtividade, setModalAtividade] = useState(false);
    const [paradaSelecionada, setParadaSelecionada] = useState<number | null>(null);
    const [modalDespesa, setModalDespesa] = useState(false);

    async function buscarViagemCompleta() {
        try {
            await buscar(`/viagens/${id}/completa`, setViagem, {
                headers: { Authorization: usuario.token },
            });
        } catch {
            ToastAlerta('Erro ao carregar viagem', 'erro');
        }
    }

    useEffect(() => {
        buscarViagemCompleta();
    }, [id]);

    if (!viagem) {
        return (
            <div className="flex justify-center items-center py-32 text-slate-400 text-sm">
                Carregando viagem...
            </div>
        );
    }

    const totalDespesas =
        viagem.despesas?.reduce(
            (total: number, despesa: any) => total + Number(despesa.valor),
            0
        ) || 0;

    const totalAtividades =
        viagem.paradas?.reduce(
            (acc: number, p: any) => acc + (p.atividades?.length || 0),
            0
        ) || 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex justify-between items-start gap-4">
                    <div>
                        <p className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                            <MapPin size={12} />
                            Destino
                        </p>
                        <h1 className="text-2xl font-semibold text-slate-800">
                            {viagem.titulo}
                        </h1>
                        {viagem.descricao && (
                            <p className="text-sm text-slate-500 mt-1">{viagem.descricao}</p>
                        )}
                    </div>
                    <button
                        onClick={() => navigate(`/editarviagem/${viagem.id}`)}
                        className="shrink-0 flex items-center gap-1.5 text-sm font-medium border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
                    >
                        <Pencil size={13} />
                        Editar
                    </button>
                </div>

                <div className="flex flex-wrap gap-4 mt-4">
                    <span className="flex items-center gap-1.5 text-sm text-slate-500">
                        <MapPin size={14} className="text-teal-600" />
                        {viagem.destino}
                    </span>
                    <span className="flex items-center gap-1.5 text-sm text-slate-500">
                        <Calendar size={14} className="text-teal-600" />
                        {viagem.dataInicio} → {viagem.dataFim}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Paradas</p>
                    <p className="text-xl font-semibold text-teal-600">
                        {viagem.paradas?.length || 0}
                    </p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Atividades</p>
                    <p className="text-xl font-semibold text-slate-800">{totalAtividades}</p>
                </div>
                <div className="bg-white border border-slate-200 rounded-xl p-4">
                    <p className="text-xs text-slate-400 mb-1">Total gasto</p>
                    <p className="text-xl font-semibold text-red-600">
                        R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-base font-semibold flex items-center gap-2 text-slate-800">
                        <Route size={16} className="text-teal-600" />
                        Paradas
                    </h2>
                    <button
                        onClick={() => navigate(`/cadastrar-parada/${viagem.id}`)}
                        className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                        <Plus size={14} />
                        Nova parada
                    </button>
                </div>

                {viagem.paradas?.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {viagem.paradas.map((parada: any) => (
                            <div
                                key={parada.id}
                                className="border border-slate-200 rounded-xl overflow-hidden"
                            >

                                <div className="bg-slate-50 px-4 py-3 flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold flex items-center justify-center">
                                                {parada.ordem}
                                            </span>
                                            <h3 className="font-semibold text-sm text-slate-800">
                                                {parada.cidade?.nome}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-slate-400 mt-1 flex items-center gap-1 ml-7">
                                            <CalendarDays size={11} />
                                            {parada.dataChegada?.split('T')[0]} → {parada.dataSaida?.split('T')[0]}
                                        </p>
                                    </div>
                                    <div className="flex gap-1.5">
                                        <button
                                            onClick={() => navigate(`/editar-parada/${parada.id}`)}
                                            className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center hover:bg-amber-100 transition-colors"
                                            title="Editar parada"
                                        >
                                            <Pencil size={12} className="text-amber-600" />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/deletar-parada/${parada.id}`)}
                                            className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center hover:bg-red-100 transition-colors"
                                            title="Excluir parada"
                                        >
                                            <Trash2 size={12} className="text-red-500" />
                                        </button>
                                    </div>
                                </div>

                                <div className="px-4 py-3">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wide">
                                            Atividades
                                        </span>
                                        <button
                                            onClick={() => {
                                                setParadaSelecionada(parada.id);
                                                setModalAtividade(true);
                                            }}
                                            className="flex items-center gap-1 text-teal-600 hover:text-teal-700 text-xs font-medium transition-colors"
                                        >
                                            <Plus size={12} />
                                            Adicionar
                                        </button>
                                    </div>

                                    {parada.atividades?.length > 0 ? (
                                        <ul className="space-y-1.5">
                                            {parada.atividades.map((atividade: any) => (
                                                <li
                                                    key={atividade.id}
                                                    className="bg-slate-50 rounded-lg px-3 py-2 flex justify-between items-center"
                                                >
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-700">
                                                            {atividade.titulo}
                                                        </p>
                                                        <div className="flex items-center gap-2 mt-0.5">
                                                            {atividade.categoria && (
                                                                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-50 text-teal-700 font-medium">
                                                                    {atividade.categoria}
                                                                </span>
                                                            )}
                                                            {atividade.dataHora && (
                                                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                                                    <Clock size={10} />
                                                                    {new Date(atividade.dataHora).toLocaleString('pt-BR', {
                                                                        day: '2-digit',
                                                                        month: 'short',
                                                                        hour: '2-digit',
                                                                        minute: '2-digit',
                                                                    })}
                                                                </span>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-1.5 ml-2 shrink-0">
                                                        <button
                                                            onClick={() => navigate(`/editar-atividade/${atividade.id}`)}
                                                            className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center hover:bg-amber-100 transition-colors"
                                                            title="Editar"
                                                        >
                                                            <Pencil size={12} className="text-amber-600" />
                                                        </button>
                                                        <button
                                                            onClick={() => navigate(`/deletar-atividade/${atividade.id}`)}
                                                            className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center hover:bg-red-100 transition-colors"
                                                            title="Excluir"
                                                        >
                                                            <Trash2 size={12} className="text-red-500" />
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-xs text-slate-400 py-2">
                                            Nenhuma atividade cadastrada
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-slate-400">Nenhuma parada cadastrada.</p>
                )}
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl p-6">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-base font-semibold flex items-center gap-2 text-slate-800">
                        <Receipt size={16} className="text-teal-600" />
                        Despesas
                    </h2>
                    <button
                        onClick={() => setModalDespesa(true)}
                        className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-3 py-1.5 rounded-lg transition-colors"
                    >
                        <Plus size={14} />
                        Nova despesa
                    </button>
                </div>

                {viagem.despesas?.length > 0 ? (
                    <>
                        <div className="divide-y divide-slate-100">
                            {viagem.despesas.map((despesa: any) => (
                                <div
                                    key={despesa.id}
                                    className="flex justify-between items-center py-3"
                                >
                                    <div>
                                        <p className="text-sm font-medium text-slate-700">
                                            {despesa.descricao}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-0.5">
                                            {despesa.categoria}
                                            {despesa.data && (
                                                <>
                                                    {' · '}
                                                    {new Date(despesa.data).toLocaleDateString('pt-BR', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })}
                                                </>
                                            )}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold text-red-600 min-w-[90px] text-right">
                                            R$ {Number(despesa.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                        </span>
                                        <button
                                            onClick={() => navigate(`/editar-despesa/${despesa.id}`)}
                                            className="w-7 h-7 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center hover:bg-amber-100 transition-colors"
                                            title="Editar despesa"
                                        >
                                            <Pencil size={12} className="text-amber-600" />
                                        </button>
                                        <button
                                            onClick={() => navigate(`/deletar-despesa/${despesa.id}`)}
                                            className="w-7 h-7 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center hover:bg-red-100 transition-colors"
                                            title="Excluir despesa"
                                        >
                                            <Trash2 size={12} className="text-red-500" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end items-center gap-3 pt-4 mt-2 border-t border-slate-100">
                            <span className="text-sm text-slate-400">Total da viagem</span>
                            <span className="text-lg font-semibold text-slate-800">
                                R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                            </span>
                        </div>
                    </>
                ) : (
                    <p className="text-sm text-slate-400">Nenhuma despesa cadastrada.</p>
                )}
            </div>

            {/* Modais */}
            {paradaSelecionada && (
                <ModalAtividade
                    open={modalAtividade}
                    paradaId={paradaSelecionada}
                    onClose={() => {
                        setModalAtividade(false);
                        setParadaSelecionada(null);
                    }}
                    onCreated={() => buscarViagemCompleta()}
                />
            )}

            {modalDespesa && (
                <ModalDespesa
                    open={modalDespesa}
                    viagemId={viagem.id}
                    onClose={() => setModalDespesa(false)}
                    onCreated={() => buscarViagemCompleta()}
                />
            )}
        </div>
    );
}

export default DetalhesViagem;