import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
export default function HeroSection() {
  const leftRef = useRef(null);
  const logoRef = useRef(null);
  const lineRef = useRef(null);
  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (leftRef.current) {
        leftRef.current.style.opacity = "1";
        leftRef.current.style.transform = "translateY(0)";
      }
    }, 100);
    const timer2 = setTimeout(() => {
      if (logoRef.current) {
        logoRef.current.style.opacity = "0.11";
        logoRef.current.style.transform = "scale(1)";
      }
    }, 400);
    const timer3 = setTimeout(() => {
      if (lineRef.current) {
        lineRef.current.style.height = "60%";
        lineRef.current.style.opacity = "1";
      }
    }, 200);
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  return (
    <section style={{
      minHeight: "100vh",
      background: "#0A0A0A",
      display: "flex",
      alignItems: "center",
      position: "relative",
      overflow: "hidden",
      padding: "0 6vw",
    }}>
      {/* Subtle grain texture overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.03'/%3E%3C/svg%3E")`,
        opacity: 0.4,
        pointerEvents: "none",
        zIndex: 1,
      }} />
      {/* Subtle green glow bottom left */}
      <div style={{
        position: "absolute",
        bottom: "-10%",
        left: "-5%",
        width: "40vw",
        height: "40vw",
        background: "radial-gradient(circle, rgba(26,58,42,0.18) 0%, transparent 70%)",
        pointerEvents: "none",
        zIndex: 1,
      }} />
      {/* LEFT COLUMN — 60% */}
      <div style={{
        flex: "0 0 58%",
        maxWidth: "58%",
        display: "flex",
        alignItems: "flex-start",
        gap: "32px",
        position: "relative",
        zIndex: 2,
        paddingRight: "4vw",
      }}>
        {/* Animated vertical line */}
        <div
          ref={lineRef}
          style={{
            width: "1.5px",
            height: "0%",
            background: "linear-gradient(to bottom, transparent, #1A3A2A 30%, #2D5A40 70%, transparent)",
            flexShrink: 0,
            marginTop: "8px",
            transition: "height 1.2s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease",
            opacity: 0,
            alignSelf: "stretch",
            minHeight: "180px",
          }}
        />
        {/* Text block */}
        <div
          ref={leftRef}
          style={{
            opacity: 0,
            transform: "translateY(28px)",
            transition: "opacity 0.9s ease, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Label */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "11px",
            letterSpacing: "0.22em",
            color: "#2D5A40",
            textTransform: "uppercase",
            margin: "0 0 24px 0",
            fontWeight: 500,
          }}>
            Coto Brus · Costa Rica
          </p>
          {/* Main heading */}
          <h1 style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(36px, 4.5vw, 68px)",
            fontWeight: 300,
            color: "#F0EDE6",
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            margin: "0 0 20px 0",
          }}>
            Tu próxima<br />
            propiedad está<br />
            en Coto Brus.
          </h1>
          {/* Subheading */}
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "15px",
            fontWeight: 400,
            color: "rgba(240,237,230,0.5)",
            lineHeight: 1.65,
            margin: "0 0 44px 0",
            maxWidth: "420px",
          }}>
            Venta directa con Carlos Azofeifa Arias,
            fincas, lotes y locales comerciales.
          </p>
          {/* Buttons */}
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Link
              to="/properties"
              style={{
                display: "inline-block",
                padding: "12px 32px",
                border: "1px solid rgba(240,237,230,0.25)",
                color: "#F0EDE6",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 400,
                letterSpacing: "0.08em",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "background 0.25s ease, border-color 0.25s ease",
                background: "transparent",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(240,237,230,0.06)";
                e.currentTarget.style.borderColor = "rgba(240,237,230,0.5)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(240,237,230,0.25)";
              }}
            >
              Ver propiedades
            </Link>
            <a
              href="https://wa.me/50688319331"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "12px 32px",
                background: "#1A3A2A",
                color: "#F0EDE6",
                fontFamily: "'Inter', sans-serif",
                fontSize: "12px",
                fontWeight: 500,
                letterSpacing: "0.08em",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "background 0.25s ease",
                border: "1px solid transparent",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#2D5A40";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#1A3A2A";
              }}
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
      {/* RIGHT COLUMN — 40% */}
      <div style={{
        flex: "0 0 42%",
        maxWidth: "42%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        zIndex: 2,
        height: "100vh",
      }}>
        <img
          ref={logoRef}
          src="/images/az-logo.png"
          alt="AZ Inmuebles"
          style={{
            width: "75%",
            maxWidth: "380px",
            opacity: 0,
            transform: "scale(1.04)",
            transition: "opacity 1.6s ease, transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)",
            userSelect: "none",
            pointerEvents: "none",
            filter: "brightness(0.9)",
          }}
        />
      </div>
    </section>
  );
}
