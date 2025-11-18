import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Journal from './pages/Journal';
import NotFound from './pages/NotFound';
import AuthForm from './components/AuthForm';
import App from './App';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'auth', element: <AuthForm /> },
      { path: 'journal', element: <Journal /> },
      { path: '*', element: <NotFound /> }
    ]
  }
]);
