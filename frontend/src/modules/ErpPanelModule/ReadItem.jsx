import { Button, Descriptions } from 'antd';
import { PageHeader } from '@ant-design/pro-components';
import { useNavigate } from 'react-router-dom';
import useLanguage from '@/locale/useLanguage';

export default function ReadItem({ config, selectedItem }) {
  const translate = useLanguage();
  const navigate = useNavigate();
  const { entity, ENTITY_NAME, readColumns } = config;

  return (
    <>
      <PageHeader
        onBack={() => navigate(`/${entity}`)}
        title={`${translate('Detalhes de')} ${ENTITY_NAME}`}
        extra={[
          <Button
            key="edit"
            onClick={() => navigate(`/${entity}/update/${selectedItem.id || selectedItem._id}`)}
          >
            {translate('Edit')}
          </Button>,
        ]}
      />

      <div style={{ padding: '20px', background: '#fff' }}>
        <Descriptions bordered column={1}>
          {/* Mapeia dinamicamente as colunas para exibir os dados */}
          {readColumns.map((column) => (
            <Descriptions.Item key={column.dataIndex} label={column.label}>
              {selectedItem[column.dataIndex]}
            </Descriptions.Item>
          ))}
        </Descriptions>
      </div>
    </>
  );
}