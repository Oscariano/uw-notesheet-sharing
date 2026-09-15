import ReactDOM from 'react-dom/client';
import Home from '@/pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router';
import '@/styles/style.css'
import DashboardPage from './pages/dashboard/DashboardPage';

const root = document.getElementById('root');
if (!root) throw new Error('Mount point #root not found in home.html');

ReactDOM.createRoot(root).render(
    <BrowserRouter>
        <Routes>
            <Route index element={<Home/ >} />
            
            <Route path='/dash' element={<DashboardPage/ >} />
        </Routes>
    </BrowserRouter>
)
