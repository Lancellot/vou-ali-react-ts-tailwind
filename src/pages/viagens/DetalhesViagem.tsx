import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';
import { ToastAlerta } from '../../utils/ToastAlerta';
import ModalAtividade from '../../components/atividade/modalatividade/ModalAtividade';

import {
    Plus,
    Pencil,
    Trash2,
} from 'lucide-react';

function DetalhesViagem() {
    const { id } = useParams();
    const { usuario } = useContext(AuthContext);
    const navigate = useNavigate();

    const [viagem, setViagem] = useState<any>();

    const [modalAtividade, setModalAtividade] = useState(false);
    const [paradaSelecionada, setParadaSelecionada] =
        useState<number | null>(null);

    async function buscarViagemCompleta() {
        try {
            await buscar(
                `/viagens/${id}/completa`,
                setViagem,
                {
                    headers: {
                        Authorization: usuario.token,
                    },
                }
            );
        } catch {
            ToastAlerta('Erro ao carregar viagem', 'erro');
        }
    }

    useEffect(() => {
        buscarViagemCompleta();
    }, [id]);

    if (!viagem) {
        return (
            <div className="flex justify-center py-20">
                Carregando...
            </div>
        );
    }

    const totalDespesas =
        viagem.despesas?.reduce(
            (total: number, despesa: any) =>
                total + Number(despesa.valor),
            0
        ) || 0;

    return (
        <div className="max-w-6xl mx-auto p-6">

            <div className="bg-white rounded-2xl shadow p-6 mb-6">
                <h1 className="text-4xl font-bold text-slate-800">
                    {viagem.titulo}
                </h1>

                <p className="text-slate-600 mt-2">
                    📍 {viagem.destino}
                </p>

                <p className="text-slate-500 mt-2">
                    {viagem.dataInicio} até {viagem.dataFim}
                </p>

                {viagem.descricao && (
                    <p className="mt-4 text-slate-700">
                        {viagem.descricao}
                    </p>
                )}
            </div>

            <div className="bg-white rounded-2xl shadow p-6 mb-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        🚏 Paradas
                    </h2>

                    <button
                        onClick={() =>
                            navigate(`/cadastrar-parada/${viagem.id}`)
                        }
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                        Nova Parada
                    </button>
                </div>

                <div className="space-y-4">
                    {viagem.paradas?.length > 0 ? (
                        viagem.paradas.map((parada: any) => (
                            <div
                                key={parada.id}
                                className="border rounded-xl p-4"
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {parada.cidade?.nome}
                                        </h3>

                                        <span className="text-sm text-gray-500">
                                            Ordem {parada.ordem}
                                        </span>
                                    </div>

                                    <div className="flex gap-2">

                                        <button
                                            onClick={() =>
                                                navigate(`/editar-parada/${parada.id}`)
                                            }
                                            className="p-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white"
                                            title="Editar parada"
                                        >
                                            <Pencil size={16} />
                                        </button>

                                        <button
                                            onClick={() =>
                                                navigate(`/deletar-parada/${parada.id}`)
                                            }
                                            className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                                            title="Excluir parada"
                                        >
                                            <Trash2 size={16} />
                                        </button>

                                    </div>
                                </div>

                                <p className="text-sm text-gray-500 mt-1">
                                    {parada.dataChegada} → {parada.dataSaida}
                                </p>

                                <div className="mt-4">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-semibold">
                                            Atividades
                                        </h4>

                                        <button
                                            className="flex items-center gap-1 text-teal-600 hover:text-teal-700 font-semibold"
                                            onClick={() => {
                                                setParadaSelecionada(
                                                    parada.id
                                                );
                                                setModalAtividade(true);
                                            }}
                                        >
                                            <Plus size={16} />
                                            Nova Atividade
                                        </button>
                                    </div>

                                    {parada.atividades?.length > 0 ? (
                                        <ul className="space-y-2">
                                            {parada.atividades.map(
                                                (atividade: any) => (
                                                    <li
                                                        key={atividade.id}
                                                        className="bg-slate-50 rounded-lg p-3 flex justify-between items-center"
                                                    >
                                                        <div>
                                                            <div className="font-medium">
                                                                {
                                                                    atividade.titulo
                                                                }
                                                            </div>

                                                            <div className="text-sm text-gray-500">
                                                                {
                                                                    atividade.categoria
                                                                }
                                                            </div>

                                                            {atividade.dataHora && (
                                                                <div className="text-xs text-gray-400">
                                                                    {new Date(
                                                                        atividade.dataHora
                                                                    ).toLocaleString(
                                                                        'pt-BR'
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>

                                                        <div className="flex gap-2">

                                                            <button
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/editar-atividade/${atividade.id}`
                                                                    )
                                                                }
                                                                className="p-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white"
                                                                title="Editar"
                                                            >
                                                                <Pencil size={16} />
                                                            </button>

                                                            <button
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/deletar-atividade/${atividade.id}`
                                                                    )
                                                                }
                                                                className="p-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                                                                title="Excluir"
                                                            >
                                                                <Trash2 size={16} />
                                                            </button>

                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-400">
                                            Nenhuma atividade cadastrada
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">
                            Nenhuma parada cadastrada.
                        </p>
                    )}
                </div>
            </div>

            {/* DESPESAS */}
            <div className="bg-white rounded-2xl shadow p-6">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">
                        💰 Despesas
                    </h2>

                    <button
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium"
                    >
                        Nova Despesa
                    </button>
                </div>

                {viagem.despesas?.length > 0 ? (
                    <>
                        <div className="space-y-3">
                            {viagem.despesas.map((despesa: any) => (
                                <div
                                    key={despesa.id}
                                    className="flex justify-between border-b pb-3"
                                >
                                    <div>
                                        <p className="font-medium">
                                            {despesa.descricao}
                                        </p>

                                        <p className="text-sm text-gray-500">
                                            {despesa.categoria}
                                        </p>
                                    </div>

                                    <div className="font-bold text-red-500">
                                        R$ {Number(
                                            despesa.valor
                                        ).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 border-t pt-4 text-right">
                            <span className="text-lg font-bold">
                                Total: R$ {totalDespesas.toFixed(2)}
                            </span>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-500">
                        Nenhuma despesa cadastrada.
                    </p>
                )}
            </div>

            {/* MODAL DE ATIVIDADE */}
            {paradaSelecionada && (
                <ModalAtividade
                    open={modalAtividade}
                    paradaId={paradaSelecionada}
                    onClose={() => {
                        setModalAtividade(false);
                        setParadaSelecionada(null);
                    }}
                    onCreated={() => {
                        buscarViagemCompleta();
                    }}
                />
            )}
        </div>
    );
}

export default DetalhesViagem;