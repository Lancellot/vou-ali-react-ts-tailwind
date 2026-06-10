import { X } from 'lucide-react';
import FormCidade from '../formcidade/FormCidade';
import type { Cidade } from '../../../models/Cidade';

interface ModalCidadeProps {
    open: boolean;
    nomeInicial?: string;
    onClose: () => void;
    onCreated: (cidade: Cidade) => void;
}

function ModalCidade({
    open,
    nomeInicial = '',
    onClose,
    onCreated,
}: ModalCidadeProps) {
    if (!open) return null;

    function handleBackdropClick(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) {
            onClose();
        }
    }

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        >
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6 animate-fadeIn">

                {/* BOTÃO FECHAR */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
                >
                    <X size={20} />
                </button>

                {/* FORM */}
                <FormCidade
                    nomeInicial={nomeInicial}
                    onClose={onClose}
                    onCreated={onCreated}
                />
            </div>
        </div>
    );
}

export default ModalCidade;