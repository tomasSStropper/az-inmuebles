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
import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { whatsappUrl } from "@/config/contact";
import PropertyCard from "../components/PropertyCard";
import PropertyFilters from "../components/PropertyFilters";
import { useTranslation } from "@/i18n/LanguageContext";

const WHATSAPP_MSG =
  "Hola, estoy interesado en conocer más sobre las propiedades disponibles en Coto Brus.";

export default function Properties() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("-created_date");
  const [filters, setFilters] = useState({
    minPrice: "", maxPrice: "", propertyType: "", condition: "",
    bedrooms: "", bathrooms: "", parking: "", tags: [], district: "",
    minLandSize: "", maxLandSize: "", minConstructionSize: "", maxConstructionSize: "",
  });
  const { t } = useTranslation();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const search = params.get("search");
    const district = params.get("district");
    if (search) setSearchQuery(search);
    if (district) setFilters((prev) => ({ ...prev, district }));
    loadProperties();
  }, []);

  useEffect(() => { applyFilters(); }, [properties, searchQuery, filters, sortBy]);

  const loadProperties = async () => {
    const data = await Property.list("-created_date");
    setProperties(data);
  };

  const applyFilters = () => {
    let f = [...properties];
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      f = f.filter((p) =>
        p.title.toLowerCase().includes(q) ||
        p.description?.toLowerCase().includes(q) ||
        p.neighborhood?.toLowerCase().includes(q) ||
        p.district.toLowerCase().includes(q) ||
        p.property_type?.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q))
      );
    }
    if (filters.district) f = f.filter((p) => p.district === filters.district);
    if (filters.minPrice) f = f.filter((p) => p.price_dollars >= parseFloat(filters.minPrice));
    if (filters.maxPrice) f = f.filter((p) => p.price_dollars <= parseFloat(filters.maxPrice));
    if (filters.propertyType) f = f.filter((p) => p.property_type === filters.propertyType);
    if (filters.condition) f = f.filter((p) => p.condition === filters.condition);
    if (filters.bedrooms) f = f.filter((p) => p.bedrooms >= parseInt(filters.bedrooms));
    if (filters.bathrooms) f = f.filter((p) => p.bathrooms >= parseInt(filters.bathrooms));
    if (filters.parking) f = f.filter((p) => p.parking >= parseInt(filters.parking));
    if (filters.minLandSize) f = f.filter((p) => p.land_size >= parseFloat(filters.minLandSize));
    if (filters.maxLandSize) f = f.filter((p) => p.land_size <= parseFloat(filters.maxLandSize));
    if (filters.minConstructionSize) f = f.filter((p) => p.construction_size && p.construction_size >= parseFloat(filters.minConstructionSize));
    if (filters.maxConstructionSize) f = f.filter((p) => p.construction_size && p.construction_size <= parseFloat(filters.maxConstructionSize));
    if (filters.tags?.length > 0) f = f.filter((p) => filters.tags.some((tag) => p.tags?.includes(tag)));

    if (sortBy === "price_asc") f.sort((a, b) => a.price_dollars - b.price_dollars);
    else if (sortBy === "price_desc") f.sort((a, b) => b.price_dollars - a.price_dollars);
    else if (sortBy === "area_asc") f.sort((a, b) => (a.land_size || 0) - (b.land_size || 0));
    else if (sortBy === "area_desc") f.sort((a, b) => (b.land_size || 0) - (a.land_size || 0));
    else f.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));

    setFilteredProperties(f);
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
    <div className="bg-[#0D0D0D]">
      {/* Page header */}
      <section className="border-b border-[rgba(255,255,255,0.07)] py-[80px]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-medium tracking-[0.12em] text-[#888073] uppercase mb-4">
            {t("properties.catalogBadge")}
          </p>
          <h1
            className="text-[40px] md:text-[56px] font-light text-[#F0EDE6] leading-tight"
            style={{ letterSpacing: "-0.025em" }}
          >
            {districtTitle}
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Search + sort */}
        <div className="flex flex-col md:flex-row gap-3 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#888073]" />
            <Input
              placeholder={t("properties.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-48 h-10 rounded border border-[rgba(255,255,255,0.12)] bg-[#161616] text-[#F0EDE6] text-sm px-3">
              <SelectValue placeholder={t("properties.sortBy")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="-created_date">{t("properties.sortRecent")}</SelectItem>
              <SelectItem value="price_asc">{t("properties.sortPriceAsc")}</SelectItem>
              <SelectItem value="price_desc">{t("properties.sortPriceDesc")}</SelectItem>
              <SelectItem value="area_asc">{t("properties.sortAreaAsc")}</SelectItem>
              <SelectItem value="area_desc">{t("properties.sortAreaDesc")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <PropertyFilters
              filters={filters}
              setFilters={setFilters}
              onClearFilters={clearFilters}
            />
          </div>

          <div className="lg:col-span-3">
            <p className="text-xs text-[#888073] mb-6">
              {filteredProperties.length}{" "}
              {filteredProperties.length === 1
                ? t("properties.propertySingular")
                : t("properties.propertyPlural")}
            </p>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="py-20 border-t border-[rgba(255,255,255,0.07)]">
                <p className="text-[15px] text-[#F0EDE6] mb-3">
                  Propiedades disponibles próximamente
                </p>
                <a
                  href={whatsappUrl(WHATSAPP_MSG)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-[#C8A96E] hover:text-[#A88848] transition-colors"
                >
                  Escribinos al 8381-9331
                </a>
                {properties.length > 0 && (
                  <div className="mt-8">
                    <Button variant="outline" size="sm" onClick={clearFilters}>
                      {t("properties.clearFilters")}
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
