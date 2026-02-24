import React, { useState, useEffect } from "react";
import { Property } from "@/entities/Property";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Bed,
  Bath,
  Ruler,
  Car,
  Calendar,
  FileText,
  MessageCircle,
  Mail,
  Phone,
  ChevronLeft,
  ChevronRight,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import PropertyCard from "../components/PropertyCard";
import { CONTACT, PHONE_URL, EMAIL_URL, whatsappUrl } from "@/config/contact";

export default function PropertyDetail() {
  const [property, setProperty] = useState(null);
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);

  useEffect(() => {
    loadProperty();
  }, []);

  const loadProperty = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");

    if (id) {
      const data = await Property.list();
      const foundProperty = data.find(p => p.id === id);

      if (foundProperty) {
        setProperty(foundProperty);
        loadRelatedProperties(foundProperty);
      }
    }
  };

  const loadRelatedProperties = async (currentProperty) => {
    const allProperties = await Property.list();
    const related = allProperties
      .filter(p => 
        p.id !== currentProperty.id && 
        (p.district === currentProperty.district || p.property_type === currentProperty.property_type)
      )
      .slice(0, 3);
    setRelatedProperties(related);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatArea = (size, unit) => {
    if (!size) return "N/A";
    return `${size.toLocaleString("es-CR")} ${unit || "m²"}`;
  };

  const nextImage = () => {
    if (property.images) {
      setCurrentImageIndex((prev) => 
        prev === property.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (property.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? property.images.length - 1 : prev - 1
      );
    }
  };

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center">
          <p className="text-[var(--muted)]">Cargando propiedad...</p>
        </div>
      </div>
    );
  }

  const images = property.images && property.images.length > 0 
    ? property.images 
    : ["https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop"];

  const whatsapp = whatsappUrl(
    `Hola, estoy interesado en la propiedad: ${property.title} en ${property.district}. ¿Podrían brindarme más información sobre precio, disponibilidad y opciones de visita? Gracias.`
  );

  return (
    <div>
      {/* Breadcrumb */}
      <div className="bg-[var(--bg-elev)] py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Link to={createPageUrl("Home")} className="hover:text-emerald-600">
              Inicio
            </Link>
            <span>/</span>
            <Link to={createPageUrl("Properties")} className="hover:text-emerald-600">
              Propiedades
            </Link>
            <span>/</span>
            <span className="text-[var(--text)]">{property.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative h-[500px] rounded-2xl overflow-hidden bg-[var(--bg-elev)]">
                <img
                  src={images[currentImageIndex]}
                  alt={`${property.title} - Imagen ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover cursor-pointer"
                  loading="lazy"
                  decoding="async"
                  onClick={() => setIsImageModalOpen(true)}
                />

                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[rgba(42,42,42,0.9)] hover:bg-[var(--bg-elev)] rounded-full flex items-center justify-center transition-all shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6 text-[var(--text)]" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-[rgba(42,42,42,0.9)] hover:bg-[var(--bg-elev)] rounded-full flex items-center justify-center transition-all shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6 text-[var(--text)]" />
                    </button>
                  </>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {images.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative h-20 rounded-lg overflow-hidden cursor-pointer transition-all ${
                        index === currentImageIndex
                          ? "ring-2 ring-emerald-600"
                          : "hover:opacity-75"
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Miniatura ${index + 1}`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title and Price */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-[var(--text)] mb-2">
                    {property.title}
                  </h1>
                  <div className="flex items-center gap-2 text-[var(--muted)]">
                    <MapPin className="w-5 h-5" />
                    <span className="text-lg">
                      {property.neighborhood ? `${property.neighborhood}, ` : ""}{property.district}
                    </span>
                  </div>
                </div>
                <Badge className="text-lg px-4 py-2 bg-emerald-600">
                  {property.property_type}
                </Badge>
              </div>

              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-emerald-600">
                  {formatPrice(property.price_dollars)}
                </span>
                {property.price_colones && (
                  <span className="text-xl text-[var(--muted)]">
                    ₡{property.price_colones.toLocaleString("es-CR")}
                  </span>
                )}
              </div>
            </div>

            {/* Technical Details */}
            <Card>
              <CardHeader>
                <CardTitle>Datos Técnicos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  {property.land_size && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-900/30 rounded-xl flex items-center justify-center">
                        <Ruler className="w-6 h-6 text-emerald-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--muted)]">Terreno</p>
                        <p className="font-semibold text-[var(--text)]">
                          {formatArea(property.land_size, property.land_unit)}
                        </p>
                      </div>
                    </div>
                  )}

                  {property.construction_size && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center">
                        <Ruler className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--muted)]">Construcción</p>
                        <p className="font-semibold text-[var(--text)]">
                          {formatArea(property.construction_size, "m²")}
                        </p>
                      </div>
                    </div>
                  )}

                  {property.bedrooms && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-purple-900/30 rounded-xl flex items-center justify-center">
                        <Bed className="w-6 h-6 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--muted)]">Dormitorios</p>
                        <p className="font-semibold text-[var(--text)]">{property.bedrooms}</p>
                      </div>
                    </div>
                  )}

                  {property.bathrooms && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-cyan-900/30 rounded-xl flex items-center justify-center">
                        <Bath className="w-6 h-6 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--muted)]">Baños</p>
                        <p className="font-semibold text-[var(--text)]">{property.bathrooms}</p>
                      </div>
                    </div>
                  )}

                  {property.parking && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-amber-900/30 rounded-xl flex items-center justify-center">
                        <Car className="w-6 h-6 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--muted)]">Parqueos</p>
                        <p className="font-semibold text-[var(--text)]">{property.parking}</p>
                      </div>
                    </div>
                  )}

                  {property.year_built && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-green-900/30 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--muted)]">Año de Construcción</p>
                        <p className="font-semibold text-[var(--text)]">{property.year_built}</p>
                      </div>
                    </div>
                  )}

                  {property.condition && (
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-pink-900/30 rounded-xl flex items-center justify-center">
                        <FileText className="w-6 h-6 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-sm text-[var(--muted)]">Estado</p>
                        <p className="font-semibold text-[var(--text)]">{property.condition}</p>
                      </div>
                    </div>
                  )}
                </div>

                {property.services && property.services.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-[var(--border)]">
                    <h4 className="font-semibold text-[var(--text)] mb-3">Servicios Disponibles</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.services.map((service, index) => (
                        <Badge key={index} variant="secondary">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {property.tags && property.tags.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-[var(--border)]">
                    <h4 className="font-semibold text-[var(--text)] mb-3">Características</h4>
                    <div className="flex flex-wrap gap-2">
                      {property.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="bg-emerald-900/20 text-emerald-400 border-emerald-800/40">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Description */}
            {property.description && (
              <Card>
                <CardHeader>
                  <CardTitle>Descripción</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[var(--text)] leading-relaxed whitespace-pre-line">
                    {property.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Documents */}
            {property.documents && property.documents.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Documentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {property.documents.map((doc, index) => (
                      <a
                        key={index}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-[var(--bg-elev2)] rounded-lg hover:bg-[var(--bg)] transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-emerald-600" />
                          <span className="font-medium text-[var(--text)]">{doc.name}</span>
                        </div>
                        <Download className="w-5 h-5 text-[var(--muted)]" />
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Map */}
            {property.map_coordinates && (
              <Card>
                <CardHeader>
                  <CardTitle>Ubicación Aproximada</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-[var(--bg-elev2)] rounded-lg flex items-center justify-center">
                    <iframe
                      src={`https://www.google.com/maps?q=${property.map_coordinates.lat},${property.map_coordinates.lng}&output=embed`}
                      width="100%"
                      height="100%"
                      className="rounded-lg"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-sm text-[var(--muted)] mt-3">
                    La ubicación mostrada es aproximada. Se proporcionará la ubicación exacta al contactarnos.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Contact Card */}
              <Card className="bg-emerald-900/20 border-emerald-800/30">
                <CardHeader>
                  <CardTitle className="text-center">¿Interesado en esta propiedad?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full gap-2 bg-green-600 hover:bg-green-700">
                      <MessageCircle className="w-5 h-5" />
                      Consultar por WhatsApp
                    </Button>
                  </a>
                  <a href={PHONE_URL}>
                    <Button variant="outline" className="w-full gap-2">
                      <Phone className="w-5 h-5" />
                      Llamar: {CONTACT.phoneDisplay}
                    </Button>
                  </a>
                  <a href={EMAIL_URL}>
                    <Button variant="outline" className="w-full gap-2">
                      <Mail className="w-5 h-5" />
                      Enviar Correo
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Agent Info */}
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-2xl">AZ</span>
                    </div>
                    <h3 className="font-bold text-[var(--text)] mb-1">AZ Inmuebles</h3>
                    <p className="text-sm text-[var(--muted)] mb-4">
                      Asesoría profesional en Coto Brus
                    </p>
                    <div className="text-sm text-[var(--muted)]">
                      <p>📞 {CONTACT.phoneDisplay}</p>
                      <p>📧 {CONTACT.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Legal Notice */}
              <Card className="bg-yellow-900/20 border-yellow-800/30">
                <CardContent className="p-4">
                  <p className="text-xs text-[var(--muted)]">
                    <strong>Aviso:</strong> La información de cada propiedad es proporcionada por los propietarios o sus representantes y puede variar; verifíquela antes de cualquier decisión.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        {relatedProperties.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-[var(--text)] mb-8">
              Propiedades Relacionadas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((relProp) => (
                <PropertyCard key={relProp.id} property={relProp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
