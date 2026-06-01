import type { Parada } from './Parada';

export interface Atividade {
	id?: number;
	titulo: string;
	categoria: string;
	dataHora: string;
	paradaId?: number;
	parada?: Parada;
}
