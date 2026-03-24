import React from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";
import { CONTACT, PHONE_URL, whatsappUrl } from "@/config/contact";
import { useTranslation } from "@/i18n/LanguageContext";

export default function ContactButtons({ propertyTitle = null }) {
  const { t } = useTranslation();

  const baseMessage = propertyTitle
    ? t("whatsapp.propertyMessage", { title: propertyTitle })
    : t("whatsapp.defaultMessage");

  const whatsapp = whatsappUrl(baseMessage);

  return (
    <div className="flex flex-wrap gap-3">
      <a href={whatsapp} target="_blank" rel="noopener noreferrer">
        <Button size="lg" className="gap-2 bg-[#B07D3A] hover:bg-[#8F6530] text-white shadow-md hover:shadow-lg">
          <MessageCircle className="w-5 h-5" />
          {t("contactButtons.whatsapp")}
        </Button>
      </a>
      <a href={PHONE_URL}>
        <Button size="lg" variant="outline" className="gap-2 border-2 border-[#B07D3A] text-[#B07D3A] hover:bg-[rgba(176,125,58,0.07)] shadow-sm hover:shadow-md">
          <Phone className="w-5 h-5" />
          {CONTACT.phoneDisplay}
        </Button>
      </a>
    </div>
  );
}
