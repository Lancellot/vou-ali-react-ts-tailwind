import type { Viagem } from './Viagem';

export interface UsuarioLogin {
	id?: number;
	nome?: string;
	email: string;
	senha: string;
	token?: string;
	createdAt?: string;
	viagens?: Viagem[];
}
