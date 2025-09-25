import './style/app.css';
import { Suspense, lazy } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '@/redux/store';
import PageLoader from '@/components/PageLoader';
import { App } from 'antd';

// IMPORTE OS PROVIDERS DOS CONTEXTOS
import { ErpContextProvider } from '@/context/erp';
import { CrudContextProvider } from '@/context/crud';
import { AppContextProvider } from '@/context/appContext';

const IdurarOs = lazy(() => import('./apps/IdurarOs'));

export default function RoutApp() {
  return (
    <BrowserRouter>
      <App>
        <Provider store={store}>
          {/* ADICIONE OS PROVIDERS DOS CONTEXTOS */}
          <AppContextProvider>
            <CrudContextProvider>
              <ErpContextProvider>
                <Suspense fallback={<PageLoader />}>
                  <IdurarOs />
                </Suspense>
              </ErpContextProvider>
            </CrudContextProvider>
          </AppContextProvider>
        </Provider>
      </App>
    </BrowserRouter>
  );
}