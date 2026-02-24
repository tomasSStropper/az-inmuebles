import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Bed, Bath, Ruler, ArrowRight, Sparkles } from "lucide-react";

export default function PropertyCard({ property }) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-CR", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const formatArea = (size, unit) => {
    if (!size) return null;
    return `${size.toLocaleString("es-CR")} ${unit || "m²"}`;
  };

  const mainImage = property.images?.[0] || "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop";

  return (
    <Card className="group overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col border-2 border-[#E8D5C4] hover:border-[#C46542]">
      <div className="relative h-64 overflow-hidden">
        <img
          src={mainImage}
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {property.featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-gradient-to-r from-[#C46542] to-[#A35436] border-0 shadow-lg flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Destacada
            </Badge>
          </div>
        )}
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="bg-white/95 text-gray-900 font-semibold shadow-lg">
            {property.property_type}
          </Badge>
        </div>
      </div>

      <CardContent className="p-6 flex-1 flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <h3 className="font-bold text-xl text-gray-900 line-clamp-2 flex-1 group-hover:text-[#C46542] transition-colors">
            {property.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin className="w-4 h-4 flex-shrink-0 text-[#C46542]" />
          <span className="text-sm font-medium">
            {property.neighborhood ? `${property.neighborhood}, ` : ""}{property.district}
          </span>
        </div>

        <div className="flex flex-wrap gap-4 mb-4 pb-4 border-b border-[#E8D5C4]">
          {property.bedrooms && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-8 h-8 bg-[#FDF5F0] rounded-lg flex items-center justify-center">
                <Bed className="w-4 h-4 text-[#C46542]" />
              </div>
              <span className="font-semibold">{property.bedrooms}</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-8 h-8 bg-[#FDF5F0] rounded-lg flex items-center justify-center">
                <Bath className="w-4 h-4 text-[#C46542]" />
              </div>
              <span className="font-semibold">{property.bathrooms}</span>
            </div>
          )}
          {property.land_size && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <div className="w-8 h-8 bg-[#FDF5F0] rounded-lg flex items-center justify-center">
                <Ruler className="w-4 h-4 text-[#C46542]" />
              </div>
              <span className="font-semibold">{formatArea(property.land_size, property.land_unit)}</span>
            </div>
          )}
        </div>

        {property.tags && property.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {property.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs bg-[#FDF5F0] text-[#C46542] border-[#E8D5C4]">
                {tag}
              </Badge>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-bold bg-gradient-to-r from-[#C46542] to-[#A35436] bg-clip-text text-transparent">
              {formatPrice(property.price_dollars)}
            </span>
          </div>
          {property.price_colones && (
            <span className="text-sm text-gray-500 font-medium">
              ₡{property.price_colones.toLocaleString("es-CR")}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Link to={createPageUrl(`PropertyDetail?id=${property.id}`)} className="w-full">
          <Button className="w-full gap-2 bg-gradient-to-r from-[#C46542] to-[#A35436] hover:from-[#A35436] hover:to-[#8B4530] group-hover:gap-3 transition-all shadow-lg text-white">
            Ver Detalles
            <ArrowRight className="w-4 h-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
