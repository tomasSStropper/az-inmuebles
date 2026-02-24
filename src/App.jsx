import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "./Layout.jsx";

import Home from "./pages/Home.jsx";
import Properties from "./pages/Properties.jsx";
import PropertyDetail from "./pages/PropertyDetail.jsx";
import Contact from "./pages/Contact.jsx";
import TerminosPrivacidad from "./pages/TerminosPrivacidad.jsx";

export default function App() {
  const location = useLocation();

  return (
    <Layout currentPageName={location.pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property" element={<PropertyDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terminos-privacidad" element={<TerminosPrivacidad />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Layout>
  );
}
