import { createRoot } from 'react-dom/client';
import DashboardPage from '@/pages/dashboard/DashboardPage';

const container = document.getElementById('root');
if (!container) throw new Error('Mount point #root not found in dashboard.html');

const root = createRoot(container);

root.render(<DashboardPage />);
