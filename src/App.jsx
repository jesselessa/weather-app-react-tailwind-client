import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Pages and components
import Home from "./pages/Home.jsx";
import Favorites from "./pages/Favorites.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import OverlayMsg from "./components/OverlayMsg.jsx";

function App() {
  const [showOverlay, setShowOverlay] = useState(true);

  return (
    <BrowserRouter>
      {showOverlay && <OverlayMsg hideOverlay={() => setShowOverlay(false)} />}

      {!showOverlay && (
        <div className="min-h-screen flex flex-col justify-between">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          <Footer />
        </div>
      )}

      <ToastContainer autoClose={1500} draggable={false} />
    </BrowserRouter>
  );
}

export default App;
