import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, FileText } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

export default function TerminosPrivacidad() {
  const { t, lang } = useTranslation();

  const dateLocale = lang === "en" ? "en-US" : "es-CR";

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
          {t("terms.pageTitle")}
        </h1>
        <p className="text-lg text-[var(--muted)]">
          {t("terms.pageSubtitle")}
        </p>
      </div>

      <div className="space-y-8">
        {/* Privacy Notice */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#C46542]" />
              {t("terms.privacyTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3 className="text-lg font-semibold mb-3">{t("terms.dataCollection")}</h3>
            <p className="text-[var(--text)] mb-4">
              {t("terms.dataCollectionText")}
            </p>

            <h3 className="text-lg font-semibold mb-3">{t("terms.dataUse")}</h3>
            <p className="text-[var(--text)] mb-4">
              {t("terms.dataUseIntro")}
            </p>
            <ul className="list-disc pl-6 mb-4 text-[var(--text)] space-y-2">
              <li>{t("terms.dataUseItem1")}</li>
              <li>{t("terms.dataUseItem2")}</li>
              <li>{t("terms.dataUseItem3")}</li>
              <li>{t("terms.dataUseItem4")}</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">{t("terms.dataProtection")}</h3>
            <p className="text-[var(--text)] mb-4">
              {t("terms.dataProtectionText")}
            </p>

            <h3 className="text-lg font-semibold mb-3">{t("terms.dataSharing")}</h3>
            <p className="text-[var(--text)] mb-4">
              {t("terms.dataSharingText")}
            </p>

            <h3 className="text-lg font-semibold mb-3">{t("terms.yourRights")}</h3>
            <p className="text-[var(--text)] mb-4">
              {t("terms.yourRightsIntro")}
            </p>
            <ul className="list-disc pl-6 mb-4 text-[var(--text)] space-y-2">
              <li>{t("terms.rightsItem1")}</li>
              <li>{t("terms.rightsItem2")}</li>
              <li>{t("terms.rightsItem3")}</li>
              <li>{t("terms.rightsItem4")}</li>
              <li>{t("terms.rightsItem5")}</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">{t("terms.contactSection")}</h3>
            <p className="text-[var(--text)]">
              {t("terms.contactText")}
              <a href="mailto:azinmmuebles@gmail.com" className="text-[#C46542] hover:underline">
                azinmmuebles@gmail.com
              </a>
            </p>
          </CardContent>
        </Card>

        {/* Terms of Use */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <FileText className="w-6 h-6 text-[#C46542]" />
              {t("terms.termsTitle")}
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3 className="text-lg font-semibold mb-3">{t("terms.websiteUse")}</h3>
            <p className="text-[var(--text)] mb-4">
              {t("terms.websiteUseText")}
            </p>

            <h3 className="text-lg font-semibold mb-3">{t("terms.propertyInfo")}</h3>
            <p className="text-[var(--text)] mb-4">
              {t("terms.propertyInfoText")}
            </p>

            <h3 className="text-lg font-semibold mb-3">{t("terms.intellectualProperty")}</h3>
            <p className="text-[var(--text)] mb-4">
              {t("terms.intellectualPropertyText")}
            </p>

            <h3 className="text-lg font-semibold mb-3">{t("terms.liability")}</h3>
            <p className="text-[var(--text)] mb-4">
              {t("terms.liabilityIntro")}
            </p>
            <ul className="list-disc pl-6 mb-4 text-[var(--text)] space-y-2">
              <li>{t("terms.liabilityItem1")}</li>
              <li>{t("terms.liabilityItem2")}</li>
              <li>{t("terms.liabilityItem3")}</li>
              <li>{t("terms.liabilityItem4")}</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">{t("terms.legalAdvice")}</h3>
            <p className="text-[var(--text)] mb-4">
              {t("terms.legalAdviceText")}
            </p>

            <h3 className="text-lg font-semibold mb-3">{t("terms.modifications")}</h3>
            <p className="text-[var(--text)] mb-4">
              {t("terms.modificationsText")}
            </p>

            <h3 className="text-lg font-semibold mb-3">{t("terms.applicableLaw")}</h3>
            <p className="text-[var(--text)]">
              {t("terms.applicableLawText")}
            </p>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="bg-yellow-900/20 border-yellow-800/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-yellow-600" />
              {t("terms.importantNotice")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[var(--text)]">
              <strong>{t("terms.verificationNeeded")}</strong> {t("terms.verificationText")}
            </p>
          </CardContent>
        </Card>

        {/* Contact for Questions */}
        <Card className="bg-[var(--primary-50)] border-[var(--accent-border)]">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-[#C46542] rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-[var(--text)] mb-2">
                  {t("terms.questionsTitle")}
                </h3>
                <p className="text-[var(--text)] mb-3">
                  {t("terms.questionsText")}
                </p>
                <a
                  href="mailto:azinmmuebles@gmail.com"
                  className="text-[#C46542] font-medium hover:underline"
                >
                  azinmmuebles@gmail.com
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-12 text-center text-sm text-[var(--muted)]">
        <p>{t("terms.lastUpdate", { date: new Date().toLocaleDateString(dateLocale, { year: "numeric", month: "long", day: "numeric" }) })}</p>
      </div>
    </div>
  );
}
