import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";

function Navbar() {
    const navigate = useNavigate();
    const { handleLogout, isAuthenticated } = useContext(AuthContext);

    function logout() {
        handleLogout();
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
        <nav className="w-full flex justify-center bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md">
            <section className="container flex justify-between items-center h-16 mx-8">
                <Link
                    to="/home"
                    className="text-2xl font-bold tracking-tight hover:opacity-90 transition-opacity"
                >
                    Vou Ali
                </Link>

                <ul className="flex items-center gap-1">
                    {navigationItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className="text-indigo-100 hover:text-white hover:bg-white/10
                                           text-sm font-medium px-4 py-2 rounded-md transition-all duration-200"
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}

                    {isAuthenticated && (
                        <>
                            <li className="w-px h-5 bg-white/20 mx-2" />

                            <li>
                                <button
                                    onClick={logout}
                                    className="text-red-100 hover:text-white hover:bg-red-500/20
                                               text-sm font-medium px-4 py-2 rounded-md transition-all duration-200"
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
