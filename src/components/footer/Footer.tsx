import { GithubLogoIcon, InstagramLogoIcon, LinkedinLogoIcon } from "@phosphor-icons/react";
import { useContext, type ReactNode } from "react";
import { AuthContext } from "../../contexts/AuthContext";

function Footer() {

    const data = new Date().getFullYear();

    const { isAuthenticated } = useContext(AuthContext);

    let component: ReactNode;

    if (isAuthenticated) {
        component = (
             <footer className=" flex justify-center bg-indigo-900 text-white">
                <section className="container flex flex-col items-center py-4">
                    <p className="text-xl font-bold">
                        © {data} Blog Pessoal. Todos os direitos reservados.
                    </p>
                    <p className="text-xl">Acesse nossas redes sociais</p>
                    <ul className="flex gap-2">
                        <li>
                            <a href="https://github.com/Lancellot" target="_blank" rel="noreferrer">
                                <GithubLogoIcon size={48} weight="bold" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.instagram.com/assis.p.n" target="_blank" rel="noreferrer">
                                <InstagramLogoIcon size={48} weight="bold" />
                            </a>
                        </li>
                        <li>
                            <a href="https://www.linkedin.com/in/assispiresneto/" target="_blank" rel="noreferrer">
                                <LinkedinLogoIcon size={48} weight="bold" />
                            </a>
                        </li>
                    </ul>
                </section>
            </footer>
        )};
    
    return (
        <>
            {component}
        </>
    );
}
export default Footer;