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
    maxConstructionSize: ""
  });
  const { t } = useTranslation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const search = urlParams.get("search");
    const district = urlParams.get("district");

    if (search) setSearchQuery(search);
    if (district) setFilters(prev => ({ ...prev, district }));

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
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.neighborhood?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.property_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (p.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filters.district) {
      filtered = filtered.filter(p => p.district === filters.district);
    }
    if (filters.minPrice) {
      filtered = filtered.filter(p => p.price_dollars >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(p => p.price_dollars <= parseFloat(filters.maxPrice));
    }
    if (filters.propertyType) {
      filtered = filtered.filter(p => p.property_type === filters.propertyType);
    }
    if (filters.condition) {
      filtered = filtered.filter(p => p.condition === filters.condition);
    }
    if (filters.bedrooms) {
      filtered = filtered.filter(p => p.bedrooms >= parseInt(filters.bedrooms));
    }
    if (filters.bathrooms) {
      filtered = filtered.filter(p => p.bathrooms >= parseInt(filters.bathrooms));
    }
    if (filters.parking) {
      filtered = filtered.filter(p => p.parking >= parseInt(filters.parking));
    }
    if (filters.minLandSize) {
      filtered = filtered.filter(p => p.land_size >= parseFloat(filters.minLandSize));
    }
    if (filters.maxLandSize) {
      filtered = filtered.filter(p => p.land_size <= parseFloat(filters.maxLandSize));
    }
    if (filters.minConstructionSize) {
      filtered = filtered.filter(p => p.construction_size && p.construction_size >= parseFloat(filters.minConstructionSize));
    }
    if (filters.maxConstructionSize) {
      filtered = filtered.filter(p => p.construction_size && p.construction_size <= parseFloat(filters.maxConstructionSize));
    }
    if (filters.tags && filters.tags.length > 0) {
      filtered = filtered.filter(p =>
        filters.tags.some(tag => p.tags?.includes(tag))
      );
    }

    if (sortBy === "price_asc") {
      filtered.sort((a, b) => a.price_dollars - b.price_dollars);
    } else if (sortBy === "price_desc") {
      filtered.sort((a, b) => b.price_dollars - a.price_dollars);
    } else if (sortBy === "area_asc") {
      filtered.sort((a, b) => (a.land_size || 0) - (b.land_size || 0));
    } else if (sortBy === "area_desc") {
      filtered.sort((a, b) => (b.land_size || 0) - (a.land_size || 0));
    } else {
      filtered.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
    }

    setFilteredProperties(filtered);
  };

  const clearFilters = () => {
    setFilters({
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
      maxConstructionSize: ""
    });
    setSearchQuery("");
  };

  const districtTitle = filters.district
    ? t("properties.propertiesIn", { district: filters.district })
    : t("properties.allProperties");

  return (
    <div>
      {/* Hero */}
      <section className="relative h-96 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1560185127-6ed189bf02f4?w=1920&h=600&fit=crop"
          alt={t("nav.properties")}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#C46542]/90 via-[#C46542]/80 to-[#A35436]/70" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white w-full">
            <div className="inline-block mb-4 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
              {t("properties.catalogBadge")}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{districtTitle}</h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-2xl">
              {t("properties.findPerfect")}
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[var(--bg)] to-transparent" />
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search and Sort */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[var(--muted)]" />
            <Input
              placeholder={t("properties.searchPlaceholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg border-2 focus:border-[#C46542]"
            />
          </div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-64 h-12 border-2 focus:border-[#C46542]">
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
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <PropertyFilters
              filters={filters}
              setFilters={setFilters}
              onClearFilters={clearFilters}
            />
          </div>

          {/* Properties Grid */}
          <div className="lg:col-span-3">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)]">
                {filteredProperties.length} {filteredProperties.length === 1 ? t("properties.propertySingular") : t("properties.propertyPlural")}
              </h2>
              {filteredProperties.length > 0 && (
                <div className="hidden md:block text-sm text-[var(--muted)]">
                  {t("properties.showingResults")}
                </div>
              )}
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-[var(--primary-50)] rounded-2xl">
                <div className="w-20 h-20 bg-[rgba(196,101,66,0.25)] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-[#C46542]" />
                </div>
                <h3 className="text-2xl font-bold text-[var(--text)] mb-3">
                  {t("properties.noResults")}
                </h3>
                <p className="text-[var(--muted)] mb-6 max-w-md mx-auto">
                  {t("properties.noResultsHint")}
                </p>
                <Button onClick={clearFilters} variant="outline" size="lg" className="border-[#C46542] text-[#C46542] hover:bg-[var(--primary-50)]">
                  {t("properties.clearFilters")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
