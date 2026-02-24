import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTranslation } from "@/i18n/LanguageContext";

const propertyTypeKeys = [
  { value: "Casa", key: "typeHouse" },
  { value: "Lote", key: "typeLot" },
  { value: "Finca", key: "typeFarm" },
  { value: "Apartamento", key: "typeApartment" },
  { value: "Comercial", key: "typeCommercial" },
];
const conditionKeys = [
  { value: "Nueva", key: "conditionNew" },
  { value: "Usada", key: "conditionUsed" },
];
const districts = ["San Vito", "Sabalito", "Agua Buena", "Limoncito", "Pittier", "Gutiérrez Braun"];
const allTags = ["montaña", "centro", "vista", "cafetal", "río", "acceso asfaltado", "servicios públicos"];

export default function PropertyFilters({ filters, setFilters, onClearFilters }) {
  const { t } = useTranslation();

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>{t("filters.district")}</Label>
        <Select
          value={filters.district || "all"}
          onValueChange={(value) => setFilters({ ...filters, district: value === "all" ? "" : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("filters.all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.allDistricts")}</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t("filters.propertyType")}</Label>
        <Select
          value={filters.propertyType || "all"}
          onValueChange={(value) => setFilters({ ...filters, propertyType: value === "all" ? "" : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("filters.all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.all")}</SelectItem>
            {propertyTypeKeys.map(({ value, key }) => (
              <SelectItem key={value} value={value}>
                {t(`filters.${key}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        <Label>{t("filters.priceRange")}</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs text-[var(--muted)]">{t("filters.minimum")}</Label>
            <Input
              type="number"
              placeholder="$0"
              value={filters.minPrice || ""}
              onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-[var(--muted)]">{t("filters.maximum")}</Label>
            <Input
              type="number"
              placeholder={t("filters.noLimit")}
              value={filters.maxPrice || ""}
              onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>{t("filters.landSize")}</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs text-[var(--muted)]">{t("filters.minimum")}</Label>
            <Input
              type="number"
              placeholder="0"
              value={filters.minLandSize || ""}
              onChange={(e) => setFilters({ ...filters, minLandSize: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-[var(--muted)]">{t("filters.maximum")}</Label>
            <Input
              type="number"
              placeholder={t("filters.noLimit")}
              value={filters.maxLandSize || ""}
              onChange={(e) => setFilters({ ...filters, maxLandSize: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <Label>{t("filters.constructionSize")}</Label>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label className="text-xs text-[var(--muted)]">{t("filters.minimum")}</Label>
            <Input
              type="number"
              placeholder="0"
              value={filters.minConstructionSize || ""}
              onChange={(e) => setFilters({ ...filters, minConstructionSize: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label className="text-xs text-[var(--muted)]">{t("filters.maximum")}</Label>
            <Input
              type="number"
              placeholder={t("filters.noLimit")}
              value={filters.maxConstructionSize || ""}
              onChange={(e) => setFilters({ ...filters, maxConstructionSize: e.target.value })}
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t("filters.condition")}</Label>
        <Select
          value={filters.condition || "all"}
          onValueChange={(value) => setFilters({ ...filters, condition: value === "all" ? "" : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("filters.all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.all")}</SelectItem>
            {conditionKeys.map(({ value, key }) => (
              <SelectItem key={value} value={value}>
                {t(`filters.${key}`)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t("filters.bedrooms")}</Label>
          <Select
            value={filters.bedrooms || "all"}
            onValueChange={(value) => setFilters({ ...filters, bedrooms: value === "all" ? "" : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("filters.all")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filters.all")}</SelectItem>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>{t("filters.bathrooms")}</Label>
          <Select
            value={filters.bathrooms || "all"}
            onValueChange={(value) => setFilters({ ...filters, bathrooms: value === "all" ? "" : value })}
          >
            <SelectTrigger>
              <SelectValue placeholder={t("filters.all")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filters.all")}</SelectItem>
              {[1, 2, 3, 4, 5].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num}+
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t("filters.parking")}</Label>
        <Select
          value={filters.parking || "all"}
          onValueChange={(value) => setFilters({ ...filters, parking: value === "all" ? "" : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("filters.all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.all")}</SelectItem>
            {[1, 2, 3, 4].map((num) => (
              <SelectItem key={num} value={num.toString()}>
                {num}+
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>{t("filters.features")}</Label>
        <div className="flex flex-wrap gap-2">
          {allTags.map((tag) => (
            <Badge
              key={tag}
              variant={filters.tags?.includes(tag) ? "default" : "outline"}
              className={`cursor-pointer transition-colors ${
                filters.tags?.includes(tag)
                  ? "bg-[#C46542] hover:bg-[#A35436] text-white"
                  : "hover:bg-[var(--primary-50)] border-[#C46542] text-[#C46542]"
              }`}
              onClick={() => {
                const currentTags = filters.tags || [];
                const newTags = currentTags.includes(tag)
                  ? currentTags.filter((t) => t !== tag)
                  : [...currentTags, tag];
                setFilters({ ...filters, tags: newTags });
              }}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        className="w-full border-[#C46542] text-[#C46542] hover:bg-[var(--primary-50)]"
        onClick={onClearFilters}
      >
        <X className="w-4 h-4 mr-2" />
        {t("filters.clearFilters")}
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Filters */}
      <Card className="hidden lg:block border-[var(--accent-border)]">
        <CardHeader className="bg-[var(--primary-50)]">
          <CardTitle className="flex items-center gap-2 text-[#C46542]">
            <SlidersHorizontal className="w-5 h-5" />
            {t("filters.title")}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <FilterContent />
        </CardContent>
      </Card>

      {/* Mobile Filters */}
      <Sheet>
        <SheetTrigger asChild className="lg:hidden">
          <Button variant="outline" className="w-full gap-2 border-[#C46542] text-[#C46542]">
            <SlidersHorizontal className="w-4 h-4" />
            {t("filters.title")}
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-80 overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="text-[#C46542]">{t("filters.title")}</SheetTitle>
          </SheetHeader>
          <div className="mt-6">
            <FilterContent />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
