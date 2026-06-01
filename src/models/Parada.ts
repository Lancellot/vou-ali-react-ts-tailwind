import type { Atividade } from './Atividade';
import type { Cidade } from './Cidade';
import type { Viagem } from './Viagem';

export interface Parada {
	id?: number;
	ordem: number;
	dataChegada?: string;
	dataSaida?: string;
	viagemId?: number;
	cidadeId?: number;
	viagem?: Viagem;
	cidade?: Cidade;
	atividades?: Atividade[];
}
