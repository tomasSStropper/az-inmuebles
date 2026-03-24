import React, { useState } from "react";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { CheckCircle2 } from "lucide-react";
import { SendEmail } from "@/integrations/Core";
import { Link } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { CONTACT, PHONE_URL, EMAIL_URL, whatsappUrl } from "@/config/contact";
import { useTranslation } from "@/i18n/LanguageContext";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    consent: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();

  const handleChange = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) return;
    setIsSubmitting(true);
    try {
      await SendEmail({
        to: CONTACT.email,
        subject: t("contact.emailSubject", { name: formData.name }),
        body: `Nombre: ${formData.name}\nTeléfono: ${formData.phone}\nCorreo: ${formData.email}\n\nMensaje:\n${formData.message}`,
      });
      setIsSuccess(true);
      setFormData({ name: "", phone: "", email: "", message: "", consent: false });
    } catch {
      alert(t("contact.errorAlert"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsapp = whatsappUrl(t("whatsapp.contactMessage"));
  const hours = t("contactConfig.hours");

  return (
    <div className="bg-[#0D0D0D]">
      {/* Page header */}
      <section className="border-b border-[rgba(255,255,255,0.07)] py-[80px]">
        <div className="max-w-7xl mx-auto px-6">
          <h1
            className="text-[40px] md:text-[56px] font-light text-[#F0EDE6] leading-tight mb-4"
            style={{ letterSpacing: "-0.025em" }}
          >
            {t("contact.heroTitle")}
          </h1>
          <p className="text-[15px] text-[#888073]">
            {t("contact.heroSubtitle")}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-[80px]">
        <div className="grid md:grid-cols-2 gap-16">

          {/* Contact info */}
          <div>
            <h2 className="text-base font-medium text-[#F0EDE6] mb-8">
              {t("contact.infoTitle")}
            </h2>

            <div className="space-y-6">
              <div>
                <p className="text-xs text-[#888073] uppercase tracking-[0.1em] mb-1">
                  {t("contact.phone")}
                </p>
                <a
                  href={PHONE_URL}
                  className="text-[15px] text-[#F0EDE6] hover:text-[#C8A96E] transition-colors"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </div>

              <div>
                <p className="text-xs text-[#888073] uppercase tracking-[0.1em] mb-1">
                  WhatsApp
                </p>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[15px] text-[#F0EDE6] hover:text-[#C8A96E] transition-colors"
                >
                  {CONTACT.phoneDisplay}
                </a>
              </div>

              <div>
                <p className="text-xs text-[#888073] uppercase tracking-[0.1em] mb-1">
                  {t("contact.emailLabel")}
                </p>
                <a
                  href={EMAIL_URL}
                  className="text-[15px] text-[#F0EDE6] hover:text-[#C8A96E] transition-colors break-all"
                >
                  {CONTACT.email}
                </a>
              </div>

              <div>
                <p className="text-xs text-[#888073] uppercase tracking-[0.1em] mb-1">
                  {t("contact.location")}
                </p>
                <p className="text-[15px] text-[#F0EDE6]">{CONTACT.location}</p>
              </div>

              <div>
                <p className="text-xs text-[#888073] uppercase tracking-[0.1em] mb-1">
                  {t("contact.schedule")}
                </p>
                {Array.isArray(hours) &&
                  hours.map((h) => (
                    <p key={h} className="text-[15px] text-[#F0EDE6]">{h}</p>
                  ))}
              </div>
            </div>
          </div>

          {/* Form */}
          <div>
            <h2 className="text-base font-medium text-[#F0EDE6] mb-8">
              {t("contact.formTitle")}
            </h2>

            {isSuccess ? (
              <div className="py-12">
                <CheckCircle2 className="w-8 h-8 text-[#C8A96E] mb-4" />
                <h3 className="text-lg font-light text-[#F0EDE6] mb-2">
                  {t("contact.successTitle")}
                </h3>
                <p className="text-[15px] text-[#888073] mb-6">
                  {t("contact.successMessage")}
                </p>
                <Button variant="outline" size="sm" onClick={() => setIsSuccess(false)}>
                  {t("contact.sendAnother")}
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-[#888073] uppercase tracking-[0.1em]">
                      {t("contact.fullName")}
                    </Label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder={t("contact.namePlaceholder")}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-[#888073] uppercase tracking-[0.1em]">
                      {t("contact.phoneLabel")}
                    </Label>
                    <Input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => handleChange("phone", e.target.value)}
                      placeholder={CONTACT.phoneDisplay}
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-[#888073] uppercase tracking-[0.1em]">
                    {t("contact.emailField")}
                  </Label>
                  <Input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    placeholder={t("contact.emailPlaceholder")}
                  />
                </div>

                <div className="space-y-1.5">
                  <Label className="text-xs text-[#888073] uppercase tracking-[0.1em]">
                    {t("contact.messageLabel")}
                  </Label>
                  <Textarea
                    required
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder={t("contact.messagePlaceholder")}
                    className="h-28"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(v) => handleChange("consent", v)}
                  />
                  <label
                    htmlFor="consent"
                    className="text-xs text-[#888073] cursor-pointer leading-relaxed"
                  >
                    {t("contact.consent")}
                    <Link
                      to={createPageUrl("TerminosPrivacidad")}
                      className="text-[#C8A96E] hover:underline ml-1"
                    >
                      {t("contact.termsLink")}
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={!formData.consent || isSubmitting}
                >
                  {isSubmitting ? t("contact.sending") : t("contact.sendMessage")}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
