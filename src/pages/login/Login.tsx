import {
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
    type ChangeEvent,
    type FormEvent,
} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { Eye, EyeOff } from 'lucide-react';

import { AuthContext } from '../../contexts/AuthContext';
import type { UsuarioLogin } from '../../models/UsuarioLogin';
import googleLogo from '../../assets/logos/google.png';
import Logologin from '../../assets/logos/logologin.png';

type GoogleCredentialResponse = {
    credential?: string;
};

declare global {
    interface Window {
        google: any;
    }
}

function Login() {
    const navigate = useNavigate();
    const { handleLogin, handleLoginGoogle, isLoading, isAuthenticated } =
        useContext(AuthContext);

    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({
        email: '',
        senha: '',
    } as UsuarioLogin);

    const googleInitialized = useRef(false);

    const [mostrarSenha, setMostrarSenha] = useState(false);

    const handleGoogleCallback = useCallback(
        (response: GoogleCredentialResponse) => {
            if (response.credential) {
                handleLoginGoogle(response.credential);
            }
        },
        [handleLoginGoogle]
    );

    const handleGoogleCallbackRef = useRef(handleGoogleCallback);

    useEffect(() => {
        if (isAuthenticated) navigate('/home');
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        handleGoogleCallbackRef.current = handleGoogleCallback;
    }, [handleGoogleCallback]);

    useEffect(() => {
        const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (!clientId || !window.google || googleInitialized.current) return;

        window.google.accounts.id.initialize({
            client_id: clientId,
            callback: (response: GoogleCredentialResponse) => {
                handleGoogleCallbackRef.current?.(response);
            },
        });

        googleInitialized.current = true;
    }, [handleGoogleCallback]);

    function openGoogleLogin() {
        if (!window.google) {
            console.error('Google SDK não carregado');
            return;
        }
        window.google.accounts.id.prompt((notification: any) => {
            console.log('Google prompt notification:', notification);
            if (notification.isNotDisplayed()) {
                console.warn(
                    'Prompt não exibido:',
                    notification.getNotDisplayedReason()
                );
            }
            if (notification.isSkippedMoment()) {
                console.warn(
                    'Prompt pulado:',
                    notification.getSkippedReason()
                );
            }
        });
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function loginSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        await handleLogin(usuarioLogin);
    }

return (
    <div className="min-h-screen bg-[#1E1F1D] flex">

        
        <div className="hidden lg:flex w-1/2 items-center justify-center p-12">
            <div className="max-w-xl">
                {/* Troque pela sua imagem */}
                <img
                    src={Logologin}
                    alt="Vou Ali"
                    className="w-full h-auto object-contain"
                />
            </div>
        </div>

        {/* Área do Login */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-8">
            <div className="w-full max-w-md bg-[#DED9BE] rounded-2xl shadow-2xl p-8">

                <form onSubmit={loginSubmit}>
                    <h2
                        className="text-3xl font-bold text-center mb-8 text-[#1E1F1D]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        Faça Login
                    </h2>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={usuarioLogin.email}
                        onChange={atualizarEstado}
                        className="
                            mb-4
                            w-full
                            h-14
                            px-4
                            border
                            border-[#1E1F1D]/20
                            rounded-md
                            bg-white
                            focus:outline-none
                            focus:ring-2
                            focus:ring-[#1E1F1D]
                        "
                        required
                    />

                    <div className="relative mb-6">
                        <input
                            type={mostrarSenha ? 'text' : 'password'}
                            name="senha"
                            placeholder="Senha"
                            value={usuarioLogin.senha}
                            onChange={atualizarEstado}
                            className="
                                w-full
                                h-14
                                px-4
                                border
                                border-[#1E1F1D]/20
                                rounded-md
                                bg-white
                                focus:outline-none
                                focus:ring-2
                                focus:ring-[#1E1F1D]
                            "
                            required
                        />

                        <button
                            type="button"
                            onClick={() => setMostrarSenha(!mostrarSenha)}
                            className="
                                absolute
                                right-3
                                top-1/2
                                -translate-y-1/2
                                text-[#1E1F1D]/60
                                hover:text-[#1E1F1D]
                            "
                        >
                            {mostrarSenha ? (
                                <EyeOff size={20} />
                            ) : (
                                <Eye size={20} />
                            )}
                        </button>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="
                            w-full
                            h-14
                            bg-[#1E1F1D]
                            text-[#DED9BE]
                            rounded-md
                            flex
                            justify-center
                            items-center
                            hover:bg-black
                            transition-colors
                            font-medium
                        "
                    >
                        {isLoading ? (
                            <ClipLoader size={20} color="#DED9BE" />
                        ) : (
                            'Entrar'
                        )}
                    </button>

                    <div className="relative text-center my-6">
                        <span className="bg-[#DED9BE] px-3 relative z-10 text-[#1E1F1D]/60">
                            ou
                        </span>

                        <div className="absolute left-0 top-1/2 w-full h-px bg-[#1E1F1D]/20" />
                    </div>

                    <button
                        type="button"
                        onClick={openGoogleLogin}
                        className="
                            w-full
                            h-14
                            flex
                            items-center
                            justify-center
                            gap-3
                            border
                            border-[#1E1F1D]/20
                            rounded-md
                            bg-white
                            hover:bg-[#f5f2e4]
                            transition-colors
                        "
                    >
                        <img
                            src={googleLogo}
                            alt="Google"
                            className="w-5 h-5"
                        />
                        <span className="text-[#1E1F1D]">
                            Entrar com Google
                        </span>
                    </button>

                    <p className="text-center mt-8 text-[#1E1F1D]/80">
                        Não tem conta?{' '}
                        <Link
                            to="/cadastro"
                            className="font-semibold text-[#1E1F1D] hover:underline"
                        >
                            Cadastre-se
                        </Link>
                    </p>
                </form>

            </div>
        </div>

    </div>
);


}

export default Login;