import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section style={{
      minHeight: "100vh",
      display: "flex",
      background: "#0A0A0A",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* LADO IZQUIERDO: Contenido y Textos (50%) */}
      <div style={{
        flex: "0 0 50%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "0 6vw",
        zIndex: 2,
      }}>
        
        {/* Etiqueta / Badge */}
        <div style={{ marginBottom: "24px" }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            border: "1px solid rgba(45,90,64,0.55)",
            borderRadius: "100px",
            padding: "6px 14px",
            fontSize: "11px", letterSpacing: "0.12em",
            color: "#4a9e6e", /* Color más vivo para resaltar */
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase",
            background: "rgba(45,90,64,0.1)",
          }}>
            <span style={{
              width: "6px", height: "6px",
              borderRadius: "50%", background: "#4a9e6e", flexShrink: 0,
            }} />
            Venta directa · Coto Brus
          </span>
        </div>

        {/* Título Principal */}
        <div style={{ marginBottom: "20px" }}>
          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(40px, 4.5vw, 64px)",
            fontWeight: 400, color: "#F0EDE6",
            letterSpacing: "-0.02em", lineHeight: 1.1, margin: 0,
          }}>
            Tu próxima <br />propiedad está en<br />
            <span style={{ fontWeight: 600, color: "#ffffff" }}>
              Coto Brus.
            </span>
          </h1>
        </div>

        {/* Subtítulo */}
        <div style={{ marginBottom: "40px" }}>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "16px", fontWeight: 300,
            color: "rgba(240,237,230,0.7)",
            lineHeight: 1.6, margin: 0, maxWidth: "85%",
          }}>
            Venta directa con Carlos Azofeifa Arias. Encuentra fincas, lotes y locales comerciales con el mejor respaldo de la zona.
          </p>
        </div>

        {/* Botones de Acción */}
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <Link
            to="/propiedades"
            style={{
              padding: "14px 32px",
              background: "#2D5A40", color: "#FFFFFF",
              fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500,
              textDecoration: "none", borderRadius: "6px",
              transition: "background 0.3s ease",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#3d7a56"}
            onMouseLeave={e => e.currentTarget.style.background = "#2D5A40"}
          >
            Ver propiedades
          </Link>

          <a
            href="https://wa.me/50683819331" // Actualicé el número basándome en tu header
            target="_blank" rel="noopener noreferrer"
            style={{
              padding: "14px 32px",
              background: "transparent", color: "#F0EDE6",
              fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500,
              textDecoration: "none", borderRadius: "6px",
              border: "1px solid rgba(240,237,230,0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = "#F0EDE6";
              e.currentTarget.style.background = "rgba(240,237,230,0.05)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = "rgba(240,237,230,0.3)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            Contactar por WhatsApp
          </a>
        </div>
      </div>

      {/* LADO DERECHO: Imagen de la Propiedad (50%) */}
      <div style={{
        flex: "0 0 50%",
        position: "relative",
        /* REEMPLAZA ESTA URL CON LA FOTO DE UNA FINCA O PROPIEDAD REAL */
        backgroundImage: "url('/images/hero-property.jpg')", 
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
        {/* Filtro degradado para que la imagen se fusione suavemente con el fondo negro */}
        <div style={{
          position: "absolute",
          top: 0, bottom: 0, left: 0,
          width: "150px",
          background: "linear-gradient(to right, #0A0A0A 0%, transparent 100%)",
        }} />
      </div>

      {/* Indicador de Scroll (Centrado en la parte inferior izquierda) */}
      <div style={{
        position: "absolute",
        bottom: "30px", left: "6vw",
        display: "flex", alignItems: "center", gap: "12px",
      }}>
        <div style={{
          width: "40px", height: "1px",
          background: "rgba(240,237,230,0.3)",
        }} />
        <span style={{
          fontFamily: "'Inter', sans-serif", fontSize: "11px",
          letterSpacing: "0.15em", color: "rgba(240,237,230,0.5)",
          textTransform: "uppercase",
        }}>
          Explorar catálogo
        </span>
      </div>

    </section>
  );
}
