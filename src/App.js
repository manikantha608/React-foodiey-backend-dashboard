import logo from './logo.svg';
import './App.css';
import LandingPage from './vendorDashboard/pages/LandingPage';
import { Route, Router, Routes } from 'react-router-dom';
import NotFound from './vendorDashboard/components/NotFound';

function App() {
  return (
    <div className="App">
      <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='/*' element={<NotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;
