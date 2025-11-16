import { useState } from "react";
import "./VoterForm.css";

// Tipos - AHORA CON TODOS LOS CAMPOS
interface VotantePayload {
    age: number;
    gender: number;
    education: number;
    employment_status: number;
    employment_sector: number;
    income_bracket: number;
    marital_status: number;
    household_size: number;
    has_children: number;
    urbanicity: number;
    region: number;
    voted_last: number;
    party_id_strength: number;
    union_member: number;
    public_sector: number;
    home_owner: number;
    small_biz_owner: number;
    owns_car: number;
    will_turnout: number;
    undecided: number;
    preference_strength: number;
    tv_news_hours: number;
    social_media_hours: number;
    trust_media: number;
    civic_participation: number;
    job_tenure_years: number;
    // Campos adicionales que el modelo espera
    wa_groups: number;
    refused_count: number;
    attention_check: number;
}


// Valores por defecto COMPLETOS
const defaultPayload: VotantePayload = {
    age: 30,
    gender: 1,
    education: 2,
    employment_status: 1,
    employment_sector: 1,
    income_bracket: 2,
    marital_status: 1,
    household_size: 3,
    has_children: 0,
    urbanicity: 1,
    region: 1,
    voted_last: 1,
    party_id_strength: 0,
    union_member: 0,
    public_sector: 0,
    home_owner: 0,
    small_biz_owner: 0,
    owns_car: 1,
    will_turnout: 1,
    undecided: 0,
    preference_strength: 3,
    tv_news_hours: 1,
    social_media_hours: 2,
    trust_media: 3,
    civic_participation: 3,
    job_tenure_years: 5,
    wa_groups: 0,
    refused_count: 0,
    attention_check: 0,
};

export default function VoterForm() {
    const [form, setForm] = useState<VotantePayload>(defaultPayload);
    const [showThanks, setShowThanks] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (key: keyof VotantePayload, value: number) => {
        setForm((prev) => ({ ...prev, [key]: value }));
    };

    const submit = async () => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await fetch("http://127.0.0.1:8000/api/votantes/predict/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Error: ${response.status}`);
            }

            const data = await response.json();
            console.log("Respuesta del servidor:", data);

            // No mostrar la predicción al encuestado. Mostrar modal de agradecimiento.
            setShowThanks(true);
            
        } catch (err: any) {
            console.error("Error en la predicción:", err);
            setError(err.message || "Error al procesar la predicción");
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm(defaultPayload);
        setError(null);
    };

    return (
        <div className="voter-form-container">
            <div className="form-header">
                <h2>Encuesta de Intención de Voto</h2>
                <p>Complete el formulario para obtener una predicción del candidato</p>
            </div>

            <div className="form-content">
                <form className="voter-form" onSubmit={(e) => { e.preventDefault(); submit(); }}>
                <div className="form-grid">
                    {/* === INFORMACIÓN DEMOGRÁFICA === */}
                    <div className="form-section">
                        <h3>Información Demográfica</h3>
                        
                        {/* Edad */}
                        <div className="form-group">
                            <label>Edad</label>
                            <input
                                type="number"
                                className="form-input"
                                min="18"
                                max="100"
                                value={form.age}
                                onChange={(e) => handleChange("age", Number(e.target.value))}
                            />
                        </div>

                        {/* Género */}
                        <div className="form-group">
                            <label>Género</label>
                            <select
                                className="form-select"
                                value={form.gender}
                                onChange={(e) => handleChange("gender", Number(e.target.value))}
                            >
                                <option value={0}>Femenino</option>
                                <option value={1}>Masculino</option>
                                <option value={2}>Otro</option>
                            </select>
                        </div>

                        {/* Estado civil */}
                        <div className="form-group">
                            <label>Estado Civil</label>
                            <select
                                className="form-select"
                                value={form.marital_status}
                                onChange={(e) => handleChange("marital_status", Number(e.target.value))}
                            >
                                <option value={0}>Soltero/a</option>
                                <option value={1}>Casado/a</option>
                                <option value={2}>Divorciado/a</option>
                                <option value={3}>Viudo/a</option>
                                <option value={4}>Unión libre</option>
                            </select>
                        </div>

                        {/* Tamaño del hogar */}
                        <div className="form-group">
                            <label>Personas en el Hogar</label>
                            <input
                                type="number"
                                className="form-input"
                                min="1"
                                max="10"
                                value={form.household_size}
                                onChange={(e) => handleChange("household_size", Number(e.target.value))}
                            />
                        </div>

                        {/* Tiene hijos */}
                        <div className="form-group">
                            <label>¿Tiene Hijos?</label>
                            <select
                                className="form-select"
                                value={form.has_children}
                                onChange={(e) => handleChange("has_children", Number(e.target.value))}
                            >
                                <option value={1}>Sí</option>
                                <option value={0}>No</option>
                            </select>
                        </div>
                    </div>

                    {/* === EDUCACIÓN Y EMPLEO === */}
                    <div className="form-section">
                        <h3>Educación y Empleo</h3>

                        {/* Educación */}
                        <div className="form-group">
                            <label>Nivel Educativo</label>
                            <select
                                className="form-select"
                                value={form.education}
                                onChange={(e) => handleChange("education", Number(e.target.value))}
                            >
                                <option value={0}>Sin educación</option>
                                <option value={1}>Primaria</option>
                                <option value={2}>Secundaria</option>
                                <option value={3}>Técnico</option>
                                <option value={4}>Universitario</option>
                                <option value={5}>Posgrado</option>
                            </select>
                        </div>

                        {/* Estado laboral */}
                        <div className="form-group">
                            <label>Situación Laboral</label>
                            <select
                                className="form-select"
                                value={form.employment_status}
                                onChange={(e) => handleChange("employment_status", Number(e.target.value))}
                            >
                                <option value={0}>Desempleado</option>
                                <option value={1}>Empleado tiempo completo</option>
                                <option value={2}>Empleado medio tiempo</option>
                                <option value={3}>Independiente</option>
                                <option value={4}>Estudiante</option>
                                <option value={5}>Jubilado</option>
                            </select>
                        </div>

                        {/* Sector laboral */}
                        <div className="form-group">
                            <label>Sector Laboral</label>
                            <select
                                className="form-select"
                                value={form.employment_sector}
                                onChange={(e) => handleChange("employment_sector", Number(e.target.value))}
                            >
                                <option value={0}>Privado</option>
                                <option value={1}>Público</option>
                                <option value={2}>ONG</option>
                                <option value={3}>Agricultura</option>
                                <option value={4}>Industria</option>
                                <option value={5}>Servicios</option>
                            </select>
                        </div>

                        {/* Años en el trabajo */}
                        <div className="form-group">
                            <label>Años en Empleo Actual</label>
                            <input
                                type="number"
                                className="form-input"
                                min="0"
                                max="50"
                                value={form.job_tenure_years}
                                onChange={(e) => handleChange("job_tenure_years", Number(e.target.value))}
                            />
                        </div>

                        {/* Ingresos */}
                        <div className="form-group">
                            <label>Rango de Ingresos</label>
                            <select
                                className="form-select"
                                value={form.income_bracket}
                                onChange={(e) => handleChange("income_bracket", Number(e.target.value))}
                            >
                                <option value={0}>Muy bajo</option>
                                <option value={1}>Bajo</option>
                                <option value={2}>Medio bajo</option>
                                <option value={3}>Medio</option>
                                <option value={4}>Medio alto</option>
                                <option value={5}>Alto</option>
                            </select>
                        </div>
                    </div>

                    {/* === UBICACIÓN Y VIVIENDA === */}
                    <div className="form-section">
                        <h3>Ubicación y Vivienda</h3>

                        {/* Urbanicidad */}
                        <div className="form-group">
                            <label>Zona de Residencia</label>
                            <select
                                className="form-select"
                                value={form.urbanicity}
                                onChange={(e) => handleChange("urbanicity", Number(e.target.value))}
                            >
                                <option value={0}>Rural</option>
                                <option value={1}>Suburbana</option>
                                <option value={2}>Urbana</option>
                            </select>
                        </div>

                        {/* Región */}
                        <div className="form-group">
                            <label>Región</label>
                            <select
                                className="form-select"
                                value={form.region}
                                onChange={(e) => handleChange("region", Number(e.target.value))}
                            >
                                <option value={0}>Norte</option>
                                <option value={1}>Noreste</option>
                                <option value={2}>Centro</option>
                                <option value={3}>Sur</option>
                                <option value={4}>Occidente</option>
                            </select>
                        </div>

                        {/* Propietario vivienda */}
                        <div className="form-group">
                            <label>¿Es Propietario de Vivienda?</label>
                            <select
                                className="form-select"
                                value={form.home_owner}
                                onChange={(e) => handleChange("home_owner", Number(e.target.value))}
                            >
                                <option value={1}>Sí</option>
                                <option value={0}>No</option>
                            </select>
                        </div>

                        {/* Tiene auto */}
                        <div className="form-group">
                            <label>¿Tiene Automóvil?</label>
                            <select
                                className="form-select"
                                value={form.owns_car}
                                onChange={(e) => handleChange("owns_car", Number(e.target.value))}
                            >
                                <option value={1}>Sí</option>
                                <option value={0}>No</option>
                            </select>
                        </div>
                    </div>

                    {/* === COMPORTAMIENTO POLÍTICO === */}
                    <div className="form-section">
                        <h3>Comportamiento Político</h3>

                        {/* Votó última elección */}
                        <div className="form-group">
                            <label>¿Votó en la Última Elección?</label>
                            <select
                                className="form-select"
                                value={form.voted_last}
                                onChange={(e) => handleChange("voted_last", Number(e.target.value))}
                            >
                                <option value={1}>Sí</option>
                                <option value={0}>No</option>
                            </select>
                        </div>

                        {/* Fuerza identificación partido */}
                        <div className="form-group">
                            <label>Identificación con Partido</label>
                            <select
                                className="form-select"
                                value={form.party_id_strength}
                                onChange={(e) => handleChange("party_id_strength", Number(e.target.value))}
                            >
                                <option value={0}>Ninguna</option>
                                <option value={1}>Muy débil</option>
                                <option value={2}>Débil</option>
                                <option value={3}>Moderada</option>
                                <option value={4}>Fuerte</option>
                            </select>
                        </div>

                        {/* Miembro sindicato */}
                        <div className="form-group">
                            <label>¿Es Miembro de Sindicato?</label>
                            <select
                                className="form-select"
                                value={form.union_member}
                                onChange={(e) => handleChange("union_member", Number(e.target.value))}
                            >
                                <option value={1}>Sí</option>
                                <option value={0}>No</option>
                            </select>
                        </div>

                        {/* Sector público */}
                        <div className="form-group">
                            <label>¿Trabaja en Sector Público?</label>
                            <select
                                className="form-select"
                                value={form.public_sector}
                                onChange={(e) => handleChange("public_sector", Number(e.target.value))}
                            >
                                <option value={1}>Sí</option>
                                <option value={0}>No</option>
                            </select>
                        </div>

                        {/* Dueño pequeño negocio */}
                        <div className="form-group">
                            <label>¿Es Dueño de Pequeño Negocio?</label>
                            <select
                                className="form-select"
                                value={form.small_biz_owner}
                                onChange={(e) => handleChange("small_biz_owner", Number(e.target.value))}
                            >
                                <option value={1}>Sí</option>
                                <option value={0}>No</option>
                            </select>
                        </div>

                        {/* Participación cívica */}
                        <div className="form-group">
                            <label>Participación Cívica (1-10)</label>
                            <input
                                type="number"
                                className="form-input"
                                min="1"
                                max="10"
                                value={form.civic_participation}
                                onChange={(e) => handleChange("civic_participation", Number(e.target.value))}
                            />
                        </div>
                    </div>

                    {/* === MEDIOS Y PREFERENCIAS === */}
                    <div className="form-section media-section">
                        <h3>Medios y Preferencias</h3>

                        {/* Horas TV noticias */}
                        <div className="form-group">
                            <label>Horas de Noticias en TV (diarias)</label>
                            <input
                                type="number"
                                className="form-input"
                                min="0"
                                max="24"
                                step="0.5"
                                value={form.tv_news_hours}
                                onChange={(e) => handleChange("tv_news_hours", Number(e.target.value))}
                            />
                        </div>

                        {/* Horas redes sociales */}
                        <div className="form-group">
                            <label>Horas en Redes Sociales (diarias)</label>
                            <input
                                type="number"
                                className="form-input"
                                min="0"
                                max="24"
                                step="0.5"
                                value={form.social_media_hours}
                                onChange={(e) => handleChange("social_media_hours", Number(e.target.value))}
                            />
                        </div>

                        {/* Confianza en medios */}
                        <div className="form-group">
                            <label>Confianza en Medios (1-10)</label>
                            <input
                                type="number"
                                className="form-input"
                                min="1"
                                max="10"
                                value={form.trust_media}
                                onChange={(e) => handleChange("trust_media", Number(e.target.value))}
                            />
                        </div>

                        {/* Fuerza preferencia */}
                        <div className="form-group">
                            <label>Fuerza de Preferencia (1-10)</label>
                            <input
                                type="number"
                                className="form-input"
                                min="1"
                                max="10"
                                value={form.preference_strength}
                                onChange={(e) => handleChange("preference_strength", Number(e.target.value))}
                            />
                        </div>

                        {/* Indeciso */}
                        <div className="form-group">
                            <label>¿Se Considera Indeciso?</label>
                            <select
                                className="form-select"
                                value={form.undecided}
                                onChange={(e) => handleChange("undecided", Number(e.target.value))}
                            >
                                <option value={1}>Sí</option>
                                <option value={0}>No</option>
                            </select>
                        </div>

                        {/* Participará en elección */}
                        <div className="form-group">
                            <label>¿Participará en Próxima Elección?</label>
                            <select
                                className="form-select"
                                value={form.will_turnout}
                                onChange={(e) => handleChange("will_turnout", Number(e.target.value))}
                            >
                                <option value={1}>Sí</option>
                                <option value={0}>No</option>
                            </select>
                        </div>
                    </div>

                    
                </div>

                {/* BOTONES */}
                <div className="submit-container">
                    <button
                        onClick={resetForm}
                        className="reset-button"
                        type="button"
                    >
                        Reiniciar Formulario
                    </button>
                    
                    <button
                        className="submit-button"
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? "Procesando..." : "Enviar encuesta"}
                    </button>
                </div>
                </form>

                {/* MENSAJES DE ERROR */}
                {error && (
                    <div className="error-message">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* Modal de agradecimiento (se muestra tras enviar la encuesta) */}
                {showThanks && (
                    <div className="modal-overlay" role="dialog" aria-modal="true">
                        <div className="modal-content">
                            <div className="modal-icon" aria-hidden>🎉</div>
                            <h3>¡Gracias por completar la encuesta!</h3>
                            <p>Hemos recibido su respuesta correctamente.</p>
                            <div className="modal-actions" style={{ marginTop: '1rem' }}>
                                <button
                                    className="modal-button"
                                    onClick={() => { setShowThanks(false); resetForm(); }}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}