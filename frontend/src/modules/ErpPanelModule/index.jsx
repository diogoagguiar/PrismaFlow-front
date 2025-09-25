import { useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { crud } from '@/redux/crud/actions';
import { useErpContext } from '@/context/erp';
import { useCrudContext } from '@/context/crud'; // ✅ 1. Importe o useCrudContext
import { selectCurrentItem } from '@/redux/crud/selectors';

import DeleteModal from '@/components/DeleteModal';
import DataTable from './DataTable';

export default function ErpPanel({ config, listData, isLoading }) {
  const { erpContextAction } = useErpContext();
  const { crudContextAction } = useCrudContext(); // ✅ 2. Obtenha as ações do CrudContext

  const { modal: erpModal } = erpContextAction;
  const { modal: crudModal } = crudContextAction; // ✅ 3. Renomeie para evitar conflitos

  const dispatch = useDispatch();
  const { result: currentItem } = useSelector(selectCurrentItem);

  const handleDelete = () => {
    const { entity } = config;
    const id = currentItem.id || currentItem._id;
    dispatch(crud.delete({ entity, id }));
  };

  return (
    <>
      <DataTable config={config} listData={listData} isLoading={isLoading} />
      <DeleteModal config={config} />
      <DeleteModal config={config} handleOk={handleDelete} />
    </>
  );
}