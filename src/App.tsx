import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import DashboardPage from "./pages/Dashboard";
import AdminLogin from "./components/AdminLogin";
import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header className="navbar">
          <h1 className="logo">VotantesApp</h1>
          <nav className="nav-links">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "active" : "")}>
              Encuesta
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => (isActive ? "active" : "")}>
              Login Admin
            </NavLink>
          </nav>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route
              path="/login"
              element={<AdminLogin onLogin={() => (window.location.href = "/dashboard")} />}
            />
          </Routes>
        </main>

        <footer className="footer">
          © {new Date().getFullYear()} Proyecto de Predicción Electoral
        </footer>
      </div>
    </BrowserRouter>
  );
}
