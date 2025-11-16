import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Votante {
  id: number;
  nombre: string;
  cc_User: string;
  gender: string;
  predicted_vote: string;
  created_at: string;
}

export default function VotantesTable() {
  const [votantes, setVotantes] = useState<Votante[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get("/api/votantes/listavotantes/")
      .then((res) => setVotantes(res.data))
      .catch((e) => setError(e?.response?.data?.detail || "Error al cargar votantes"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando lista de votantes...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="dashboard-card">
      <h4>Listado de encuestas</h4>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "#f3f4f6", textAlign: "left" }}>
              <th style={th}>ID</th>

              <th style={th}>Voto</th>
              <th style={th}>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {votantes.map((v) => (
              <tr key={v.id} style={{ borderBottom: "1px solid #e5e7eb" }}>
                <td style={td}>{v.id}</td>
                <td style={td}>{v.predicted_vote}</td>
                <td style={td}>{new Date(v.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th: React.CSSProperties = {
  padding: "8px 12px",
  fontWeight: "bold",
  color: "#111827",
  fontSize: "0.9rem",
  borderBottom: "2px solid #e5e7eb",
};

const td: React.CSSProperties = {
  padding: "8px 12px",
  color: "#374151",
  fontSize: "0.9rem",
};
