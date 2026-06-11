import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import type { Atividade } from '../../../models/Atividade';
import { buscar, deletar } from '../../../services/Service';
import { ToastAlerta } from '../../../utils/ToastAlerta';

function DeletarAtividade() {
    const navigate = useNavigate();

    const { id } = useParams();

    const { usuario } = useContext(AuthContext);

    const [atividade, setAtividade] =
        useState<Atividade>({} as Atividade);

    useEffect(() => {
        if (id) {
            buscarAtividade(id);
        }
    }, [id]);

    async function buscarAtividade(id: string) {
        try {
            const resposta = await buscar(
                `/atividades/${id}`,
                undefined,
                {
                    headers: {
                        Authorization: usuario.token,
                    },
                }
            );

            setAtividade(resposta);
        } catch {
            ToastAlerta(
                'Erro ao buscar atividade',
                'erro'
            );
        }
    }

    async function deletarRegistro() {
        try {
            await deletar(`/atividades/remover/${id}`, {
                headers: {
                    Authorization: usuario.token,
                },
            });

            ToastAlerta(
                'Atividade apagada com sucesso',
                'sucesso'
            );

            navigate(-1);
        } catch {
            ToastAlerta(
                'Erro ao apagar atividade',
                'erro'
            );
        }
    }

    return (
        <div className="flex justify-center py-10">

            <div className="bg-white rounded-2xl shadow p-8 max-w-md w-full">

                <h1 className="text-2xl font-bold text-center mb-4">
                    Excluir Atividade
                </h1>

                <p className="text-center text-gray-600 mb-6">
                    Deseja realmente excluir:
                </p>

                <div className="bg-slate-50 rounded-lg p-4 mb-6">
                    <h2 className="font-semibold">
                        {atividade.titulo}
                    </h2>

                    <p className="text-sm text-gray-500">
                        {atividade.categoria}
                    </p>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex-1 border rounded-lg py-2"
                    >
                        Cancelar
                    </button>

                    <button
                        onClick={deletarRegistro}
                        className="flex-1 bg-red-500 text-white rounded-lg py-2"
                    >
                        Excluir
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletarAtividade;