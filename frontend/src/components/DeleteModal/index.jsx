import { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useCrudContext } from '@/context/crud';
import { selectDeletedItem, selectCurrentItem } from '@/redux/crud/selectors';
import { valueByString } from '@/utils/helpers';
import useLanguage from '@/locale/useLanguage';

export default function DeleteModal({ config }) {
  const translate = useLanguage();
  let {
    entity,
    deleteModalLabels = ['name'], // ← Default seguro
    deleteMessage = translate('are_you_sure_you_want_to_delete'),
    modalTitle = translate('delete_confirmation'),
  } = config;

  const dispatch = useDispatch();

  // ✅ AGORA busca do contexto CRUD correto
  const { current: currentFromDelete, isLoading, isSuccess } = useSelector(selectDeletedItem);
  const { result: currentFromCurrent } = useSelector(selectCurrentItem);

  // ✅ Contexto CRUD
  const { state, crudContextAction } = useCrudContext();
  const { modal, readBox, panel } = crudContextAction;

  // ✅ Estado do modal no CRUD
  const isModalOpen = state.isModalOpen || false;

  // ✅ Fallback para encontrar o current
  const current = currentFromDelete?.current || currentFromCurrent || currentFromDelete;

  const [displayItem, setDisplayItem] = useState('');

  useEffect(() => {
    if (isSuccess) {
      modal.close();
      dispatch(crud.list({ entity })); // ← Recarrega lista
      dispatch(crud.resetAction({ actionType: "delete" }));
    }

    if (current) {
      const labels = deleteModalLabels.map((x) => valueByString(current, x)).join(' ');
      setDisplayItem(labels);
    }
  }, [isSuccess, current]);

  const handleOk = () => {
    if (!current) {
      modal.close();
      return;
    }

    const id = current.id || current._id;
    if (!id) {
      modal.close();
      return;
    }

    dispatch(crud.delete({ entity, id }));

    // Fecha componentes relacionados
    readBox.close?.();
    panel.close?.();
  };

  const handleCancel = () => {
    if (!isLoading) {
      modal.close();
      dispatch(crud.resetAction({ actionType: 'delete' }));
    }
  };

  return (
    <Modal
      title={modalTitle}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      confirmLoading={isLoading}
    >
      <p>
        {deleteMessage}
        <strong>{displayItem}</strong>
      </p>
    </Modal>
  );
}