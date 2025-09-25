import React from 'react'; // Adicionado React para clareza
import { Row, Col } from 'antd';
import useLanguage from '@/locale/useLanguage';

// Os componentes de cartão de resumo podem ser mantidos para uso futuro
import SummaryCard from './components/SummaryCard';
import CustomerPreviewCard from './components/CustomerPreviewCard';
// O componente RecentTable também pode ser útil
import RecentTable from './components/RecentTable';


export default function DashboardModule() {
  const translate = useLanguage();

  // ✅ LÓGICA DE BUSCA DE DADOS REMOVIDA
  // Todas as chamadas `useFetch`, `useOnFetch` e o `useEffect` que
  // buscavam dados de 'invoice', 'quote', e 'payment' foram removidos.

  // Por enquanto, vamos usar dados estáticos para o layout não quebrar.
  const clientResult = { active: 12, new: 3 }; // Exemplo de dados de clientes
  const clientLoading = false;

  // No futuro, aqui você buscará dados para 'client', 'product', e 'sale'.

  return (
    <>
      <Row gutter={[32, 32]}>
        {/* Estes são os cartões de resumo. Pode adaptá-los ou remover. */}
        <SummaryCard
          title={translate('Clientes Ativos')}
          prefix={translate('Total')}
          isLoading={clientLoading}
          data={clientResult?.active}
        />
        <SummaryCard
          title={translate('Novos Clientes')}
          prefix={translate('Este Mês')}
          isLoading={clientLoading}
          data={clientResult?.new}
        />
        <SummaryCard
          title={translate('Vendas do Mês')}
          prefix={translate('Total')}
          isLoading={true} // A carregar, pois ainda não buscámos estes dados
          data={0}
        />
        <SummaryCard
          title={translate('Produtos em Estoque Baixo')}
          prefix={translate('Total')}
          isLoading={true}
          data={0}
        />
      </Row>
      <div className="space30"></div>
      <Row gutter={[32, 32]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 18 }}>
          <div className="whiteBox shadow" style={{ height: 458 }}>
            <div className="pad20">
              <h3 style={{ color: '#22075e', marginBottom: 20 }}>
                {translate('Desempenho das Vendas')}
              </h3>
              {/* Espaço para um futuro gráfico de vendas */}
              <p>Gráfico de vendas aparecerá aqui.</p>
            </div>
          </div>
        </Col>
        <Col className="gutter-row w-full" sm={{ span: 24 }} md={{ span: 24 }} lg={{ span: 6 }}>
          <CustomerPreviewCard
            isLoading={clientLoading}
            activeCustomer={clientResult?.active}
            newCustomer={clientResult?.new}
          />
        </Col>
      </Row>
      <div className="space30"></div>
      <Row gutter={[32, 32]}>
        <Col className="gutter-row w-full" sm={{ span: 24 }}>
          <div className="whiteBox shadow pad20" style={{ height: '100%' }}>
            <h3 style={{ color: '#22075e', marginBottom: 5, padding: '0 20px 20px' }}>
              {translate('Atendimentos Recentes')}
            </h3>
            {/* A tabela de items recentes pode ser adaptada no futuro */}
            <p>Tabela de atendimentos/vendas recentes aparecerá aqui.</p>
          </div>
        </Col>
      </Row>
    </>
  );
}