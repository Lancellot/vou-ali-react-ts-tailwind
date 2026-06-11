import { useContext, useState, type ChangeEvent } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import type { Cidade } from '../../../models/Cidade';
import { cadastrar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';
import { Loader2 } from 'lucide-react';

interface FormCidadeProps {
    nomeInicial?: string;
    onClose: () => void;
    onCreated: (cidade: Cidade) => void;
}

function FormCidade({ nomeInicial = '', onClose, onCreated }: FormCidadeProps) {
    const { usuario } = useContext(AuthContext);
    const token = usuario.token;

    const [isLoading, setIsLoading] = useState(false);

    const [cidade, setCidade] = useState<Cidade>({
        nome: nomeInicial,
        estado: '',
        pais: 'Brasil',
    });

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCidade((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }

    async function salvarCidade(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    try {
        await cadastrar(
            '/cidades/cadastrar',
            cidade,
            () => {},
            {
                headers: { Authorization: token },
            }
        );

        ToastAlerta('Cidade criada com sucesso!', 'sucesso');

        onCreated(cidade);

        onClose();
    } catch {
        ToastAlerta('Erro ao criar cidade.', 'erro');
    } finally {
        setIsLoading(false);
    }
}

    const inputClass =
        'w-full border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition';

    return (
        <div className="w-full">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
                Nova Cidade
            </h2>

            <form onSubmit={salvarCidade} className="flex flex-col gap-4">

                {/* NOME */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                        Nome
                    </label>
                    <input
                        type="text"
                        name="nome"
                        value={cidade.nome}
                        onChange={atualizarEstado}
                        className={inputClass}
                        placeholder="Ex: Porto Alegre"
                        required
                    />
                </div>

                {/* ESTADO */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                        Estado
                    </label>
                    <input
                        type="text"
                        name="estado"
                        value={cidade.estado || ''}
                        onChange={atualizarEstado}
                        className={inputClass}
                        placeholder="Ex: RS"
                    />
                </div>

                {/* PAÍS */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-semibold text-gray-600">
                        País
                    </label>
                    <input
                        type="text"
                        name="pais"
                        value={cidade.pais || ''}
                        onChange={atualizarEstado}
                        className={inputClass}
                        placeholder="Ex: Brasil"
                    />
                </div>

                {/* BOTÕES */}
                <div className="flex gap-3 mt-2">

                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 border border-gray-300 text-gray-600 py-2 rounded-xl hover:bg-gray-50"
                    >
                        Cancelar
                    </button>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex-1 flex justify-center items-center gap-2 bg-cyan-600 hover:bg-cyan-700 text-white font-semibold py-2 rounded-xl disabled:opacity-60"
                    >
                        {isLoading && (
                            <Loader2 size={16} className="animate-spin" />
                        )}
                        Criar
                    </button>
                </div>
            </form>
        </div>
    );
}

export default FormCidade;