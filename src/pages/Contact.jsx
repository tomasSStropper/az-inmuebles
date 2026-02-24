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
  CheckCircle2
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
    consent: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useTranslation();

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.consent) return;

    setIsSubmitting(true);

    try {
      await SendEmail({
        to: CONTACT.email,
        subject: t("contact.emailSubject", { name: formData.name }),
        body: `
Nombre: ${formData.name}
Teléfono: ${formData.phone}
Correo: ${formData.email}

Mensaje:
${formData.message}
        `
      });

      setIsSuccess(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        message: "",
        consent: false
      });
    } catch (error) {
      alert(t("contact.errorAlert"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsapp = whatsappUrl(t("whatsapp.contactMessage"));

  const hours = t("contactConfig.hours");

  return (
    <div>
      {/* Hero */}
      <section className="relative h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=600&fit=crop"
          alt={t("contact.heroTitle")}
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t("contact.heroTitle")}</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              {t("contact.heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-[var(--text)] mb-4">
                {t("contact.infoTitle")}
              </h2>
              <p className="text-[var(--muted)] mb-8">
                {t("contact.infoSubtitle")}
              </p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <a href={PHONE_URL} className="flex items-start gap-4 p-4 rounded-lg hover:bg-[var(--bg-elev2)] transition-colors">
                  <div className="w-12 h-12 bg-blue-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text)] mb-1">{t("contact.phone")}</h3>
                    <p className="text-[var(--muted)]">{CONTACT.phoneDisplay}</p>
                  </div>
                </a>

                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-lg hover:bg-[var(--bg-elev2)] transition-colors">
                  <div className="w-12 h-12 bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text)] mb-1">{t("contact.whatsapp")}</h3>
                    <p className="text-[var(--muted)]">{t("contact.directMessage")}</p>
                  </div>
                </a>

                <a href={EMAIL_URL} className="flex items-start gap-4 p-4 rounded-lg hover:bg-[var(--bg-elev2)] transition-colors">
                  <div className="w-12 h-12 bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text)] mb-1">{t("contact.emailLabel")}</h3>
                    <p className="text-[var(--muted)] break-all">{CONTACT.email}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4">
                  <div className="w-12 h-12 bg-emerald-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text)] mb-1">{t("contact.location")}</h3>
                    <p className="text-[var(--muted)]">{CONTACT.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4">
                  <div className="w-12 h-12 bg-amber-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--text)] mb-1">{t("contact.schedule")}</h3>
                    {Array.isArray(hours) && hours.map((h) => (
                      <p key={h} className="text-[var(--muted)]">{h}</p>
                    ))}
                    <p className="text-[var(--muted)] mt-2">{t("contact.schedulePromise")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>{t("contact.formTitle")}</CardTitle>
              </CardHeader>
              <CardContent>
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--text)] mb-2">
                      {t("contact.successTitle")}
                    </h3>
                    <p className="text-[var(--muted)] mb-6">
                      {t("contact.successMessage")}
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline">
                      {t("contact.sendAnother")}
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">{t("contact.fullName")}</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder={t("contact.namePlaceholder")}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">{t("contact.phoneLabel")}</Label>
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

                    <div className="space-y-2">
                      <Label htmlFor="email">{t("contact.emailField")}</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder={t("contact.emailPlaceholder")}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">{t("contact.messageLabel")}</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder={t("contact.messagePlaceholder")}
                        className="h-32"
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => handleChange("consent", checked)}
                      />
                      <Label htmlFor="consent" className="text-sm text-[var(--muted)] cursor-pointer">
                        {t("contact.consent")}
                        <Link to={createPageUrl("TerminosPrivacidad")} className="text-[#C46542] hover:underline">
                          {t("contact.termsLink")}
                        </Link>
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={!formData.consent || isSubmitting}
                    >
                      {isSubmitting ? t("contact.sending") : t("contact.sendMessage")}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-4 mt-6">
              <a
                href={whatsapp}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text)]">WhatsApp</h3>
                      <p className="text-sm text-[var(--muted)]">{t("contact.instantResponse")}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>

              <a href={EMAIL_URL}>
                <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-900/30 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[var(--text)]">{t("contact.emailLabel")}</h3>
                      <p className="text-sm text-[var(--muted)]">{CONTACT.email}</p>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
