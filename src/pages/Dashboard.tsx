import { useEffect, useState } from "react";
import { api } from "../services/api";
import DashboardCharts from "../components/DashboardCharts";
import VotantesTable from "../components/VotantesTable";
import "./Dashboard.css";

export default function DashboardPage() {
  const [stats, setStats] = useState<any | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    api
      .get("/api/votantes/dashboard/")
      .then((r) => {
        setStats(r.data);
        setErr(null);
      })
      .catch((e) => {
        setErr(e?.response?.data?.detail || "Error al cargar datos");
        setStats(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="dashboard-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Cargando datos del dashboard...</p>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className="dashboard-page">
        <div className="error-container">
          <p className="error-text">{err}</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="dashboard-page">
        <div className="empty-container">
          <p>No hay datos disponibles</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Panel de Administración</h1>
          <p className="header-subtitle">Análisis de Predicciones de Voto</p>
        </div>
        
      </div>

      <DashboardCharts
        votosPorCandidato={stats.votos_por_candidato}
        distribucionGenero={stats.distribucion_genero}
      />

      <div className="table-section">
        <h2>Detalle de Respuestas</h2>
        <VotantesTable />
      </div>
    </div>
  );
}
