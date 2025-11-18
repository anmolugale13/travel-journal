import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import './styles/theme.css';

export default function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
