import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { TRIP_ACTIVITIES, type TripActivity } from "../../../src/data/homeData";

export default function Hero() {
    const navigate = useNavigate();
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <section className="relative min-h-screen bg-linear-to-br from-emerald-950 via-emerald-800 to-emerald-500 flex items-center overflow-hidden">

            <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-white/[0.04] pointer-events-none" />
            <div className="absolute -bottom-28 -left-14 w-[500px] h-[500px] rounded-full bg-white/[0.03] pointer-events-none" />
            <div className="absolute top-1/3 right-[8%] w-48 h-48 rounded-full bg-white/[0.05] pointer-events-none" />

            <div className="container mx-auto px-6 py-20">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    <div className="flex-1 text-white">

                        <span className="animate-fade-up inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full text-sm font-medium">
                            {isAuthenticated
                                ? "🎉 Bem-vindo de volta!"
                                : "✈️ Planejamento de viagens inteligente"}
                        </span>

                        <h1 className="animate-fade-up animation-delay-100 mt-6 text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight">
                            {isAuthenticated ? (
                                <>
                                    Pronto para sua
                                    <span className="block text-emerald-200">
                                        próxima aventura?
                                    </span>
                                </>
                            ) : (
                                <>
                                    Organize sua viagem
                                    <span className="block text-emerald-200">
                                        do zero ao destino
                                    </span>
                                </>
                            )}
                        </h1>

                        <p className="animate-fade-up animation-delay-200 mt-6 text-lg text-white/80 max-w-xl leading-relaxed font-(family-name:--font-dm-sans)">
                            {isAuthenticated
                                ? "Acompanhe seus roteiros, despesas e atividades em um único lugar. Continue planejando sua próxima experiência."
                                : "Roteiros personalizados, controle financeiro e dashboard visual — tudo em uma plataforma única. Chega de planilhas e e-mails dispersos."}
                        </p>

                        <div className="animate-fade-up animation-delay-300 flex flex-wrap gap-4 mt-8">
                            {isAuthenticated ? (
                                <button
                                    onClick={() => navigate("/viagens")}
                                    className="bg-white text-emerald-800 px-7 py-3.5 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-900/30 transition-all duration-200"
                                >
                                    Minhas Viagens →
                                </button>
                            ) : (
                                <>
                                    <button
                                        onClick={() => navigate("/cadastro")}
                                        className="bg-white text-emerald-800 px-7 py-3.5 rounded-full font-semibold hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-900/30 transition-all duration-200"
                                    >
                                        Começar gratuitamente →
                                    </button>

                                    <button
                                        onClick={() => navigate("/login")}
                                        className="border border-white/50 text-white px-7 py-3.5 rounded-full font-semibold hover:bg-white/10 transition-all duration-200"
                                    >
                                        Já tenho conta
                                    </button>
                                </>
                            )}
                        </div>

                        <p className="animate-fade-up animation-delay-400 mt-5 text-xs text-white/50">
                            {isAuthenticated
                                ? "Continue organizando seus próximos destinos ✈️"
                                : "Sem cartão de crédito · Cadastro em 30 segundos"}
                        </p>

                    </div>

                    <div className="animate-fade-up animation-delay-300 flex-1 flex justify-center w-full max-w-sm lg:max-w-none">
                        <div className="hero-mockup animate-float w-full max-w-sm p-7">

                            <div className="flex items-center justify-between mb-5">
                                <div>
                                    <p className="text-white/60 text-xs">
                                        {isAuthenticated ? "Sua Próxima Viagem" : "Minha Viagem"}
                                    </p>
                                    <p className="text-white font-bold text-base">
                                        Patagônia 2025 🏔️
                                    </p>
                                </div>

                                <span className="bg-emerald-200 text-emerald-950 text-xs font-bold px-3 py-1 rounded-full">
                                    Ativo
                                </span>
                            </div>

                            {TRIP_ACTIVITIES.map((item: TripActivity, i: number) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 bg-white/[0.08] rounded-xl px-3.5 py-2.5 mb-2.5"
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <div className="flex-1">
                                        <p className="text-white/50 text-[0.7rem]">
                                            {item.day} · {item.cat}
                                        </p>
                                        <p className="text-white text-sm font-semibold">
                                            {item.act}
                                        </p>
                                    </div>
                                </div>
                            ))}

                            <div className="mt-4 bg-emerald-200/10 rounded-xl px-3.5 py-3 flex justify-between items-center">
                                <span className="text-white/70 text-xs">
                                    Orçamento gasto
                                </span>
                                <span className="text-emerald-200 font-bold text-sm">
                                    R$ 4.200 / 6.000
                                </span>
                            </div>

                            <div className="mt-2 h-1.5 rounded-full bg-white/15">
                                <div className="h-1.5 w-[70%] rounded-full bg-emerald-200" />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}