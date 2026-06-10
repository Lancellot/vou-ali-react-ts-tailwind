import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

export default function CTA() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    if (isAuthenticated) {
        return null; 
    }

    return (
        
        <section className="bg-linear-to-br from-emerald-950 via-emerald-800 to-emerald-600 py-20 px-6 text-center">
            <div className="container mx-auto max-w-xl text-white">

                <h2 className="text-4xl font-extrabold tracking-tight leading-tight">
                    Sua próxima viagem<br />começa agora 🌍
                </h2>

                <p className="mt-4 text-white/80 text-base leading-relaxed">
                    Junte-se a viajantes que usam o <strong>Vou Ali</strong> para planejar
                    roteiros sem estresse e aproveitar cada momento.
                </p>

                <button
                    onClick={() => navigate("/cadastro")}
                    className="mt-9 bg-white text-emerald-800 px-10 py-4 rounded-full text-base font-semibold hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-900/30 transition-all duration-200"
                >
                    Criar conta grátis →
                </button>

                <p className="mt-4 text-xs text-white/40">
                    Sem custos · Cancele quando quiser
                </p>

            </div>
        </section>
        
    );
}