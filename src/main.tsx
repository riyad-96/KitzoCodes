import { createRoot } from 'react-dom/client';
import './index.css';
import AppRoutes from './routes/AppRoutes.tsx';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const client = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={client}>
    <RouterProvider router={AppRoutes} />
  </QueryClientProvider>,
);
