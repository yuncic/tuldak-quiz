import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DentalQuizPage from './pages/DentalQuizPage';
import FinalResultPage from './pages/FinalResultPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/quiz/dental" element={<DentalQuizPage />} />
        <Route path="/result" element={<FinalResultPage />} />
      </Routes>
    </BrowserRouter>
  );
}
