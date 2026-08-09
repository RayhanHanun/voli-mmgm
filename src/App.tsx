import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import PublicStandings from './pages/PublicView';
import ScheduleView from './pages/ScheduleView';
import AdminView from './pages/AdminView';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicStandings />} />
          <Route path="/jadwal" element={<ScheduleView />} />
          <Route path="/admin" element={<AdminView />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
