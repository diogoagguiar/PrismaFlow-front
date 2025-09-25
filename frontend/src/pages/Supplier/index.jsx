import React from 'react';
import { ErpContextProvider } from '@/context/erp';
import { CrudContextProvider } from '@/context/crud';
import useLanguage from '@/locale/useLanguage';
import SupplierDataTableModule from '@/modules/SupplierModule/SupplierDataTableModule';

export default function Supplier() {
    const translate = useLanguage();
    const entity = 'supplier';

    const dataTableColumns = [
        { title: 'Nome', dataIndex: 'name' },
        { title: 'CNPJ', dataIndex: 'cnpj' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Telefone', dataIndex: 'phone' },
    ];

    const config = {
        entity,
        dataTableColumns,
        DATATABLE_TITLE: translate('lista_de_fornecedores'),
        ADD_NEW_ENTITY: translate('adicionar_novo_fornecedor'),
        ENTITY_NAME: translate('fornecedor'),
        searchConfig: { entity: 'supplier' },
        deleteModalLabels: ['name'],
    };

    return (
        <CrudContextProvider>
            <ErpContextProvider>
                <SupplierDataTableModule config={config} />
            </ErpContextProvider>
        </CrudContextProvider>
    );
}