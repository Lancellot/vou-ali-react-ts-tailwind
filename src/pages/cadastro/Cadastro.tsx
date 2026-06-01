import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';

import type { Usuario } from '../../models/Usuario';
import { cadastrarUsuario } from '../../services/Service';
import { ToastAlerta } from '../../utils/ToastAlerta';

type GoogleCredentialResponse = {
	credential?: string;
};

type GoogleDecodedCredential = {
	name?: string;
	email?: string;
	sub?: string;
};

function Cadastro() {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [confirmaSenha, setConfirmaSenha] = useState('');
	const googleButtonRef = useRef<HTMLDivElement | null>(null);
	const isMountedRef = useRef(true);

	const [usuario, setUsuario] = useState<Usuario>({
		id: 0,
		nome: '',
		email: '',
		senha: '',
	});

	function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
		setUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	}

	function handleConfirmaSenha(e: ChangeEvent<HTMLInputElement>) {
		setConfirmaSenha(e.target.value);
	}

	function decodeGoogleCredential(credential: string): GoogleDecodedCredential {
		const payload = credential.split('.')[1];

		if (!payload) {
			throw new Error('Credential inválida');
		}

		const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
		const paddedBase64 = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), '=');
		const jsonPayload = decodeURIComponent(
			atob(paddedBase64)
				.split('')
				.map((character) => `%${character.charCodeAt(0).toString(16).padStart(2, '0')}`)
				.join(''),
		);

		return JSON.parse(jsonPayload) as GoogleDecodedCredential;
	}

	async function cadastrarGoogleUsuario(response: GoogleCredentialResponse) {
		try {
			if (!response.credential) {
				throw new Error('Credential não recebida');
			}

			const decoded = decodeGoogleCredential(response.credential);

			if (!decoded.name || !decoded.email) {
				throw new Error('Dados do Google incompletos');
			}

			const senhaGoogle = `Google@${decoded.sub ?? Date.now().toString(36)}`;

			const usuarioGoogle: Usuario = {
				nome: decoded.name,
				email: decoded.email,
				senha: senhaGoogle,
			};

			if (isMountedRef.current) {
				setIsLoading(true);
			}

			await cadastrarUsuario('/usuarios/cadastrar', usuarioGoogle, () => {});
			ToastAlerta('Cadastro com Google realizado com sucesso!', 'sucesso');
			navigate('/login');
		} catch {
			ToastAlerta('Erro ao cadastrar com Google', 'erro');
		} finally {
			if (isMountedRef.current) {
				setIsLoading(false);
			}
		}
	}

	async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (confirmaSenha !== usuario.senha || usuario.senha.length < 8) {
			ToastAlerta('Dados inválidos', 'erro');
			return;
		}

		if (isMountedRef.current) {
			setIsLoading(true);
		}

		try {
			await cadastrarUsuario('/usuarios/cadastrar', usuario, () => {});
			ToastAlerta('Usuário cadastrado com sucesso!', 'sucesso');
			navigate('/login');
		} catch {
			ToastAlerta('Erro ao cadastrar usuário', 'erro');
		} finally {
			if (isMountedRef.current) {
				setIsLoading(false);
			}
		}
	}

	useEffect(() => {
		return () => {
			isMountedRef.current = false;
		};
	}, []);

	useEffect(() => {
		const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined;

		if (!googleClientId) {
			return undefined;
		}

		let cancelled = false;

		const initializeGoogleButton = () => {
			if (cancelled || !googleButtonRef.current) {
				return false;
			}

			const google = (window as Window & { google?: any }).google;

			if (!google?.accounts?.id) {
				return false;
			}

			google.accounts.id.initialize({
				client_id: googleClientId,
				callback: (response: GoogleCredentialResponse) => {
					void cadastrarGoogleUsuario(response);
				},
			});

			google.accounts.id.renderButton(googleButtonRef.current, {
				theme: 'outline',
				size: 'large',
				text: 'signup_with',
				shape: 'rectangular',
				width: 320,
			});

			return true;
		};

		if (initializeGoogleButton()) {
			return undefined;
		}

		const interval = window.setInterval(() => {
			if (initializeGoogleButton()) {
				window.clearInterval(interval);
			}
		}, 250);

		return () => {
			cancelled = true;
			window.clearInterval(interval);
		};
	}, []);

	return (
		<div className="login-container flex min-h-screen items-center justify-center bg-indigo-500 px-4">
			<div className="w-full max-w-md rounded-lg bg-white p-8 shadow-xl">
				<form onSubmit={cadastrarNovoUsuario}>
					<h2 className="mb-6 text-center text-2xl font-semibold">Criar Conta</h2>

					<input
						type="text"
						name="nome"
						placeholder="Nome"
						value={usuario.nome}
						onChange={atualizarEstado}
						className="mb-4 h-14 w-full rounded-md border border-gray-300 bg-gray-50 px-4"
						required
					/>

					<input
						type="email"
						name="email"
						placeholder="Email"
						value={usuario.email}
						onChange={atualizarEstado}
						className="mb-4 h-14 w-full rounded-md border border-gray-300 bg-gray-50 px-4"
						required
					/>

					<input
						type="password"
						name="senha"
						placeholder="Senha"
						value={usuario.senha}
						onChange={atualizarEstado}
						className="mb-4 h-14 w-full rounded-md border border-gray-300 bg-gray-50 px-4"
						required
					/>

					<input
						type="password"
						placeholder="Confirmar senha"
						value={confirmaSenha}
						onChange={handleConfirmaSenha}
						className="mb-6 h-14 w-full rounded-md border border-gray-300 bg-gray-50 px-4"
						required
					/>

					<button
						type="submit"
						disabled={isLoading}
						className="flex h-14 w-full items-center justify-center rounded-md bg-indigo-600 font-semibold text-white hover:bg-indigo-700"
					>
						{isLoading ? <ClipLoader size={22} color="#fff" /> : 'Cadastrar'}
					</button>

					<div className="relative mt-6 text-center">
						<span className="relative z-10 bg-white px-3 text-gray-500">ou</span>
						<div className="absolute left-0 top-1/2 h-px w-full bg-gray-300" />
					</div>

					<div className="mt-4 flex justify-center">
						<div ref={googleButtonRef} />
					</div>

					<p className="mt-6 text-center">
						Já tem conta?{' '}
						<Link to="/login" className="font-medium text-indigo-600">
							Entrar
						</Link>
					</p>
				</form>
			</div>
		</div>
	);
}

export default Cadastro;
