const MOCK = [
  {
    id: "p1",
    title: "Casa con vista en San Vito",
    district: "San Vito",
    neighborhood: "Centro",
    price_dollars: 125000,
    price_colones: 65000000,
    property_type: "Casa",
    land_size: 420,
    land_unit: "m²",
    construction_size: 180,
    bedrooms: 3,
    bathrooms: 2,
    parking: 2,
    year_built: 2016,
    condition: "Usada",
    tags: ["centro", "vista", "servicios públicos"],
    services: ["Agua", "Luz", "Internet"],
    featured: true,
    description:
      "Propiedad en excelente ubicación con acceso asfaltado, cerca de comercios y servicios. Ideal para familia o inversión.",
    images: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=1200&h=800&fit=crop",
      "https://images.unsplash.com/photo-1572120360610-d971b9b6398a?w=1200&h=800&fit=crop"
    ],
    documents: [
      { name: "Plano Catastro (Ejemplo)", url: "https://example.com/doc.pdf" }
    ],
    map_coordinates: { lat: 8.8209, lng: -82.9712 },
    created_date: "2026-01-20T10:00:00.000Z"
  },
  {
    id: "p2",
    title: "Lote amplio en Agua Buena",
    district: "Agua Buena",
    neighborhood: "Montaña",
    price_dollars: 45000,
    price_colones: 23000000,
    property_type: "Lote",
    land_size: 1500,
    land_unit: "m²",
    tags: ["montaña", "vista"],
    featured: false,
    images: [
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200&h=800&fit=crop"
    ],
    description:
      "Lote con excelente topografía y vista, ideal para construir. Zona tranquila y con entorno natural.",
    created_date: "2026-01-10T10:00:00.000Z"
  },
  {
    id: "p3",
    title: "Finca productiva en Pittier",
    district: "Pittier",
    neighborhood: "Cultivos",
    price_dollars: 210000,
    price_colones: 110000000,
    property_type: "Finca",
    land_size: 2.5,
    land_unit: "hectáreas",
    tags: ["cafetal", "río"],
    featured: true,
    images: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop"
    ],
    description:
      "Finca con potencial agrícola, acceso y disponibilidad de servicios. Excelente oportunidad para proyecto productivo.",
    created_date: "2026-01-05T10:00:00.000Z"
  },
  {
    id: "p4",
    title: "Casa familiar en Sabalito",
    district: "Sabalito",
    neighborhood: "Residencial",
    price_dollars: 98000,
    price_colones: 51000000,
    property_type: "Casa",
    land_size: 380,
    land_unit: "m²",
    construction_size: 140,
    bedrooms: 3,
    bathrooms: 2,
    parking: 1,
    condition: "Usada",
    tags: ["centro", "acceso asfaltado"],
    images: [
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=1200&h=800&fit=crop"
    ],
    description:
      "Casa cómoda, buena distribución y ubicación práctica. Cercana a servicios y con acceso sencillo.",
    created_date: "2025-12-28T10:00:00.000Z"
  },
  {
    id: "p5",
    title: "Apartamento (Ejemplo) en San Vito",
    district: "San Vito",
    neighborhood: "Zona urbana",
    price_dollars: 76000,
    price_colones: 39500000,
    property_type: "Apartamento",
    bedrooms: 2,
    bathrooms: 1,
    condition: "Usada",
    tags: ["centro", "servicios públicos"],
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&h=800&fit=crop"
    ],
    description:
      "Apartamento práctico, ideal para inversión o vivienda. Ubicación funcional y fácil acceso.",
    created_date: "2025-12-20T10:00:00.000Z"
  },
  {
    id: "p6",
    title: "Lote con acceso asfaltado en Gutiérrez Braun",
    district: "Gutiérrez Braun",
    neighborhood: "Ruta principal",
    price_dollars: 52000,
    price_colones: 27000000,
    property_type: "Lote",
    land_size: 980,
    land_unit: "m²",
    tags: ["acceso asfaltado", "servicios públicos"],
    images: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&h=800&fit=crop"
    ],
    description:
      "Lote con frente a calle principal, ideal para vivienda o local comercial. Acceso asfaltado y servicios cercanos.",
    created_date: "2025-12-12T10:00:00.000Z"
  }
];

export const Property = {
  async list(order = "-created_date", limit = null) {
    let data = [...MOCK];

    if (order === "-created_date") {
      data.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    } else if (order === "created_date") {
      data.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
    }

    if (typeof limit === "number") {
      data = data.slice(0, limit);
    }

    await new Promise((r) => setTimeout(r, 180));
    return data;
  }
};
