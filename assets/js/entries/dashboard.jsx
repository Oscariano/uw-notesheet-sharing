import { createRoot } from 'react-dom/client';
import DashboardPage from '@/pages/dashboard/DashboardPage';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<DashboardPage />);
