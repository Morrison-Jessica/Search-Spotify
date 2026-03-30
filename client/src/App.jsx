// 💙 🌐, 🗺️, 📍
import { HashRouter, Routes, Route } from 'react-router-dom';

// 🛡️
import Auth from './pages/Auth';
// 🏠
import Dashboard from './pages/Dashboard';

// ======================================================

// 🈸
function App() {
  

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </HashRouter>
    </>
  )
}

export default App
