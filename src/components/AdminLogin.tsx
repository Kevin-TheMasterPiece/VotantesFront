import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setAuthToken, api } from "../services/api"; 

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  async function login() {
    setErr(null);
    setLoading(true);
    
    try {
      const response = await api.post("/api/votantes/login/", {
        username,
        password,
      });

      // Guardar el token y configurar headers
      const token = response.data.token;
      setAuthToken(token);

      setShowSuccess(true);
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error: any) {
      const errorMsg = error?.response?.data?.detail || error?.response?.data?.error || "Error en login";
      setErr(errorMsg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <style>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }

        .login-container {
          width: 100%;
          max-width: 420px;
          animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .login-card {
          background: white;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          overflow: hidden;
        }

        .login-header {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          padding: 2.5rem 2rem;
          text-align: center;
          color: white;
        }

        .login-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 1rem;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          backdrop-filter: blur(10px);
        }

        .login-icon svg {
          width: 40px;
          height: 40px;
        }

        .login-header h3 {
          margin: 0;
          font-size: 1.75rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .login-header p {
          margin: 0.5rem 0 0 0;
          opacity: 0.9;
          font-size: 0.95rem;
        }

        .login-content {
          padding: 2.5rem 2rem;
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          font-size: 0.875rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .form-group label::before {
          content: '';
          width: 4px;
          height: 16px;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          border-radius: 2px;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem;
          font-size: 1rem;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          background: #ffffff;
          transition: all 0.3s ease;
          font-family: inherit;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .form-input:hover {
          border-color: #9ca3af;
        }

        .login-button {
          width: 100%;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          border: none;
          padding: 1rem;
          font-size: 1.125rem;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
          position: relative;
          overflow: hidden;
          margin-top: 0.5rem;
        }

        .login-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transition: left 0.5s ease;
        }

        .login-button:hover::before {
          left: 100%;
        }

        .login-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
        }

        .login-button:active {
          transform: translateY(0);
        }

        .login-button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }

        .error-message {
          margin-top: 1rem;
          padding: 1rem;
          background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%);
          border-radius: 10px;
          border-left: 4px solid #ef4444;
          color: #991b1b;
          font-size: 0.9rem;
          animation: shake 0.5s ease-out;
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          padding: 3rem 2rem;
          max-width: 500px;
          width: 90%;
          text-align: center;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          animation: modalSlideUp 0.3s ease-out;
          position: relative;
        }

        @keyframes modalSlideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .modal-icon {
          margin-bottom: 1.5rem;
          animation: scaleIn 0.5s ease-out 0.2s backwards;
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }

        .modal-content h3 {
          margin: 0 0 1rem 0;
          font-size: 1.75rem;
          color: #1f2937;
          font-weight: 700;
        }

        .modal-content p {
          margin: 0;
          font-size: 1.125rem;
          color: #6b7280;
          line-height: 1.6;
        }

        @media (max-width: 480px) {
          .login-header {
            padding: 2rem 1.5rem;
          }

          .login-content {
            padding: 2rem 1.5rem;
          }

          .login-header h3 {
            font-size: 1.5rem;
          }
        }
      `}</style>

      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
            </svg>
          </div>
          <h3>Acceso Administrativo</h3>
          <p>Ingresa tus credenciales para continuar</p>
        </div>

        <div className="login-content">
          <div className="form-group">
            <label>Usuario</label>
            <input
              type="text"
              className="form-input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingresa tu usuario"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingresa tu contraseña"
              disabled={loading}
            />
          </div>

          <button
            onClick={login}
            className="login-button"
            disabled={loading || !username || !password}
          >
            {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
          </button>

          {err && (
            <div className="error-message">
              {err}
            </div>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">
              <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
                <circle cx="32" cy="32" r="32" fill="#10b981" opacity="0.2"/>
                <circle cx="32" cy="32" r="24" fill="#10b981"/>
                <path d="M20 32L28 40L44 24" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3>¡Bienvenido!</h3>
            <p>Inicio de sesión exitoso. Redirigiendo...</p>
          </div>
        </div>
      )}
    </div>
  );
}