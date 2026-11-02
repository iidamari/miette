import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Discover from "./pages/Discover";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <BrowserRouter>
      <div className="magazine">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/discover" element={<Discover />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>

        <footer className="magazine-footer">
          M I E T T E · RECIPES & INSPIRATION
        </footer>

      </div>
    </BrowserRouter>
  );
}

export default App;