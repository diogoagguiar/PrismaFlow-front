import React, { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { ErpLayout } from '@/layout';
import UpdateItem from '@/modules/ErpPanelModule/UpdateItem';
import SupplierForm from '@/modules/SupplierModule/Forms/SupplierForm';
import PageLoader from '@/components/PageLoader';
import NotFound from '@/components/NotFound';

import { erp } from '@/redux/erp/actions';
import { selectReadItem } from '@/redux/erp/selectors';

export default function UpdateSupplierModule({ config }) {
    const dispatch = useDispatch();
    const { id } = useParams();

    // Busca os dados do item quando o componente é montado ou o ID muda
    useLayoutEffect(() => {
        dispatch(erp.read({ entity: config.entity, id }));
    }, [id]);

    // Obtém o resultado da busca (incluindo o estado de carregamento e sucesso)
    const { result: currentResult, isSuccess, isLoading } = useSelector(selectReadItem);

    // Sincroniza o item lido com o 'currentItem' genérico do Redux
    useLayoutEffect(() => {
        if (currentResult) {
            dispatch(erp.currentAction({ actionType: 'update', data: currentResult }));
        }
    }, [currentResult]);

    // Se estiver a carregar, exibe o PageLoader
    if (isLoading) {
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
                    // Se sim, renderiza o formulário de edição
                    <UpdateItem config={config} UpdateForm={SupplierForm} />
                ) : (
                    // Se não, renderiza a página de "Não Encontrado"
                    <NotFound entity={config.entity} />
                )}
            </ErpLayout>
        );
    }
}