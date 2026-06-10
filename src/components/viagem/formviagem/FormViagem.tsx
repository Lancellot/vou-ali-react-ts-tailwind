import { useContext, useEffect, useState, type ChangeEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type { Viagem } from '../../../models/Viagem';
import { atualizar, buscar, cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { Loader2 } from 'lucide-react';

function FormViagem() {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState(false);
    const [viagem, setViagem] = useState<Viagem>({} as Viagem);

    const isEditing = Boolean(id);

    async function buscarViagemPorId(id: string) {
        await buscar(`/viagens/${id}`, setViagem, {
            headers: { Authorization: token },
        });
    }

    useEffect(() => {
        if (id) buscarViagemPorId(id);
    }, [id]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setViagem((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function salvarViagem(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        try {
            if (isEditing) {
                await atualizar(`/viagens`, viagem, setViagem, {
                    headers: { Authorization: token },
                });
                ToastAlerta('Viagem atualizada com sucesso!', 'sucesso');
            } else {
                await cadastrar(`/viagens`, viagem, setViagem, {
                    headers: { Authorization: token },
                });
                ToastAlerta('Viagem criada com sucesso!', 'sucesso');
            }
            navigate('/viagens');
        } catch {
            ToastAlerta('Erro ao salvar viagem.', 'erro');
        } finally {
            setIsLoading(false);
        }
    }

    const inputClass =
        'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-400 transition';

    return (
        <div className="max-w-xl mx-auto px-4 py-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {isEditing ? 'Editar Viagem' : 'Nova Viagem'}
            </h2>
            <p className="text-gray-500 mb-8">
                {isEditing ? 'Atualize os dados do seu roteiro.' : 'Preencha os dados para criar um novo roteiro.'}
            </p>

            <form onSubmit={salvarViagem} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">Título</label>
                    <input
                        type="text"
                        name="titulo"
                        value={viagem.titulo}
                        onChange={atualizarEstado}
                        placeholder="Ex: Viagem para Portugal"
                        className={inputClass}
                        required
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">Destino</label>
                    <input
                        type="text"
                        name="destino"
                        value={viagem.destino}
                        onChange={atualizarEstado}
                        placeholder="Ex: Lisboa, Portugal"
                        className={inputClass}
                        required
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-600">Data de Início</label>
                        <input
                            type="date"
                            name="dataInicio"
                            value={viagem.dataInicio}
                            onChange={atualizarEstado}
                            className={inputClass}
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-semibold text-gray-600">Data de Fim</label>
                        <input
                            type="date"
                            name="dataFim"
                            value={viagem.dataFim}
                            onChange={atualizarEstado}
                            className={inputClass}
                            required
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">Descrição</label>
                    <textarea
                        name="descricao"
                        value={viagem.descricao}
                        onChange={atualizarEstado}
                        placeholder="Conte um pouco sobre essa viagem..."
                        rows={3}
                        className={`${inputClass} resize-none`}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex justify-center items-center gap-2 bg-teal-600 hover:bg-teal-700 disabled:opacity-60 text-white font-bold py-3 rounded-xl transition-colors mt-2"
                >
                    {isLoading && <Loader2 size={18} className="animate-spin" />}
                    {isEditing ? 'Atualizar Viagem' : 'Criar Viagem'}
                </button>
            </form>
        </div>
    );
}

export default FormViagem;