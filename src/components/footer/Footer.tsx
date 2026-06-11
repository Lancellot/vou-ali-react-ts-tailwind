import {
    GithubLogoIcon,
    InstagramLogoIcon,
    LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
    const year = new Date().getFullYear();
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) return null;

    const navegacao = [
        { label: "Home", to: "/home" },
        { label: "Sobre", to: "/sobre" },
        { label: "Contato", to: "/contato" },
    ];

    const recursos = [
        { label: "Planejamento de Viagens", to: "/viagens" },
        { label: "Dashboard", to: "/dashboard" },
    ];

    return (
        <footer className="w-full bg-[#1E1F1D] text-[#DED9BE]">

            <div className="bg-[#1E1F1D] border-b border-[#DED9BE]/20">
                <div className="container mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">

                    <div className="flex flex-col gap-5">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">
                                Vou <span className="text-[#DED9BE]">Ali</span>
                            </h2>

                            <p className="mt-2 text-sm text-[#DED9BE]/70 leading-relaxed max-w-xs">
                                Planeje, organize e acompanhe suas viagens de forma
                                simples e eficiente com o Vou Ali.
                            </p>
                        </div>

                        <ul className="flex gap-2">
                            {[
                                { href: "https://github.com/Lancellot", Icon: GithubLogoIcon },
                                { href: "https://www.instagram.com/assis.p.n", Icon: InstagramLogoIcon },
                                { href: "https://www.linkedin.com/in/assispiresneto/", Icon: LinkedinLogoIcon },
                            ].map(({ href, Icon }) => (
                                <li key={href}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="
                                            w-10 h-10 flex items-center justify-center rounded-xl
                                            bg-[#DED9BE]/5
                                            border border-[#DED9BE]/20
                                            text-[#DED9BE]/70
                                            hover:bg-[#DED9BE]
                                            hover:border-[#DED9BE]
                                            hover:text-[#1E1F1D]
                                            hover:-translate-y-0.5
                                            transition-all duration-200
                                        "
                                    >
                                        <Icon size={18} weight="bold" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold tracking-widest text-[#DED9BE] uppercase mb-4">
                            Navegação
                        </h3>

                        <ul className="flex flex-col gap-2">
                            {navegacao.map(({ label, to }) => (
                                <li key={label}>
                                    <Link
                                        to={to}
                                        className="text-sm text-[#DED9BE]/70 hover:text-[#DED9BE] transition-colors duration-200"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold tracking-widest text-[#DED9BE] uppercase mb-4">
                            Recursos
                        </h3>

                        <ul className="flex flex-col gap-2">
                            {recursos.map(({ label, to }) => (
                                <li key={label}>
                                    <Link
                                        to={to}
                                        className="text-sm text-[#DED9BE]/70 hover:text-[#DED9BE] transition-colors duration-200"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-[#DED9BE]/60">
                    © {year}{" "}
                    <span className="text-[#DED9BE] font-semibold">
                        Vou Ali
                    </span>
                    . Todos os direitos reservados.
                </p>

                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#DED9BE]/10 border border-[#DED9BE]/20 text-[#DED9BE]">
                        React
                    </span>

                    <span className="w-px h-4 bg-[#DED9BE]/20" />

                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#DED9BE]/10 border border-[#DED9BE]/20 text-[#DED9BE]">
                        TypeScript
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;