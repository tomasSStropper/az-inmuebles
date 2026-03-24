import React, { useState, useEffect } from "react";
import { Property } from "@/entities/Property";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
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
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import PropertyCard from "../components/PropertyCard";
import { CONTACT, PHONE_URL, EMAIL_URL, whatsappUrl } from "@/config/contact";
import { useTranslation } from "@/i18n/LanguageContext";

export default function PropertyDetail() {
  const [property, setProperty] = useState(null);
  const [relatedProperties, setRelatedProperties] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => { loadProperty(); }, []);

  const loadProperty = async () => {
    const id = new URLSearchParams(window.location.search).get("id");
    if (!id) return;
    const data = await Property.list();
    const found = data.find((p) => p.id === id);
    if (found) {
      setProperty(found);
      const related = data
        .filter((p) => p.id !== id && (p.district === found.district || p.property_type === found.property_type))
        .slice(0, 3);
      setRelatedProperties(related);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("es-CR", { style: "currency", currency: "USD", minimumFractionDigits: 0 }).format(price);

  const formatArea = (size, unit) =>
    size ? `${size.toLocaleString("es-CR")} ${unit || "m²"}` : "N/A";

  if (!property) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <p className="text-[#888073]">{t("propertyDetail.loading")}</p>
      </div>
    );
  }

  const images =
    property.images?.length > 0
      ? property.images
      : ["https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=1200&h=800&fit=crop"];

  const whatsapp = whatsappUrl(
    t("whatsapp.propertyDetailMessage", { title: property.title, district: property.district })
  );

  const nextImage = () =>
    setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1));
  const prevImage = () =>
    setCurrentImageIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  return (
    <div className="bg-[#0D0D0D]">
      {/* Breadcrumb */}
      <div className="border-b border-[rgba(255,255,255,0.07)] py-3">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-2 text-xs text-[#888073]">
          <Link to={createPageUrl("Home")} className="hover:text-[#C8A96E] transition-colors">
            {t("propertyDetail.breadcrumbHome")}
          </Link>
          <span>/</span>
          <Link to={createPageUrl("Properties")} className="hover:text-[#C8A96E] transition-colors">
            {t("propertyDetail.breadcrumbProperties")}
          </Link>
          <span>/</span>
          <span className="text-[#F0EDE6] truncate max-w-[200px]">{property.title}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">

          {/* Main */}
          <div className="lg:col-span-2 space-y-8">
            {/* Gallery */}
            <div className="space-y-3">
              <div className="relative h-[460px] rounded overflow-hidden bg-[#161616]">
                <img
                  src={images[currentImageIndex]}
                  alt={t("propertyDetail.imageAlt", { title: property.title, index: currentImageIndex + 1 })}
                  className="w-full h-full object-cover cursor-pointer"
                  loading="lazy"
                  decoding="async"
                />
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 rounded flex items-center justify-center transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-[#F0EDE6]" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-black/60 hover:bg-black/80 rounded flex items-center justify-center transition-colors"
                    >
                      <ChevronRight className="w-5 h-5 text-[#F0EDE6]" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-3 right-3 bg-black/60 text-[#F0EDE6] text-xs px-2.5 py-1 rounded">
                  {currentImageIndex + 1} / {images.length}
                </div>
              </div>

              {images.length > 1 && (
                <div className="grid grid-cols-6 gap-2">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setCurrentImageIndex(i)}
                      className={`relative h-16 rounded overflow-hidden cursor-pointer transition-opacity ${
                        i === currentImageIndex
                          ? "ring-1 ring-[#C8A96E]"
                          : "opacity-50 hover:opacity-75"
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Title & price */}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <h1
                  className="text-[28px] md:text-[36px] font-light text-[#F0EDE6] leading-snug"
                  style={{ letterSpacing: "-0.02em" }}
                >
                  {property.title}
                </h1>
                {property.property_type && (
                  <Badge className="flex-shrink-0 mt-1">{property.property_type}</Badge>
                )}
              </div>
              <p className="text-sm text-[#888073]">
                {property.neighborhood ? `${property.neighborhood}, ` : ""}
                {property.district}
              </p>
              <p className="text-2xl font-semibold text-[#C8A96E]">
                {formatPrice(property.price_dollars)}
              </p>
              {property.price_colones && (
                <p className="text-sm text-[#888073]">
                  ₡{property.price_colones.toLocaleString("es-CR")}
                </p>
              )}
            </div>

            {/* Technical details */}
            <Card>
              <CardHeader>
                <CardTitle>{t("propertyDetail.technicalData")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 gap-5">
                  {property.land_size && (
                    <div>
                      <p className="text-xs text-[#888073] uppercase tracking-wider mb-1">{t("propertyDetail.land")}</p>
                      <p className="text-sm text-[#F0EDE6] font-medium">{formatArea(property.land_size, property.land_unit)}</p>
                    </div>
                  )}
                  {property.construction_size && (
                    <div>
                      <p className="text-xs text-[#888073] uppercase tracking-wider mb-1">{t("propertyDetail.construction")}</p>
                      <p className="text-sm text-[#F0EDE6] font-medium">{formatArea(property.construction_size, "m²")}</p>
                    </div>
                  )}
                  {property.bedrooms && (
                    <div>
                      <p className="text-xs text-[#888073] uppercase tracking-wider mb-1">{t("propertyDetail.bedrooms")}</p>
                      <p className="text-sm text-[#F0EDE6] font-medium">{property.bedrooms}</p>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div>
                      <p className="text-xs text-[#888073] uppercase tracking-wider mb-1">{t("propertyDetail.bathrooms")}</p>
                      <p className="text-sm text-[#F0EDE6] font-medium">{property.bathrooms}</p>
                    </div>
                  )}
                  {property.parking && (
                    <div>
                      <p className="text-xs text-[#888073] uppercase tracking-wider mb-1">{t("propertyDetail.parking")}</p>
                      <p className="text-sm text-[#F0EDE6] font-medium">{property.parking}</p>
                    </div>
                  )}
                  {property.year_built && (
                    <div>
                      <p className="text-xs text-[#888073] uppercase tracking-wider mb-1">{t("propertyDetail.yearBuilt")}</p>
                      <p className="text-sm text-[#F0EDE6] font-medium">{property.year_built}</p>
                    </div>
                  )}
                  {property.condition && (
                    <div>
                      <p className="text-xs text-[#888073] uppercase tracking-wider mb-1">{t("propertyDetail.condition")}</p>
                      <p className="text-sm text-[#F0EDE6] font-medium">{property.condition}</p>
                    </div>
                  )}
                </div>

                {property.services?.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.07)]">
                    <p className="text-xs text-[#888073] uppercase tracking-wider mb-3">
                      {t("propertyDetail.availableServices")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {property.services.map((s, i) => (
                        <Badge key={i} variant="secondary">{s}</Badge>
                      ))}
                    </div>
                  </div>
                )}

                {property.tags?.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.07)]">
                    <p className="text-xs text-[#888073] uppercase tracking-wider mb-3">
                      {t("propertyDetail.characteristics")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {property.tags.map((tag, i) => (
                        <Badge key={i} variant="outline">{tag}</Badge>
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
                  <CardTitle>{t("propertyDetail.description")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-[15px] text-[#888073] leading-[1.7] whitespace-pre-line">
                    {property.description}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Documents */}
            {property.documents?.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>{t("propertyDetail.documents")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {property.documents.map((doc, i) => (
                      <a
                        key={i}
                        href={doc.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded border border-[rgba(255,255,255,0.07)] hover:border-[rgba(200,169,110,0.3)] transition-colors"
                      >
                        <span className="text-sm text-[#F0EDE6]">{doc.name}</span>
                        <Download className="w-4 h-4 text-[#888073]" />
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
                  <CardTitle>{t("propertyDetail.approximateLocation")}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80 rounded overflow-hidden">
                    <iframe
                      src={`https://www.google.com/maps?q=${property.map_coordinates.lat},${property.map_coordinates.lng}&output=embed`}
                      width="100%"
                      height="100%"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-xs text-[#888073] mt-3">{t("propertyDetail.locationNotice")}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-5">
              <Card>
                <CardHeader>
                  <CardTitle>{t("propertyDetail.interested")}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                    <Button className="w-full gap-2">
                      <MessageCircle className="w-4 h-4" />
                      {t("propertyDetail.askWhatsApp")}
                    </Button>
                  </a>
                  <a href={PHONE_URL}>
                    <Button variant="outline" className="w-full gap-2">
                      <Phone className="w-4 h-4" />
                      {t("propertyDetail.call", { phone: CONTACT.phoneDisplay })}
                    </Button>
                  </a>
                  <a href={EMAIL_URL}>
                    <Button variant="outline" className="w-full gap-2">
                      <Mail className="w-4 h-4" />
                      {t("propertyDetail.sendEmail")}
                    </Button>
                  </a>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-5">
                  <div className="text-center">
                    <div className="w-14 h-14 bg-[#C8A96E] rounded flex items-center justify-center mx-auto mb-3">
                      <span className="text-[#0D0D0D] font-semibold text-sm tracking-tight">AZ</span>
                    </div>
                    <p className="text-sm font-medium text-[#F0EDE6] mb-1">AZ Inmuebles</p>
                    <p className="text-xs text-[#888073] mb-4">{t("propertyDetail.agentSubtitle")}</p>
                    <div className="text-xs text-[#888073] space-y-1">
                      <p>{CONTACT.phoneDisplay}</p>
                      <p>{CONTACT.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <p className="text-xs text-[#888073] leading-relaxed">
                    <strong className="text-[#F0EDE6]">{t("propertyDetail.legalNoticeLabel")}</strong>{" "}
                    {t("propertyDetail.legalNotice")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Related */}
        {relatedProperties.length > 0 && (
          <div className="mt-20 pt-10 border-t border-[rgba(255,255,255,0.07)]">
            <p className="text-xs font-medium tracking-[0.12em] text-[#888073] uppercase mb-8">
              {t("propertyDetail.relatedProperties")}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {relatedProperties.map((p) => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
