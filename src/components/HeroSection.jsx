import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const badgeRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const rightRef = useRef(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const els = [
      { ref: badgeRef, delay: 0 },
      { ref: titleRef, delay: 120 },
      { ref: subtitleRef, delay: 220 },
      { ref: buttonsRef, delay: 340 },
      { ref: rightRef, delay: 180 },
      { ref: scrollRef, delay: 600 },
    ];
    const timers = els.map(({ ref, delay }) =>
      setTimeout(() => {
        if (ref.current) {
          ref.current.style.opacity = "1";
          ref.current.style.transform = ref.current.dataset.transform || "translateY(0)";
        }
      }, delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <section style={{
      minHeight: "100vh",
      background: "#0A0A0A",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>

      {/* Ambient glows */}
      <div style={{
        position: "absolute",
        bottom: "-15%", left: "-8%",
        width: "50vw", height: "50vw",
        background: "radial-gradient(circle, rgba(26,58,42,0.22) 0%, transparent 65%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        top: "10%", right: "5%",
        width: "30vw", height: "30vw",
        background: "radial-gradient(circle, rgba(26,58,42,0.1) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* MAIN SPLIT */}
      <div style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        padding: "0 7vw",
        gap: "4vw",
        minHeight: "calc(100vh - 80px)",
      }}>

        {/* LEFT 58% */}
        <div style={{ flex: "0 0 58%", maxWidth: "58%" }}>

          {/* Badge */}
          <div ref={badgeRef} style={{
            opacity: 0,
            transform: "translateY(16px)",
            transition: "opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1)",
            display: "inline-block",
            marginBottom: "32px",
          }}>
            <span style={{
              display: "inline-flex", alignItems: "center", gap: "8px",
              border: "1px solid rgba(45,90,64,0.55)",
              borderRadius: "100px",
              padding: "6px 14px 6px 10px",
              fontSize: "11px", letterSpacing: "0.12em",
              color: "rgba(240,237,230,0.65)",
              fontFamily: "'Inter', sans-serif",
              textTransform: "uppercase",
            }}>
              <span style={{
                width: "6px", height: "6px",
                borderRadius: "50%", background: "#2D5A40", flexShrink: 0,
              }} />
              Venta directa · Coto Brus
            </span>
          </div>

          {/* Heading */}
          <div ref={titleRef} style={{
            opacity: 0, transform: "translateY(18px)",
            transition: "opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "20px",
          }}>
            <h1 style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "clamp(38px, 4.8vw, 72px)",
              fontWeight: 300, color: "#F0EDE6",
              letterSpacing: "-0.03em", lineHeight: 1.08, margin: 0,
            }}>
              Tu próxima<br />
              propiedad está<br />
              en{" "}
              <span style={{ fontStyle: "italic", color: "#4a9e6e" }}>
                Coto Brus.
              </span>
            </h1>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef} style={{
            opacity: 0, transform: "translateY(18px)",
            transition: "opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1)",
            marginBottom: "44px",
          }}>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "15px", fontWeight: 400,
              color: "rgba(240,237,230,0.45)",
              lineHeight: 1.7, margin: 0, maxWidth: "380px",
            }}>
              Venta directa con Carlos Azofeifa Arias,
              fincas, lotes y locales comerciales.
            </p>
          </div>

          {/* Buttons */}
          <div ref={buttonsRef} style={{
            opacity: 0, transform: "translateY(18px)",
            transition: "opacity 0.85s ease, transform 0.85s cubic-bezier(0.16,1,0.3,1)",
            display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap",
          }}>
            <Link
              to="/properties"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 28px",
                background: "#1A3A2A", color: "#F0EDE6",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px", fontWeight: 500, letterSpacing: "0.04em",
                textDecoration: "none", borderRadius: "4px",
                border: "1px solid #2D5A40",
                transition: "background 0.25s ease, border-color 0.25s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "#2D5A40";
                e.currentTarget.style.borderColor = "#3d7a56";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "#1A3A2A";
                e.currentTarget.style.borderColor = "#2D5A40";
              }}
            >
              Ver propiedades →
            </Link>

            <a
              href="https://wa.me/50688319331"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                padding: "13px 28px",
                background: "transparent", color: "rgba(240,237,230,0.6)",
                fontFamily: "'Inter', sans-serif",
                fontSize: "13px", fontWeight: 400, letterSpacing: "0.04em",
                textDecoration: "none",
                border: "1px solid rgba(240,237,230,0.15)", borderRadius: "4px",
                transition: "color 0.25s ease, border-color 0.25s ease",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = "#F0EDE6";
                e.currentTarget.style.borderColor = "rgba(240,237,230,0.35)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = "rgba(240,237,230,0.6)";
                e.currentTarget.style.borderColor = "rgba(240,237,230,0.15)";
              }}
            >
              WhatsApp →
            </a>
          </div>
        </div>

        {/* RIGHT 42% */}
        <div style={{
          flex: "0 0 42%", maxWidth: "42%",
          display: "flex", alignItems: "center", justifyContent: "center",
          position: "relative", minHeight: "400px",
        }}>
          {/* Corner brackets */}
          <div style={{
            position: "absolute", top: "5%", right: "5%",
            width: "36px", height: "36px",
            borderTop: "1px solid rgba(45,90,64,0.35)",
            borderRight: "1px solid rgba(45,90,64,0.35)",
          }} />
          <div style={{
            position: "absolute", bottom: "5%", left: "5%",
            width: "36px", height: "36px",
            borderBottom: "1px solid rgba(45,90,64,0.35)",
            borderLeft: "1px solid rgba(45,90,64,0.35)",
          }} />

          {/* Vertical label */}
          <div style={{
            position: "absolute", right: "-16px", top: "50%",
            transform: "translateY(-50%) rotate(90deg)",
            fontSize: "10px", letterSpacing: "0.2em",
            color: "rgba(240,237,230,0.18)",
            fontFamily: "'Inter', sans-serif",
            textTransform: "uppercase", whiteSpace: "nowrap",
          }}>
            Inmuebles · Coto Brus
          </div>

          {/* Logo */}
          <img
            ref={rightRef}
            src="/images/az-logo.png"
            alt="AZ Inmuebles"
            style={{
              opacity: 0,
              transform: "translateY(12px)",
              transition: "opacity 1.4s ease, transform 1.4s cubic-bezier(0.16,1,0.3,1)",
              width: "78%", maxWidth: "340px",
              filter: "brightness(0.9)",
              userSelect: "none", pointerEvents: "none",
              mixBlendMode: "screen",
            }}
          />
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div ref={scrollRef} style={{
        opacity: 0, transform: "translateY(10px)",
        transition: "opacity 0.85s ease, transform 0.85s ease",
        display: "flex", flexDirection: "column",
        alignItems: "center", paddingBottom: "28px", gap: "8px",
      }}>
        <span style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "10px", letterSpacing: "0.2em",
          color: "rgba(240,237,230,0.22)", textTransform: "uppercase",
        }}>
          Explorar
        </span>
        <div style={{
          width: "1px", height: "36px",
          background: "linear-gradient(to bottom, rgba(45,90,64,0.5), transparent)",
        }} />
      </div>

    </section>
  );
}
