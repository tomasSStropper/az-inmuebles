import React, { useState, useEffect } from "react";
import { Property } from "@/entities/Property";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, MapPin, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";
import { useTranslation } from "@/i18n/LanguageContext";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("-created_date");
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    propertyType: "",
    condition: "",
    bedrooms: "",
    bathrooms: "",
    parking: "",
    tags: [],
    district: "",
    minLandSize: "",
    maxLandSize: "",
    minConstructionSize: "",
    maxConstructionSize: "",
  });
  const { t } = useTranslation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const district = urlParams.get("district");
    if (search) setSearchQuery(search);
    if (district) setFilters((prev) => ({ ...prev, district }));
    loadProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, searchQuery, filters, sortBy]);

  const loadProperties = async () => {
    const data = await Property.list("-created_date");
    setProperties(data);
  };

  const applyFilters = () => {
    let filtered = [...properties];

    if (searchQuery) {
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.neighborhood?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.property_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.tags || []).some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filters.district) filtered = filtered.filter((p) => p.district === filters.district);
    if (filters.minPrice) filtered = filtered.filter((p) => p.price_dollars >= parseFloat(filters.minPrice));
    if (filters.maxPrice) filtered = filtered.filter((p) => p.price_dollars <= parseFloat(filters.maxPrice));
    if (filters.propertyType) filtered = filtered.filter((p) => p.property_type === filters.propertyType);
    if (filters.condition) filtered = filtered.filter((p) => p.condition === filters.condition);
    if (filters.bedrooms) filtered = filtered.filter((p) => p.bedrooms >= parseInt(filters.bedrooms));
    if (filters.bathrooms) filtered = filtered.filter((p) => p.bathrooms >= parseInt(filters.bathrooms));
    if (filters.parking) filtered = filtered.filter((p) => p.parking >= parseInt(filters.parking));
    if (filters.minLandSize) filtered = filtered.filter((p) => p.land_size >= parseFloat(filters.minLandSize));
    if (filters.maxLandSize) filtered = filtered.filter((p) => p.land_size <= parseFloat(filters.maxLandSize));
    if (filters.minConstructionSize) filtered = filtered.filter((p) => p.construction_size && p.construction_size >= parseFloat(filters.minConstructionSize));
    if (filters.maxConstructionSize) filtered = filtered.filter((p) => p.construction_size && p.construction_size <= parseFloat(filters.maxConstructionSize));
    if (filters.tags && filters.tags.length > 0) filtered = filtered.filter((p) => filters.tags.some((tag) => p.tags?.includes(tag)));

    if (sortBy === "price_asc") filtered.sort((a, b) => a.price_dollars - b.price_dollars);
    else if (sortBy === "price_desc") filtered.sort((a, b) => b.price_dollars - a.price_dollars);
    else if (sortBy === "area_asc") filtered.sort((a, b) => (a.land_size || 0) - (b.land_size || 0));
    else if (sortBy === "area_desc") filtered.sort((a, b) => (b.land_size || 0) - (a.land_size || 0));
    else filtered.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

    setFilteredProperties(filtered);
  };

  const clearFilters = () => {
    setFilters({
      minPrice: "", maxPrice: "", propertyType: "", condition: "",
      bedrooms: "", bathrooms: "", parking: "", tags: [], district: "",
      minLandSize: "", maxLandSize: "", minConstructionSize: "", maxConstructionSize: "",
    });
    setSearchQuery("");
  };

  const districtTitle = filters.district
    ? t("properties.propertiesIn", { district: filters.district })
    : t("properties.allProperties");

  return (
    <div>
      {/* ── Page header ── */}
      <section className="bg-[#F0EDE6] py-14">
        <div className="max-w-7xl mx-auto px-4">
          <span className="inline-block mb-3 px-4 py-1 bg-[#B07D3A] text-white rounded-full text-sm font-semibold font-inter">
            {t("properties.catalogBadge")}
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-2">
            {districtTitle}
          </h1>
          <p className="font-inter text-[#5C5449]">{t("properties.findPerfect")}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Search + sort */}
        <div className="mb-8 flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" />
            <Input
              placeholder={t("properties.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-11 h-11"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-56 h-11 border border-[var(--border-strong)] rounded-xl text-sm text-[var(--text)] bg-white focus:border-[#B07D3A] focus:ring-2 focus:ring-[#B07D3A]/30">
              <SelectValue placeholder={t("properties.sortBy")} />
            </SelectTrigger>
            <SelectContent className="bg-white border border-[var(--border)]">
              <SelectItem value="-created_date">{t("properties.sortRecent")}</SelectItem>
              <SelectItem value="price_asc">{t("properties.sortPriceAsc")}</SelectItem>
              <SelectItem value="price_desc">{t("properties.sortPriceDesc")}</SelectItem>
              <SelectItem value="area_asc">{t("properties.sortAreaAsc")}</SelectItem>
              <SelectItem value="area_desc">{t("properties.sortAreaDesc")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters sidebar */}
          <div className="lg:col-span-1">
            <PropertyFilters filters={filters} setFilters={setFilters} onClearFilters={clearFilters} />
          </div>

          {/* Grid */}
          <div className="lg:col-span-3">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="font-playfair text-xl font-semibold text-[#1A1A1A]">
                {filteredProperties.length}{" "}
                {filteredProperties.length === 1
                  ? t("properties.propertySingular")
                  : t("properties.propertyPlural")}
              </h2>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-2xl border border-[var(--border)]">
                <div className="w-14 h-14 bg-[rgba(176,125,58,0.1)] rounded-full flex items-center justify-center mx-auto mb-5">
                  <MapPin className="w-7 h-7 text-[#B07D3A]" />
                </div>
                <h3 className="font-playfair text-2xl font-semibold text-[#1A1A1A] mb-2">
                  Propiedades disponibles próximamente
                </h3>
                <p className="font-inter text-[#5C5449] text-sm mb-7 max-w-sm mx-auto">
                  Estamos preparando el catálogo. Contáctenos para consultas sobre propiedades en Coto Brus.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Button onClick={clearFilters} variant="outline">
                    {t("properties.clearFilters")}
                  </Button>
                  <Link to={createPageUrl("Contact")}>
                    <Button className="gap-2">
                      Contactar ahora
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
