import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";
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

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
    <div>
      {/* ── Page header ── */}
      <section className="bg-[#F0EDE6] py-16">
        <div className="max-w-7xl mx-auto px-4">
          <span className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 bg-[#B07D3A] text-white rounded-full text-sm font-semibold font-inter">
            <Mail className="w-3.5 h-3.5" />
            {t("contact.heroTitle")}
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-[#1A1A1A] mb-3">
            {t("contact.heroTitle")}
          </h1>
          <p className="font-inter text-[#5C5449] text-lg max-w-xl">
            {t("contact.heroSubtitle")}
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">

          {/* ── Contact info ── */}
          <div className="space-y-5">
            <div>
              <h2 className="font-playfair text-2xl font-bold text-[#1A1A1A] mb-2">
                {t("contact.infoTitle")}
              </h2>
              <p className="font-inter text-[#5C5449] text-sm">
                {t("contact.infoSubtitle")}
              </p>
            </div>

            <Card>
              <CardContent className="p-4 space-y-1">
                <a
                  href={PHONE_URL}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors group"
                >
                  <div className="w-10 h-10 bg-[rgba(176,125,58,0.1)] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#B07D3A] transition-colors">
                    <Phone className="w-5 h-5 text-[#B07D3A] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-inter text-xs text-[#5C5449] uppercase tracking-wider">
                      {t("contact.phone")}
                    </p>
                    <p className="font-playfair font-semibold text-[#1A1A1A]">
                      {CONTACT.phoneDisplay}
                    </p>
                  </div>
                </a>

                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors group"
                >
                  <div className="w-10 h-10 bg-[rgba(176,125,58,0.1)] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#B07D3A] transition-colors">
                    <MessageCircle className="w-5 h-5 text-[#B07D3A] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-inter text-xs text-[#5C5449] uppercase tracking-wider">
                      WhatsApp
                    </p>
                    <p className="font-playfair font-semibold text-[#1A1A1A]">
                      {CONTACT.phoneDisplay}
                    </p>
                  </div>
                </a>

                <a
                  href={EMAIL_URL}
                  className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--bg-secondary)] transition-colors group"
                >
                  <div className="w-10 h-10 bg-[rgba(176,125,58,0.1)] rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#B07D3A] transition-colors">
                    <Mail className="w-5 h-5 text-[#B07D3A] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-inter text-xs text-[#5C5449] uppercase tracking-wider">
                      {t("contact.emailLabel")}
                    </p>
                    <p className="font-playfair font-semibold text-[#1A1A1A] break-all text-sm">
                      {CONTACT.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4">
                  <div className="w-10 h-10 bg-[rgba(176,125,58,0.1)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-[#B07D3A]" />
                  </div>
                  <div>
                    <p className="font-inter text-xs text-[#5C5449] uppercase tracking-wider">
                      {t("contact.location")}
                    </p>
                    <p className="font-playfair font-semibold text-[#1A1A1A]">
                      {CONTACT.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4">
                  <div className="w-10 h-10 bg-[rgba(176,125,58,0.1)] rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5 text-[#B07D3A]" />
                  </div>
                  <div>
                    <p className="font-inter text-xs text-[#5C5449] uppercase tracking-wider mb-1">
                      {t("contact.schedule")}
                    </p>
                    {Array.isArray(hours) &&
                      hours.map((h) => (
                        <p key={h} className="font-inter text-sm text-[#1A1A1A]">
                          {h}
                        </p>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* ── Contact form ── */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="font-playfair text-xl">{t("contact.formTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                {isSuccess ? (
                  <div className="text-center py-10">
                    <div className="w-14 h-14 bg-[rgba(176,125,58,0.1)] rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-7 h-7 text-[#B07D3A]" />
                    </div>
                    <h3 className="font-playfair text-xl font-bold text-[#1A1A1A] mb-2">
                      {t("contact.successTitle")}
                    </h3>
                    <p className="font-inter text-[#5C5449] text-sm mb-6">
                      {t("contact.successMessage")}
                    </p>
                    <Button variant="outline" onClick={() => setIsSuccess(false)}>
                      {t("contact.sendAnother")}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="font-inter text-xs font-medium text-[#5C5449] uppercase tracking-wider">
                          {t("contact.fullName")}
                        </Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder={t("contact.namePlaceholder")}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="phone" className="font-inter text-xs font-medium text-[#5C5449] uppercase tracking-wider">
                          {t("contact.phoneLabel")}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleChange("phone", e.target.value)}
                          placeholder={CONTACT.phoneDisplay}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="email" className="font-inter text-xs font-medium text-[#5C5449] uppercase tracking-wider">
                        {t("contact.emailField")}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder={t("contact.emailPlaceholder")}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="font-inter text-xs font-medium text-[#5C5449] uppercase tracking-wider">
                        {t("contact.messageLabel")}
                      </Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder={t("contact.messagePlaceholder")}
                        className="h-32 border border-[var(--border-strong)] rounded-xl text-sm font-inter focus:ring-2 focus:ring-[#B07D3A]/30 focus:border-[#B07D3A] transition-colors outline-none"
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => handleChange("consent", checked)}
                      />
                      <Label
                        htmlFor="consent"
                        className="text-xs text-[#5C5449] cursor-pointer font-inter leading-relaxed"
                      >
                        {t("contact.consent")}
                        <Link
                          to={createPageUrl("TerminosPrivacidad")}
                          className="text-[#B07D3A] hover:underline ml-1"
                        >
                          {t("contact.termsLink")}
                        </Link>
                      </Label>
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
              </CardContent>
            </Card>

            {/* Quick contact cards */}
            <div className="grid grid-cols-2 gap-4 mt-5">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                <div className="group bg-white rounded-2xl border border-[var(--border)] p-5 flex items-center gap-3 hover:shadow-md hover:border-[#B07D3A] transition-all cursor-pointer">
                  <div className="w-9 h-9 bg-[rgba(176,125,58,0.1)] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#B07D3A] transition-colors">
                    <MessageCircle className="w-4 h-4 text-[#B07D3A] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-playfair text-sm font-semibold text-[#1A1A1A]">
                      WhatsApp
                    </p>
                    <p className="font-inter text-xs text-[#5C5449]">
                      {t("contact.instantResponse")}
                    </p>
                  </div>
                </div>
              </a>
              <a href={EMAIL_URL}>
                <div className="group bg-white rounded-2xl border border-[var(--border)] p-5 flex items-center gap-3 hover:shadow-md hover:border-[#B07D3A] transition-all cursor-pointer">
                  <div className="w-9 h-9 bg-[rgba(176,125,58,0.1)] rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-[#B07D3A] transition-colors">
                    <Mail className="w-4 h-4 text-[#B07D3A] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="font-playfair text-sm font-semibold text-[#1A1A1A]">
                      {t("contact.emailLabel")}
                    </p>
                    <p className="font-inter text-xs text-[#5C5449]">{CONTACT.email}</p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
