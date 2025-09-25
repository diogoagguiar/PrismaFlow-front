import useLanguage from '@/locale/useLanguage';
import ReadSupplierModule from '@/modules/SupplierModule/ReadSupplierModule';

export default function SupplierRead() {
    const translate = useLanguage();

    const config = {
        entity: 'supplier',
        ENTITY_NAME: translate('fornecedor'),
        READ_ENTITY: translate('detalhes_do_fornecedor'),
        // ✅ Adicione esta configuração de colunas de leitura
        readColumns: [
            { label: 'Nome', dataIndex: 'name' },
            { label: 'CNPJ', dataIndex: 'cnpj' },
            { label: 'Email', dataIndex: 'email' },
            { label: 'Telefone', dataIndex: 'phone' },
            { label: 'Endereço', dataIndex: 'address' },
        ],
    };

    return <ReadSupplierModule config={config} />;
}