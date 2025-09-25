import useLanguage from '@/locale/useLanguage';
import CreateSupplierModule from '@/modules/SupplierModule/CreateSupplierModule';

export default function SupplierCreate() {
    const translate = useLanguage();
    console.log('SupplierCreate rendered');
    const config = {
        entity: 'supplier',
        ENTITY_NAME: translate('fornecedor'),
        CREATE_ENTITY: translate('adicionar_novo_fornecedor'),
    };
    return <CreateSupplierModule config={config} />;
}