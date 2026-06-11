import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type { Despesa } from '../../../models/Despesa';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import {
    ArrowLeft,
    Check,
    Loader2,
    Receipt,
    Route,
    Tag,
} from 'lucide-react';

const CATEGORIAS = [
    { value: 'Hospedagem', label: 'Hospedagem' },
    { value: 'Alimentação', label: 'Alimentação' },
    { value: 'Transporte', label: 'Transporte' },
    { value: 'Passeio', label: 'Passeio' },
    { value: 'Compras', label: 'Compras' },
    { value: 'Outro', label: 'Outro' },
];

function FormDespesa() {
    const navigate = useNavigate();
    const { id, viagemId } = useParams<{ id?: string; viagemId?: string }>();
    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState(false);
    const [viagem, setViagem] = useState<any>(null);
    const [despesa, setDespesa] = useState<Despesa>({
        descricao: '',
        valor: 0,
        categoria: '',
        data: '',
        viagemId: viagemId ? Number(viagemId) : undefined,
    });

    const isEditing = Boolean(id);

    useEffect(() => {
        if (id) buscarDespesa(id);
        if (viagemId) buscarViagem();
    }, [id, viagemId]);

    async function buscarDespesa(id: string) {
        try {
            const resposta = await buscar(`/despesas/${id}`, undefined, {
                headers: { Authorization: token },
            });
            setDespesa(resposta);
        } catch {
            ToastAlerta('Erro ao buscar despesa', 'erro');
        }
    }

    async function buscarViagem() {
        try {
            const resposta = await buscar(`/viagens/${viagemId}`, undefined, {
                headers: { Authorization: token },
            });
            setViagem(resposta);
        } catch {
            ToastAlerta('Erro ao buscar viagem', 'erro');
        }
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setDespesa((prev) => ({
            ...prev,
            [name]: name === 'valor' ? Number(value) : value,
        }));
    }

    async function salvarDespesa(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        try {
            if (isEditing) {
                await atualizar('/despesas/atualizar', despesa, setDespesa, {
                    headers: { Authorization: token },
                });
                ToastAlerta('Despesa atualizada com sucesso!', 'sucesso');
            } else {
                await cadastrar('/despesas/cadastrar', despesa, setDespesa, {
                    headers: { Authorization: token },
                });
                ToastAlerta('Despesa cadastrada com sucesso!', 'sucesso');
            }
            navigate(-1);
        } catch {
            ToastAlerta('Erro ao salvar despesa!', 'erro');
        } finally {
            setIsLoading(false);
        }
    }

    const inputClass =
        'w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 transition-colors';

    const labelClass = 'block text-xs font-medium text-slate-500 mb-1.5 tracking-wide';

    return (
        <div className="max-w-lg mx-auto px-4 py-8">

            <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 mb-5 transition-colors"
            >
                <ArrowLeft size={14} />
                Voltar
            </button>

            <div className="bg-white border border-slate-200 rounded-2xl p-7">

                <div className="flex items-center gap-3 mb-1">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                        <Receipt size={15} className="text-teal-600" />
                    </div>
                    <h1 className="text-lg font-semibold text-slate-800">
                        {isEditing ? 'Editar despesa' : 'Nova despesa'}
                    </h1>
                </div>
                <p className="text-sm text-slate-400 mb-6 ml-11">
                    {isEditing
                        ? 'Atualize os dados desta despesa.'
                        : 'Registre um gasto para esta viagem.'}
                </p>

                {/* Referência da viagem */}
                {viagem && (
                    <div className="flex items-center gap-3 bg-slate-50 border border-slate-100 rounded-xl px-3 py-2.5 mb-6">
                        <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                            <Route size={13} className="text-teal-600" />
                        </div>
                        <div>
                            <p className="text-xs text-slate-400 leading-none mb-0.5">Viagem</p>
                            <p className="text-sm font-medium text-slate-700">{viagem.titulo}</p>
                        </div>
                    </div>
                )}

                <form onSubmit={salvarDespesa} className="space-y-4">

                    {/* Descrição */}
                    <div>
                        <label className={labelClass}>Descrição</label>
                        <input
                            type="text"
                            name="descricao"
                            value={despesa.descricao}
                            onChange={atualizarEstado}
                            placeholder="Ex: Passagem aérea, hotel, jantar..."
                            className={inputClass}
                            required
                        />
                    </div>

                    {/* Valor + Categoria lado a lado */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className={labelClass}>Valor (R$)</label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400 pointer-events-none">
                                    R$
                                </span>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    name="valor"
                                    value={despesa.valor || ''}
                                    onChange={atualizarEstado}
                                    placeholder="0,00"
                                    className={`${inputClass} pl-9`}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelClass}>
                                <Tag size={11} className="inline mb-0.5 mr-1" />
                                Categoria
                            </label>
                            <select
                                name="categoria"
                                value={despesa.categoria}
                                onChange={atualizarEstado}
                                className={inputClass}
                                required
                            >
                                <option value="">Selecionar...</option>
                                {CATEGORIAS.map((cat) => (
                                    <option key={cat.value} value={cat.value}>
                                        {cat.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Data */}
                    <div>
                        <label className={labelClass}>Data</label>
                        <input
                            type="date"
                            name="data"
                            value={despesa.data || ''}
                            onChange={atualizarEstado}
                            className={`${inputClass} w-48`}
                        />
                    </div>

                    {/* Botões */}
                    <div className="flex gap-3 pt-3">
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white text-sm font-medium transition-colors"
                        >
                            {isLoading ? (
                                <Loader2 size={15} className="animate-spin" />
                            ) : (
                                <Check size={15} />
                            )}
                            {isEditing ? 'Salvar alterações' : 'Registrar despesa'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormDespesa;