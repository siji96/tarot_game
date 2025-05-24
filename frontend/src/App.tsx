import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TarotGame from "./pages/TarotGame";
import Landing from "./pages/Landing";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/draw" element={<TarotGame />} />
      </Routes>
    </Router>
  );
}
