import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import logo from "../../assets/logos/logonav.png";

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
                { label: "Dashboard", path: "/dashboard" },
                { label: "Minhas Viagens", path: "/viagens" },
            ]
            : []),

        ...(!isAuthenticated
            ? [
                { label: "Login", path: "/login" },
                { label: "Criar Conta", path: "/cadastro" },
            ]
            : []),
    ];

    return (
        <nav className="w-full bg-[#1E1F1D] text-[#DED9BE] shadow-lg border-b border-[#DED9BE]/10 backdrop-blur-sm">
            <section className="container mx-auto px-6 flex justify-between items-center h-16">

                <Link
                    to={isAuthenticated ? "/dashboard" : "/home"}
                    className="flex items-center hover:opacity-90 transition-opacity"
                >
                    <img src={logo} alt="Logo" className="h-12 w-12" />
                    <span
                        className="text-2xl font-bold tracking-wide text-[#DED9BE] font-(family-name:--font-playfair-display) ml-2"
                        >
                        Vou Ali
                    </span>
                </Link>

                <ul className="flex items-center gap-1">

                    {navigationItems.map((item) => (
                        <li key={item.path}>
                            <Link
                                to={item.path}
                                className="
                            text-[#DED9BE]
                            hover:text-[#1E1F1D]
                            hover:bg-[#DED9BE]
                            text-sm font-medium
                            px-4 py-2 rounded-md
                            transition-all duration-200
                        "
                            >
                                {item.label}
                            </Link>
                        </li>
                    ))}

                    {isAuthenticated && (
                        <>
                            <li className="hidden md:flex items-center gap-2 text-sm text-[#DED9BE] mx-2">
                                <span className="w-2 h-2 rounded-full bg-[#DED9BE]"></span>
                                <span>Online</span>
                            </li>

                            <li className="w-px h-5 bg-[#DED9BE]/30 mx-2" />

                            <li>
                                <button
                                    onClick={logout}
                                    className="
                                border border-[#DED9BE]/40
                                text-[#DED9BE]
                                hover:bg-[#DED9BE]
                                hover:text-[#1E1F1D]
                                text-sm font-medium
                                px-4 py-2 rounded-md
                                transition-all duration-200
                            "
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