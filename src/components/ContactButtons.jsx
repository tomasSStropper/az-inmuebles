import React from "react";
import { Button } from "@/components/ui/button";
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
        <Button size="lg">
          {t("contactButtons.whatsapp")}
        </Button>
      </a>
      <a href={PHONE_URL}>
        <Button size="lg" variant="outline">
          {CONTACT.phoneDisplay}
        </Button>
      </a>
    </div>
  );
}
