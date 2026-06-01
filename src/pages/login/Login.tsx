import {
    useContext,
    useEffect,
    useState,
    type ChangeEvent,
    type FormEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

import { AuthContext } from "../../contexts/AuthContext";
import type { UsuarioLogin } from "../../models/UsuarioLogin";

import googleLogo from "../../assets/logos/google.png";
import appleLogo from "../../assets/logos/apple.png";

function Login() {
    const navigate = useNavigate();

    const { usuario, handleLogin, isLoading } = useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState({} as UsuarioLogin);

    useEffect(() => {
        if (usuario.token !== "") {
            navigate("/home");
        }
    }, [usuario, navigate]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        });
    }

    function login(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    return (
        <div className="login-container min-h-screen flex items-center justify-center bg-indigo-500 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
                <form onSubmit={login}>
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Faça Login
                    </h2>

                    <div className="flex gap-4 mb-6">
                        <button
                            type="button"
                            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 bg-gray-50 rounded-md h-14 hover:bg-gray-100 transition"
                        >
                            <img
                                src={googleLogo}
                                alt="Google"
                                className="w-5 h-5"
                            />
                            <span>Google</span>
                        </button>

                        <button
                            type="button"
                            className="flex-1 flex items-center justify-center gap-2 border border-gray-300 bg-gray-50 rounded-md h-14 hover:bg-gray-100 transition"
                        >
                            <img
                                src={appleLogo}
                                alt="Apple"
                                className="w-5 h-5"
                            />
                            <span>Apple</span>
                        </button>
                    </div>

                    <div className="relative text-center mb-6">
                        <span className="bg-white px-3 relative z-10 text-gray-500">
                            ou
                        </span>

                        <div className="absolute left-0 top-1/2 w-full h-px bg-gray-300"></div>
                    </div>

                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="block font-medium mb-2"
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Digite seu email"
                            value={usuarioLogin.email || ""}
                            onChange={atualizarEstado}
                            className="w-full h-14 px-4 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <div className="flex justify-between mb-2">
                            <label
                                htmlFor="senha"
                                className="font-medium"
                            >
                                Senha
                            </label>

                            <Link
                                to="/recuperar-senha"
                                className="text-indigo-600 hover:underline"
                            >
                                Esqueceu sua senha?
                            </Link>
                        </div>

                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Digite sua senha"
                            value={usuarioLogin.senha || ""}
                            onChange={atualizarEstado}
                            className="w-full h-14 px-4 rounded-md border border-gray-300 bg-gray-50 focus:outline-none focus:border-indigo-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-md transition flex justify-center items-center"
                    >
                        {isLoading ? (
                            <ClipLoader size={24} color="#fff" />
                        ) : (
                            "Entrar"
                        )}
                    </button>

                    <p className="text-center mt-6">
                        Não tem uma conta?{" "}
                        <Link
                            to="/cadastro"
                            className="text-indigo-600 font-medium hover:underline"
                        >
                            Cadastre-se
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;