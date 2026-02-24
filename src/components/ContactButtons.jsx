import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import { CONTACT, PHONE_URL, DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "@/config/contact";

export default function ContactButtons({ propertyTitle = null }) {
  const baseMessage = propertyTitle 
    ? `Hola, estoy interesado en la propiedad: ${propertyTitle}. Me gustaría obtener más información.`
    : DEFAULT_WHATSAPP_MESSAGE;

  const whatsapp = whatsappUrl(baseMessage);

  return (
    <div className="flex flex-wrap gap-3">
      <a href={whatsapp} target="_blank" rel="noopener noreferrer">
        <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all">
          <MessageCircle className="w-5 h-5" />
          Escribir por WhatsApp
        </Button>
      </a>
      <a href={PHONE_URL}>
        <Button size="lg" variant="outline" className="gap-2 bg-white shadow-lg hover:shadow-xl transition-all border-2 border-[#C46542] text-gray-900 hover:bg-[#FDF5F0] hover:text-gray-900">
          <Phone className="w-5 h-5" />
          Llamar Ahora
        </Button>
      </a>
    </div>
  );
}
