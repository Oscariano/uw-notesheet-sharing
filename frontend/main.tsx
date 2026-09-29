import ReactDOM from 'react-dom/client';
import Home from '@/pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router';
import '@/styles/style.css'
import NoteView from './pages/notesheet_view/NotesheetView';

import { AuthProvider } from '@/lib/context/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import UploadNotesheet from './pages/upload_notesheet/UploadNotesheet';

const root = document.getElementById('root');
if (!root) throw new Error('Mount point #root not found in home.html');

ReactDOM.createRoot(root).render(
    <AuthProvider>
        <BrowserRouter>
            <Routes>
                <Route index element={<Home/ >} />
                <Route path='/login' element={<Home/ >} />

                <Route element={<ProtectedRoute />}>
                    <Route path='/notesheet/:notesheet_id' element={<NoteView/ >} />
                </Route>
                <Route path='/upload' element={<UploadNotesheet />} />
            </Routes>
        </BrowserRouter>
    </ AuthProvider>
)
