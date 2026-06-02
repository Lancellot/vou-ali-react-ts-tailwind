import {
    GithubLogoIcon,
    InstagramLogoIcon,
    LinkedinLogoIcon,
} from "@phosphor-icons/react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {
    const year = new Date().getFullYear();
    const { isAuthenticated } = useContext(AuthContext);

    if (!isAuthenticated) return null;

    return (
        <footer className="w-full bg-slate-900 text-slate-50">

            <div className="bg-slate-800 border-b border-indigo-600/30">
                <div className="container mx-auto px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-10">

                    <div className="flex flex-col gap-5">
                        <div>
                            <h2 className="text-xl font-bold tracking-tight">
                                Vou <span className="text-indigo-500">Ali</span>
                            </h2>
                            <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-xs">
                                Compartilhando ideias, projetos e experiências sobre tecnologia
                                e desenvolvimento.
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
                                            bg-indigo-600/10 border border-indigo-600/25 text-slate-400
                                            hover:bg-indigo-600 hover:border-indigo-600 hover:text-white
                                            hover:-translate-y-0.5 transition-all duration-200">
                                        <Icon size={18} weight="bold" />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-4">
                            Navegação
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {["Home", "Sobre", "Contato"].map((item) => (
                                <li key={item}>
                                    <a
                                    href="#"
                                    className="text-sm text-slate-400 hover:text-sky-400 transition-colors duration-200"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xs font-semibold tracking-widest text-indigo-500 uppercase mb-4">
                            Categorias
                        </h3>
                        <ul className="flex flex-col gap-2">
                            {["Tecnologia", "Desenvolvimento", "Carreira", "Projetos"].map((item) => (
                                <li key={item}>
                                    <a
                                    href="#"
                                    className="text-sm text-slate-400 hover:text-sky-400 transition-colors duration-200"
                                    >
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-slate-500">
                    © {year}{" "}
                    <span className="text-indigo-500 font-semibold">Vou Ali</span>.
                    Todos os direitos reservados.
                </p>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-sky-500/10 border border-sky-500/25 text-sky-400">
                        React
                    </span>
                    <span className="w-px h-4 bg-white/10" />
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400">
                        TypeScript
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;