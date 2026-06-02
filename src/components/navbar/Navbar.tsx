import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Navbar() {
    const navigate = useNavigate();
    const { handleLogout, isAuthenticated} = useContext(AuthContext);

    function logout() {
        handleLogout();
        ToastAlerta("Usuário deslogado com sucesso", "info");
        navigate("/");
    }

    const navigationItems = [
        { label: "Home", path: "/home" },
        ...(isAuthenticated
            ? [
                { label: "Meu Painel", path: "/dashboard" },
                { label: "Viagem", path: "/viagens" },
            ]
            : []),
        { label: "Sobre", path: "/sobre" },
        ...(!isAuthenticated
            ? [
                { label: "Login", path: "/login" },
                { label: "Cadastro", path: "/cadastro" },
            ]
            : []),
    ];

    return (
        <nav className="w-full flex justify-center bg-indigo-950 text-white">
            <section className="container flex justify-between items-center h-16 mx-8">
                <Link to="/home" className="text-xl font-semibold tracking-tight">
                    Blog Pessoal
                </Link>

                <ul className="flex items-center gap-1">
                    {navigationItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className="text-indigo-300 hover:text-white hover:bg-indigo-300/10
                                           text-sm px-3 py-1.5 rounded-md transition-colors"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}

                    {isAuthenticated && (
                        <>
                            <li className="w-px h-5 bg-indigo-300/20 mx-1" />
                            <li>
                                <button
                                    onClick={logout}
                                    className="text-pink-300 hover:bg-pink-300/10
                                               text-sm px-3 py-1.5 rounded-md transition-colors"
                                >
                                    Sair
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </section>
        </nav>
    );
}

export default Navbar;