import { createRoot } from 'react-dom/client';
import Home from '@/pages/home/Home';

const container = document.getElementById('root');
if (!container) throw new Error('Mount point #root not found in home.html');

const root = createRoot(container);

root.render(<Home />);
