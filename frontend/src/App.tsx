// Dependencies
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

// Pages
import NotFoundPage from './pages/NotFoundPage.tsx';
import ProductsListPage from './pages/ProductsListPage.tsx';
import AdminPage from './pages/AdminPage.tsx';
import ProductOverviewPage from './pages/ProductOverviewPage.tsx';
import AdminProductPartsPage from './pages/AdminProductPartsPage.tsx';
import AdminProductPartOptionsPage from './pages/AdminProductPartOptionsPage.tsx';
import SuccessPage from './pages/SuccessPage.tsx';

// Components
import Navbar from './components/Navbar.tsx';

// Contexts
import { Toaster } from './components/ui/toaster';
import { ConfirmDialogProvider } from './contexts/confirmDialogContext.tsx';
import { DialogProvider } from './contexts/dialogContext.tsx';

// Services
import store from './store/index.ts';

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <CookiesProvider defaultSetOptions={{ path: '/' }} />
        <Toaster />
        <Navbar />
        <DialogProvider>
          <ConfirmDialogProvider>
            <Routes>
              <Route path="/" element={<ProductsListPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route
                path="/admin/products/parts/:id"
                element={<AdminProductPartsPage />}
              />
              <Route
                path="/admin/products/parts/:partId/options/:id"
                element={<AdminProductPartOptionsPage />}
              />
              <Route path="/products/:id" element={<ProductOverviewPage />} />
              <Route path="not-found" element={<NotFoundPage />} />
              <Route path="*" element={<Navigate to="not-found" replace />} />
              <Route path="/success" element={<SuccessPage />} />
            </Routes>
          </ConfirmDialogProvider>
        </DialogProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
