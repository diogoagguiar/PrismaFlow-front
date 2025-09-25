import useLanguage from '@/locale/useLanguage';
import UpdateSupplierModule from '@/modules/SupplierModule/UpdateSupplierModule/index';

export default function SupplierUpdate() {

    const translate = useLanguage();
    const config = {
        entity: 'supplier',
        ENTITY_NAME: translate('fornecedor'),
        UPDATE_ENTITY: translate('editar_fornecedor'),
    };
    return <UpdateSupplierModule config={config} />;
}