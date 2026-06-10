import { useContext, useState } from 'react';
import { X, Check, Loader2, Receipt, Tag } from 'lucide-react';
import { AuthContext } from '../../../contexts/AuthContext';
import { cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import type { Despesa } from '../../../models/Despesa';

interface ModalDespesaProps {
    open: boolean;
    viagemId: number;
    onClose: () => void;
    onCreated: (despesa: Despesa) => void;
}

const CATEGORIAS = [
    'Hospedagem',
    'Alimentação',
    'Transporte',
    'Passeio',
    'Compras',
    'Outro',
];

function ModalDespesa({ open, viagemId, onClose, onCreated }: ModalDespesaProps) {
    const { usuario } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);
    const [despesa, setDespesa] = useState<Despesa>({
        descricao: '',
        valor: 0,
        categoria: '',
        data: '',
        viagemId,
    });

    if (!open) return null;

    function atualizarEstado(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        const { name, value } = e.target;
        setDespesa((prev) => ({
            ...prev,
            [name]: name === 'valor' ? Number(value) : value,
        }));
    }

    async function salvar(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);

        try {
            await cadastrar(
                '/despesas/cadastrar',
                { ...despesa, viagemId },
                (resp: Despesa) => { onCreated(resp); },
                { headers: { Authorization: usuario.token } }
            );

            ToastAlerta('Despesa cadastrada!', 'sucesso');
            onClose();
        } catch {
            ToastAlerta('Erro ao cadastrar despesa', 'erro');
        } finally {
            setLoading(false);
        }
    }

    const inputClass =
        'w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-600 transition-colors';

    const labelClass = 'block text-xs font-medium text-slate-500 mb-1.5 tracking-wide';

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
            onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
            <div className="bg-white border border-slate-200 rounded-2xl w-full max-w-md">

                {/* Cabeçalho */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-lg bg-teal-50 border border-teal-100 flex items-center justify-center">
                            <Receipt size={13} className="text-teal-600" />
                        </div>
                        <h2 className="text-base font-semibold text-slate-800">
                            Nova despesa
                        </h2>
                    </div>

                    <button
                        onClick={onClose}
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                        aria-label="Fechar"
                    >
                        <X size={15} />
                    </button>
                </div>

                {/* Formulário */}
                <form onSubmit={salvar} className="px-6 py-5 space-y-4">

                    <div>
                        <label className={labelClass}>Descrição</label>
                        <input
                            type="text"
                            name="descricao"
                            placeholder="Ex: Passagem aérea, hotel, jantar..."
                            value={despesa.descricao}
                            onChange={atualizarEstado}
                            className={inputClass}
                            required
                        />
                    </div>

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
                                    placeholder="0,00"
                                    value={despesa.valor || ''}
                                    onChange={atualizarEstado}
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
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>
                    </div>

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

                    {/* Rodapé */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-500 hover:bg-slate-50 transition-colors"
                        >
                            Cancelar
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white text-sm font-medium transition-colors"
                        >
                            {loading ? (
                                <Loader2 size={15} className="animate-spin" />
                            ) : (
                                <Check size={15} />
                            )}
                            Registrar despesa
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ModalDespesa;