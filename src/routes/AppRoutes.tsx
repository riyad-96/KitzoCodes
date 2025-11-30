import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

const AppRoutes = createBrowserRouter([
  {
    path:'/',
    element: <App />
  }
])

export default AppRoutes;