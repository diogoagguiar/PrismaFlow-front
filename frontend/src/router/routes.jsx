import { lazy } from 'react';
import { Navigate } from 'react-router-dom';


const Logout = lazy(() => import('@/pages/Logout.jsx'));
const NotFound = lazy(() => import('@/pages/NotFound.jsx'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Settings = lazy(() => import('@/pages/Settings/Settings'));
const Taxes = lazy(() => import('@/pages/Taxes'));
const Profile = lazy(() => import('@/pages/Profile'));
const About = lazy(() => import('@/pages/About'));
const Supplier = lazy(() => import('@/pages/Supplier/index'));
const SupplierRead = lazy(() => import('@/pages/Supplier/supplierRead'));
const SupplierUpdate = lazy(() => import('@/pages/Supplier/supplierUpdate'));
const SupplierCreate = lazy(() => import('@/pages/Supplier/supplierCreate'));
import { ErpContextProvider } from '@/context/erp';
import { CrudContextProvider } from '@/context/crud';


let routes = {

  default: [
    // --- ROTAS ESSENCIAIS MANTIDAS ---
    {
      path: '/login',
      element: <Navigate to="/" />,
    },
    {
      path: '/logout',
      element: <Logout />,
    },
    {
      path: '/about',
      element: <About />,
    },
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/settings',
      element: <Settings />,
    },
    {
      path: '/settings/edit/:settingsKey',
      element: <Settings />,
    },
    {
      path: '/taxes',
      element: <Taxes />,
    },
    {
      path: '/profile',
      element: <Profile />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
    {
      path: '/supplier',
      element: (
        <CrudContextProvider>
          <ErpContextProvider>
            <Supplier />
          </ErpContextProvider>
        </CrudContextProvider>
      ),
    },
    {
      path: '/supplier/create',
      element: (
        <CrudContextProvider>
          <ErpContextProvider>
            <SupplierCreate />
          </ErpContextProvider>
        </CrudContextProvider>
      ),
    },
    {
      path: '/supplier/read/:id',
      element: (
        <CrudContextProvider>
          <ErpContextProvider>
            <SupplierRead />
          </ErpContextProvider>
        </CrudContextProvider>
      ),
    },
    {
      path: '/supplier/update/:id',
      element: (
        <CrudContextProvider>
          <ErpContextProvider>
            <SupplierUpdate />
          </ErpContextProvider>
        </CrudContextProvider>
      ),
    },
  ],
};

export default routes;