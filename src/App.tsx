import { Routes, Route } from 'react-router-dom';

import Login from './components/pages/Login';

export default function App() {
  // const location = useLocation();
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  )
}