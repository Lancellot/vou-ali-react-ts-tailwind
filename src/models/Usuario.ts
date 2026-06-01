import type { Viagem } from './Viagem';

export interface Usuario {
	id?: number;
	nome: string;
	email: string;
	senha?: string;
	createdAt?: string;
	viagens?: Viagem[];
}
