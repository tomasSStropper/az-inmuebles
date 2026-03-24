import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/i18n/LanguageContext";
import { CONTACT } from "@/config/contact";

export default function TerminosPrivacidad() {
  const { t, lang } = useTranslation();
  const dateLocale = lang === "en" ? "en-US" : "es-CR";

  return (
    <div className="bg-[#0D0D0D]">
      <section className="border-b border-[rgba(255,255,255,0.07)] py-[80px]">
        <div className="max-w-4xl mx-auto px-6">
          <h1
            className="text-[40px] font-light text-[#F0EDE6] mb-3"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("terms.pageTitle")}
          </h1>
          <p className="text-[15px] text-[#888073]">{t("terms.pageSubtitle")}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-6 py-12 space-y-6">
        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>{t("terms.privacyTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-[15px] text-[#888073] leading-[1.7]">
            <div>
              <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.dataCollection")}</h3>
              <p>{t("terms.dataCollectionText")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.dataUse")}</h3>
              <p>{t("terms.dataUseIntro")}</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>{t("terms.dataUseItem1")}</li>
                <li>{t("terms.dataUseItem2")}</li>
                <li>{t("terms.dataUseItem3")}</li>
                <li>{t("terms.dataUseItem4")}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.dataProtection")}</h3>
              <p>{t("terms.dataProtectionText")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.dataSharing")}</h3>
              <p>{t("terms.dataSharingText")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.yourRights")}</h3>
              <p>{t("terms.yourRightsIntro")}</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>{t("terms.rightsItem1")}</li>
                <li>{t("terms.rightsItem2")}</li>
                <li>{t("terms.rightsItem3")}</li>
                <li>{t("terms.rightsItem4")}</li>
                <li>{t("terms.rightsItem5")}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.contactSection")}</h3>
              <p>
                {t("terms.contactText")}
                <a href={`mailto:${CONTACT.email}`} className="text-[#2D5A40] hover:underline ml-1">
                  {CONTACT.email}
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Terms of use */}
        <Card>
          <CardHeader>
            <CardTitle>{t("terms.termsTitle")}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5 text-[15px] text-[#888073] leading-[1.7]">
            <div>
              <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.websiteUse")}</h3>
              <p>{t("terms.websiteUseText")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.propertyInfo")}</h3>
              <p>{t("terms.propertyInfoText")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.intellectualProperty")}</h3>
              <p>{t("terms.intellectualPropertyText")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.liability")}</h3>
              <p>{t("terms.liabilityIntro")}</p>
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li>{t("terms.liabilityItem1")}</li>
                <li>{t("terms.liabilityItem2")}</li>
                <li>{t("terms.liabilityItem3")}</li>
                <li>{t("terms.liabilityItem4")}</li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.legalAdvice")}</h3>
              <p>{t("terms.legalAdviceText")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.modifications")}</h3>
              <p>{t("terms.modificationsText")}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.applicableLaw")}</h3>
              <p>{t("terms.applicableLawText")}</p>
            </div>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card>
          <CardHeader>
            <CardTitle>{t("terms.importantNotice")}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[15px] text-[#888073] leading-[1.7]">
              <strong className="text-[#F0EDE6] font-medium">{t("terms.verificationNeeded")}</strong>{" "}
              {t("terms.verificationText")}
            </p>
          </CardContent>
        </Card>

        {/* Contact */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-medium text-[#F0EDE6] mb-2">{t("terms.questionsTitle")}</h3>
            <p className="text-[15px] text-[#888073] mb-3">{t("terms.questionsText")}</p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="text-[15px] text-[#2D5A40] hover:underline"
            >
              {CONTACT.email}
            </a>
          </CardContent>
        </Card>

        <p className="text-xs text-[#888073]/50 text-center pb-8">
          {t("terms.lastUpdate", {
            date: new Date().toLocaleDateString(dateLocale, {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
          })}
        </p>
      </div>
    </div>
  );
}
