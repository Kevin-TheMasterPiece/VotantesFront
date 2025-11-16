import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#667eea", "#764ba2", "#f093fb", "#4facfe", "#00f2fe", "#43e97b", "#fa709a", "#fee140"];

export default function DashboardCharts({ votosPorCandidato, distribucionGenero }: any) {
  // Ordenar candidatos por total descendente
  const candidatosOrdenados = [...(votosPorCandidato || [])].sort((a, b) => (b.total || 0) - (a.total || 0));

  // Encontrar candidato con más votos
  const candidatoGanador = candidatosOrdenados[0];
  const totalVotos = candidatosOrdenados.reduce((sum, c) => sum + (c.total || 0), 0);

  return (
    <div className="charts-container">
      {/* Stats principales */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-label">Total de Encuestas</div>
          <div className="stat-value">{totalVotos}</div>
        </div>
        <div className="stat-card highlight">
          <div className="stat-label">Candidato Ganador</div>
          <div className="stat-value" style={{ fontSize: "1.3rem", marginTop: "0.5rem" }}>
            {candidatoGanador?.predicted_vote || "N/A"}
          </div>
          <div className="stat-subtext">{candidatoGanador?.total || 0} votos</div>
        </div>
        <div className="stat-card">
          <div className="stat-label">% del Ganador</div>
          <div className="stat-value">
            {totalVotos > 0 ? ((candidatoGanador?.total || 0) / totalVotos * 100).toFixed(1) : 0}%
          </div>
        </div>
      </div>

      {/* Gráfico de barras */}
      <div className="chart-section">
        <div className="chart-card">
          <div className="chart-header">
            <h3>Votos por Candidato</h3>
            <span className="chart-subtitle">Distribución de predicciones</span>
          </div>
          <ResponsiveContainer height={300} width="100%">
            <BarChart data={candidatosOrdenados} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
              <XAxis 
                dataKey="predicted_vote" 
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis />
              <Tooltip 
                contentStyle={{ background: "#fff", border: "1px solid #e5e7eb" }}
                formatter={(value) => [value, "Votos"]}
              />
              <Bar dataKey="total" fill="#667eea" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de pastel - Género */}
      {distribucionGenero && distribucionGenero.length > 0 && (
        <div className="chart-section">
          <div className="chart-card">
            <div className="chart-header">
              <h3>Distribución por Género</h3>
              <span className="chart-subtitle">Participación por género</span>
            </div>
            <ResponsiveContainer height={300} width="100%">
              <PieChart>
                <Pie
                  data={distribucionGenero}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(props: any) => {
                    // Recharts passes label props where entry is in props.payload
                    const payload = props.payload || props;
                    const name = payload.genero ?? payload.gender ?? payload.label ?? payload.name ?? payload.tipo ?? payload.key ?? 'N/A';
                    const value = payload.total ?? payload.value ?? props.value ?? 0;
                    return `${name}: ${value}`;
                  }}
                  outerRadius={100}
                  fill="#667eea"
                  dataKey="total"
                >
                  {distribucionGenero.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [value, "Participantes"]} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Lista de candidatos */}
      <div className="candidates-section">
        <h3 style={{ marginBottom: "1rem" }}>Resultados Detallados</h3>
        <div className="candidates-grid">
          {candidatosOrdenados.map((candidato, index) => {
            const porcentaje = totalVotos > 0 ? ((candidato.total || 0) / totalVotos * 100) : 0;
            return (
              <div key={candidato.predicted_vote} className="candidate-card">
                <div className="candidate-rank">#{index + 1}</div>
                <div className="candidate-info">
                  <div className="candidate-name">{candidato.predicted_vote}</div>
                  <div className="candidate-votes">{candidato.total} votos</div>
                  <div className="candidate-percentage">{porcentaje.toFixed(1)}%</div>
                </div>
                <div className="candidate-bar-wrapper">
                  <div className="candidate-bar" style={{ width: `${porcentaje}%` }}></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

