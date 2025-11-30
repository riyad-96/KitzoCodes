import { createRoot } from 'react-dom/client';
import './index.css';
import AppRoutes from './routes/AppRoutes.tsx';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={AppRoutes} />,
);
