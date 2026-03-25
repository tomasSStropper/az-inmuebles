import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { whatsappUrl } from '@/config/contact';

export default function HeroSection() {
  const WHATSAPP_MSG = "Hola, estoy interesado en conocer más sobre las propiedades disponibles en Coto Brus.";

  return (
    <section className="relative w-full min-h-[calc(100vh-56px)] bg-[#0A0A0A] flex flex-col lg:flex-row overflow-hidden border-b border-[rgba(255,255,255,0.05)]">
      {/* LEFT COLUMN (50%) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:pl-16 xl:pl-24 py-20 lg:py-0 z-10">
        
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.02)] mb-8 w-fit backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-[#4a9e6e] animate-pulse"></span>
          <span className="text-xs font-medium text-[#F0EDE6] tracking-wide uppercase">
            Venta directa · Coto Brus
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-6xl lg:text-[72px] font-light text-[#F0EDE6] leading-[1.05] tracking-tight mb-6"
        >
          Tu próxima propiedad<br className="hidden md:block" /> está en{" "}
          <span className="font-semibold text-[#4a9e6e]">Coto Brus.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-[#F0EDE6] opacity-70 font-light max-w-xl mb-12 leading-relaxed"
        >
          Venta directa con Carlos Azofeifa Arias, fincas, lotes y locales comerciales.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <Link to={createPageUrl("Properties")} className="w-full sm:w-auto">
            <Button 
              className="w-full bg-[#2D5A40] hover:bg-[#4a9e6e] text-white border-0 transition-colors duration-300 h-14 px-8 text-[15px] font-medium rounded-md shadow-[0_0_20px_rgba(45,90,64,0.3)] hover:shadow-[0_0_30px_rgba(74,158,110,0.5)]"
            >
              Ver propiedades
            </Button>
          </Link>
          <a
            href={whatsappUrl(WHATSAPP_MSG)}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto"
          >
            <Button 
              variant="outline" 
              className="w-full border border-[rgba(255,255,255,0.2)] text-[#F0EDE6] hover:bg-[rgba(255,255,255,0.05)] hover:border-[rgba(255,255,255,0.4)] transition-all duration-300 h-14 px-8 text-[15px] font-medium rounded-md bg-transparent"
            >
              WhatsApp
            </Button>
          </a>
        </motion.div>

      </div>

      {/* RIGHT COLUMN (50%) - Logo Showcase */}
      <div className="relative w-full lg:w-1/2 min-h-[50vh] lg:min-h-full flex items-center justify-center overflow-hidden border-t lg:border-t-0 lg:border-l border-[rgba(255,255,255,0.03)] pb-20 lg:pb-0">
        
        {/* Subtle radial green glow behind logo */}
        <div 
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(45,90,64,0.15) 0%, transparent 60%)'
          }}
        />

        {/* High-end decorative grid pattern */}
        <div 
          className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
            backgroundPosition: 'center center'
          }}
        />
        
        {/* Optional abstract luxury geometric lines overlay */}
        <div
          className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-overlay"
          style={{
            background: 'linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.8) 49%, transparent 51%)',
            backgroundSize: '200px 200px'
          }}
        />

        {/* Floating Logo */}
        <motion.div
          animate={{ y: [-15, 15, -15] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 w-[50%] md:w-[55%] flex items-center justify-center drop-shadow-2xl"
        >
          <img 
            src="https://raw.githubusercontent.com/tomasSStropper/az-inmuebles/main/public/images/az-logo.png" 
            alt="AZ Inmuebles Logo Premium Showcase"
            className="w-full h-auto object-contain select-none opacity-90"
            draggable="false"
          />
        </motion.div>
      </div>
    </section>
  );
}
