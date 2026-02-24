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
        <Button size="lg" className="gap-2 bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-xl transition-all">
          <MessageCircle className="w-5 h-5" />
          {t("contactButtons.whatsapp")}
        </Button>
      </a>
      <a href={PHONE_URL}>
        <Button size="lg" variant="outline" className="gap-2 bg-[var(--bg-elev)] shadow-lg hover:shadow-xl transition-all border-2 border-[#C46542] text-[var(--text)] hover:bg-[var(--primary-50)] hover:text-[var(--text)]">
          <Phone className="w-5 h-5" />
          {t("contactButtons.callNow")}
        </Button>
      </a>
    </div>
  );
}
