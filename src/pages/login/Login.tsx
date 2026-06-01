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

import { AuthContext } from '../../contexts/AuthContext';
import type { UsuarioLogin } from '../../models/UsuarioLogin';
import googleLogo from '../../assets/logos/google.png';

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
        <div className="login-container min-h-screen flex items-center justify-center bg-indigo-500 px-4">
            <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-8">
                <form onSubmit={loginSubmit}>
                    <h2 className="text-2xl font-semibold text-center mb-6">
                        Faça Login
                    </h2>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={usuarioLogin.email}
                        onChange={atualizarEstado}
                        className="mb-4 w-full h-14 px-4 border rounded-md"
                        required
                    />

                    <input
                        type="password"
                        name="senha"
                        placeholder="Senha"
                        value={usuarioLogin.senha}
                        onChange={atualizarEstado}
                        className="mb-6 w-full h-14 px-4 border rounded-md"
                        required
                    />

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full h-14 bg-indigo-600 text-white rounded-md flex justify-center items-center"
                    >
                        {isLoading ? <ClipLoader size={20} color="#fff" /> : 'Entrar'}
                    </button>

                    <div className="relative text-center mt-6">
                        <span className="bg-white px-3 relative z-10 text-gray-500">
                            ou
                        </span>
                        <div className="absolute left-0 top-1/2 w-full h-px bg-gray-300" />
                    </div>

                    <button
                        type="button"
                        onClick={openGoogleLogin}
                        className="w-full mt-4 flex items-center justify-center gap-2 border rounded-md h-14 hover:bg-gray-100"
                    >
                        <img src={googleLogo} className="w-5 h-5" />
                        Entrar com Google
                    </button>

                    <p className="text-center mt-6">
                        Não tem conta?{' '}
                        <Link to="/cadastro" className="text-indigo-600">
                            Cadastre-se
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;