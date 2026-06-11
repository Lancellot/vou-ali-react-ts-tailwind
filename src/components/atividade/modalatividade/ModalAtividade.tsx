import { useContext, useState } from 'react';
import { X, Loader2 } from 'lucide-react';
import { AuthContext } from '../../../contexts/AuthContext';
import type { Atividade } from '../../../models/Atividade';
import { cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';

interface ModalAtividadeProps {
    open: boolean;
    paradaId: number;
    onClose: () => void;
    onCreated: (atividade: Atividade) => void;
}

function ModalAtividade({
    open,
    paradaId,
    onClose,
    onCreated,
}: ModalAtividadeProps) {
    const { usuario } = useContext(AuthContext);

    const [loading, setLoading] = useState(false);

    const [atividade, setAtividade] = useState<Atividade>({
        titulo: '',
        categoria: '',
        dataHora: '',
        paradaId,
    });

    if (!open) return null;

    function atualizarEstado(
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) {
        setAtividade({
            ...atividade,
            [e.target.name]: e.target.value,
        });
    }

    async function salvar(e: React.FormEvent) {
        e.preventDefault();

        setLoading(true);

        try {
            const novaAtividade = {
                ...atividade,
                paradaId,
            };

            await cadastrar(
                '/atividades/cadastrar',
                novaAtividade,
                (resp: Atividade) => {
                    onCreated(resp);
                },
                {
                    headers: {
                        Authorization: usuario.token,
                    },
                }
            );

            ToastAlerta('Atividade criada!', 'sucesso');

            onClose();
        } catch {
            ToastAlerta('Erro ao criar atividade', 'erro');
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 w-full max-w-md">

                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold">
                        Nova Atividade
                    </h2>

                    <button onClick={onClose}>
                        <X />
                    </button>
                </div>

                <form onSubmit={salvar} className="space-y-4">

                    <input
                        type="text"
                        name="titulo"
                        placeholder="Título"
                        value={atividade.titulo}
                        onChange={atualizarEstado}
                        className="w-full border rounded-lg p-3"
                        required
                    />

                    <select
                        name="categoria"
                        value={atividade.categoria}
                        onChange={atualizarEstado}
                        className="w-full border rounded-lg p-3"
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="Passeio">Passeio</option>
                        <option value="Restaurante">Restaurante</option>
                        <option value="Evento">Evento</option>
                        <option value="Compras">Compras</option>
                        <option value="Outro">Outro</option>
                    </select>

                    <input
                        type="datetime-local"
                        name="dataHora"
                        value={atividade.dataHora}
                        onChange={atualizarEstado}
                        className="w-full border rounded-lg p-3"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-teal-600 text-white rounded-lg py-3 font-bold"
                    >
                        {loading ? (
                            <Loader2 className="animate-spin mx-auto" />
                        ) : (
                            'Salvar'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ModalAtividade;