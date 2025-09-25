import { useEffect } from 'react';
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FilePdfOutlined,
  RedoOutlined,
  PlusOutlined,
  EllipsisOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import { Dropdown, Table, Button } from 'antd';
import { PageHeader } from '@ant-design/pro-layout';

import AutoCompleteAsync from '@/components/AutoCompleteAsync';
import { useSelector, useDispatch } from 'react-redux';
import useLanguage from '@/locale/useLanguage';

// APENAS CRUD - REMOVER QUALQUER REFERÊNCIA AO ERP
import { crud } from '@/redux/crud/actions';
import { selectListItems } from '@/redux/crud/selectors';
import { useCrudContext } from '@/context/crud';
import { generate as uniqueId } from 'shortid';
import { useNavigate } from 'react-router-dom';

import { DOWNLOAD_BASE_URL } from '@/config/serverApiConfig';

function AddNewItem({ config }) {
  const navigate = useNavigate();
  const { ADD_NEW_ENTITY, entity } = config;

  const handleClick = () => {
    navigate(`/${entity.toLowerCase()}/create`);
  };

  return (
    <Button onClick={handleClick} type="primary" icon={<PlusOutlined />}>
      {ADD_NEW_ENTITY}
    </Button>
  );
}

export default function DataTable({ config, extra = [] }) {
  // 
  const translate = useLanguage();
  let { entity, dataTableColumns, disableAdd = false, searchConfig } = config;

  const { DATATABLE_TITLE } = config;

  // SELECTOR DO CRUD
  const { result: listResult, isLoading: listIsLoading } = useSelector(selectListItems);
  const { pagination, items: dataSource } = listResult;

  console.log('=== 🔄 REDUX SELECTOR DEBUG ===');
  console.log('Selector result:', listResult);
  console.log('Is loading:', listIsLoading);
  console.log('Full Redux state:', useSelector(state => state.crud));


  // CONTEXTO CRUD
  const { crudContextAction } = useCrudContext();
  const { modal } = crudContextAction;

  const items = [
    {
      label: translate('Show'),
      key: 'read',
      icon: <EyeOutlined />,
    },
    {
      label: translate('Edit'),
      key: 'edit',
      icon: <EditOutlined />,
    },
    {
      label: translate('Download'),
      key: 'download',
      icon: <FilePdfOutlined />,
    },
    ...extra,
    {
      type: 'divider',
    },
    {
      label: translate('Delete'),
      key: 'delete',
      icon: <DeleteOutlined />,
    },
  ];


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRead = (record) => {
    const recordId = record.id || record._id;
    dispatch(crud.currentItem({ data: record })); // CRUD
    navigate(`/${entity}/read/${recordId}`);
  };

  const handleEdit = (record) => {
    const recordId = record.id || record._id;
    if (recordId) {
      const data = { ...record };
      dispatch(crud.currentAction({ actionType: 'update', data })); // CRUD
      navigate(`/${entity}/update/${recordId}`);
    }
  };

  const handleDownload = (record) => {
    const recordId = record.id || record._id;
    window.open(`${DOWNLOAD_BASE_URL}${entity}/${entity}-${recordId}.pdf`, '_blank');
  };

  const handleDelete = (record) => {
    const recordId = record.id || record._id;
    dispatch(crud.currentAction({  // CRUD
      actionType: 'delete',
      data: record
    }));

    modal.open();
  };

  const handleRecordPayment = (record) => {
    const recordId = record.id || record._id;
    dispatch(crud.currentItem({ data: record })); // CRUD
    navigate(`/invoice/pay/${recordId}`);
  };

  dataTableColumns = [
    ...dataTableColumns,
    {
      title: '',
      key: 'action',
      fixed: 'right',
      render: (_, record) => (
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              switch (key) {
                case 'read':
                  handleRead(record);
                  break;
                case 'edit':
                  handleEdit(record);
                  break;
                case 'download':
                  handleDownload(record);
                  break;
                case 'delete':
                  handleDelete(record);
                  break;
                case 'recordPayment':
                  handleRecordPayment(record);
                  break;
                default:
                  break;
              }
            },
          }}
          trigger={['click']}
        >
          <EllipsisOutlined
            style={{ cursor: 'pointer', fontSize: '24px' }}
            onClick={(e) => e.preventDefault()}
          />
        </Dropdown>
      ),
    },
  ];

  const handelDataTableLoad = (pagination) => {
    const options = { page: pagination.current || 1, items: pagination.pageSize || 10 };
    dispatch(crud.list({ entity, options })); // CRUD
  };

  const dispatcher = () => {
    dispatch(crud.list({ entity })); // CRUD
  };

  useEffect(() => {
    const controller = new AbortController();
    dispatcher();
    return () => {
      controller.abort();
    };
  }, []);

  const filterTable = (value) => {

    if (!value || value.trim() === '') {
      // Busca vazia = recarrega lista normal
      dispatch(crud.list({ entity }));
      return;
    }

    // Para seu mock server, use search em vez de list
    const options = {
      q: value // ← json-server usa "q" para busca
    };

    dispatch(crud.search({ entity, options })); // ← Use SEARCH, não LIST!
  };

  return (
    <>
      <PageHeader
        title={DATATABLE_TITLE}
        ghost={true}
        onBack={() => window.history.back()}
        backIcon={<ArrowLeftOutlined />}
        // No return do DataTable, corrija as keys:
        extra={[
          <AutoCompleteAsync
            key="search-autocomplete" // ← Key única e estática
            entity={searchConfig?.entity || entity}
            displayLabels={searchConfig?.displayLabels || ['name']}
            searchFields={searchConfig?.searchFields || 'name'}
            onChange={(value) => {
              filterTable(value);
            }}
            placeholder={`Buscar ${entity}...`}
            style={{ width: 300 }}
          />,
          <Button
            key="refresh-button" // ← Key única
            onClick={handelDataTableLoad}
            icon={<RedoOutlined />}
          >
            {translate('Refresh')}
          </Button>,
          !disableAdd && <AddNewItem key="add-new-item" config={config} />,
        ].filter(Boolean)} // ← Remove elementos null/undefined
        style={{
          padding: '20px 0px',
        }}
      ></PageHeader>

      <Table
        columns={dataTableColumns}
        rowKey={(record) => record.id || record._id}
        dataSource={dataSource}
        pagination={pagination}
        loading={listIsLoading}
        onChange={handelDataTableLoad}
        scroll={{ x: true }}
      />
    </>
  );
}