import { Plane, GraduationCap, Code2 } from 'lucide-react';

function SobrePage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-12">
            <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 text-teal-600 rounded-2xl mb-4">
                    <Plane size={28} />
                </div>
                <h1 className="text-3xl font-bold text-gray-800">Vou Ali</h1>
                <p className="text-gray-500 mt-2">
                    Plataforma para planejar e organizar suas viagens
                </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="text-teal-600" size={20} />
                    <h2 className="text-lg font-semibold text-gray-800">Sobre o projeto</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                    O <strong className="font-medium">Vou Ali</strong> é um projeto acadêmico
                    desenvolvido como parte da formação em desenvolvimento de software. O sistema
                    permite cadastrar viagens, organizar paradas e atividades, e acompanhar
                    despesas, centralizando todo o planejamento de uma viagem em um só lugar.
                </p>
            </div>

            <div className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-3">Desenvolvido por</h2>
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center font-semibold text-lg">
                        A
                    </div>
                    <div>
                        <p className="font-semibold text-gray-800">Assis</p>
                        <p className="text-sm text-gray-500">Estudante e desenvolvedor</p>
                    </div>
                </div>
            </div>

            <div className="text-center mt-10 text-sm text-gray-400 flex items-center justify-center gap-1.5">
                <Code2 size={14} />
                Projeto acadêmico — código aberto no GitHub
            </div>
        </div>
    );
}

export default SobrePage;