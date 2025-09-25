import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ErpLayout } from '@/layout';
import ReadItem from '@/modules/ErpPanelModule/ReadItem';
import PageLoader from '@/components/PageLoader';
import NotFound from '@/components/NotFound';

import { crud } from '@/redux/crud/actions'; // Usamos a ação 'crud' que já corrigimos
import { selectReadItem } from '@/redux/crud/selectors';

export default function ReadSupplierModule({ config }) {
    const dispatch = useDispatch();
    const { id } = useParams();

    // Busca os dados do item quando o componente é montado ou o ID muda
    useLayoutEffect(() => {
        dispatch(crud.read({ entity: config.entity, id }));
    }, [id]);

    // Obtém o resultado da busca (incluindo o estado de carregamento e sucesso)
    const { result: currentResult, isSuccess, isLoading } = useSelector(selectReadItem);
    // ✅ PONTO DE TESTE 1: Verifique o que vem do Redux
    console.log('1. ReadSupplierModule - Dados do Redux:', { currentResult, isSuccess, isLoading });
    // Se estiver a carregar ou o resultado ainda não chegou, exibe o PageLoader
    if (isLoading || !currentResult) {
        return (
            <ErpLayout>
                <PageLoader />
            </ErpLayout>
        );
    } else {
        // Se o carregamento terminou, verifica se a busca foi bem-sucedida
        return (
            <ErpLayout>
                {isSuccess ? (
                    // Se sim, renderiza o componente genérico para exibir os detalhes
                    <ReadItem config={config} selectedItem={currentResult} />
                ) : (
                    // Se não, renderiza a página de "Não Encontrado"
                    <NotFound entity={config.entity} />
                )}
            </ErpLayout>
        );
    }
}