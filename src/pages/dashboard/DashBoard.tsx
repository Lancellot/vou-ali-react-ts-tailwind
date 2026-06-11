import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar } from '../../services/Service';
import { Loader2, Map, MapPin, ListChecks, Receipt, DollarSign, Plane } from 'lucide-react';
import type { Dashboard } from '../../models/Dashbord';

function DashboardPage() {
    const { usuario } = useContext(AuthContext);
    const [data, setData] = useState<Dashboard | null>(null);
    const [loading, setLoading] = useState(false);

    async function carregarDashboard() {
        setLoading(true);
        try {
            await buscar('/dashboard', setData, {
                headers: { Authorization: usuario.token },
            });
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarDashboard();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center py-20">
                <Loader2 className="animate-spin text-teal-500" size={40} />
            </div>
        );
    }

    if (!data) {
        return (
            <div className="text-center py-20 text-gray-400">
                Nenhum dado do dashboard encontrado.
            </div>
        );
    }

    const cards = [
        { label: 'Total de viagens', value: data.totalViagens, icon: Map, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Locais visitados', value: data.totalParadas, icon: MapPin, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Atividades', value: data.totalAtividades, icon: ListChecks, color: 'text-amber-600', bg: 'bg-amber-50' },
        { label: 'Total de despesas', value: data.totalDespesas, icon: Receipt, color: 'text-red-600', bg: 'bg-red-50' },
        { label: 'Valor gasto', value: `R$ ${data.valorTotalDespesas.toFixed(2)}`, icon: DollarSign, color: 'text-red-700', bg: 'bg-red-50' },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-gray-800">Dashboard</h2>
                    <p className="text-gray-500 mt-1">Resumo das suas viagens e despesas</p>
                </div>
                <Plane className="text-gray-300" size={32} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
                {cards.map(({ label, value, icon: Icon, color, bg }) => (
                    <div key={label} className="bg-white shadow-sm border border-gray-100 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                            <div className={`${bg} ${color} rounded-lg p-1.5`}>
                                <Icon size={18} />
                            </div>
                            <p className="text-sm text-gray-500">{label}</p>
                        </div>
                        <h3 className={`text-2xl font-bold ${color}`}>{value}</h3>
                    </div>
                ))}
            </div>

            <div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">Viagens recentes</h3>

                {data.viagensRecentes.length === 0 ? (
                    <div className="bg-white border border-dashed border-gray-200 rounded-xl p-8 text-center text-gray-400">
                        Nenhuma viagem cadastrada ainda.
                    </div>
                ) : (
                    <div className="grid gap-3">
                        {data.viagensRecentes.map((viagem) => {
                            const totalDespesas =
                                viagem.despesas?.reduce(
                                    (total: number, despesa: any) => total + Number(despesa.valor),
                                    0
                                ) || 0;

                            return (
                                <div
                                    key={viagem.id}
                                    className="bg-white shadow-sm border border-gray-100 rounded-xl p-4 flex justify-between items-center hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="bg-teal-50 text-teal-600 rounded-lg p-2.5">
                                            <Plane size={18} />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800">{viagem.titulo}</p>
                                            <p className="text-sm text-gray-500">
                                                Total  · R$ {totalDespesas.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm text-gray-500">
                                            {viagem.dataInicio
                                                ? new Date(viagem.dataInicio).toLocaleDateString()
                                                : 'Sem data'}{' '}
                                            -{' '}
                                            {viagem.dataFim
                                                ? new Date(viagem.dataFim).toLocaleDateString()
                                                : 'Sem data'}
                                        </p>
                                        <p className="text-xs text-gray-400 mt-1">ID: {viagem.id}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

export default DashboardPage;