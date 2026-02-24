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
        subject: `Nueva consulta de ${formData.name}`,
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
      alert("Hubo un error al enviar el mensaje. Por favor, intenta contactarnos directamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsapp = whatsappUrl("Hola, me gustaría obtener información sobre propiedades. ¿Me pueden ayudar?");

  return (
    <div>
      {/* Hero */}
      <section className="relative h-80 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=600&fit=crop"
          alt="Contacto"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 text-white w-full">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Contáctanos</h1>
            <p className="text-xl text-gray-200 max-w-2xl">
              Estamos aquí para ayudarte a encontrar la propiedad perfecta
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Información de Contacto
              </h2>
              <p className="text-gray-600 mb-8">
                Responderemos tu consulta lo antes posible. También puedes contactarnos directamente por los medios disponibles.
              </p>
            </div>

            <Card>
              <CardContent className="p-6 space-y-4">
                <a href={PHONE_URL} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Teléfono</h3>
                    <p className="text-gray-600">{CONTACT.phoneDisplay}</p>
                  </div>
                </a>

                <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MessageCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">WhatsApp</h3>
                    <p className="text-gray-600">Mensaje directo</p>
                  </div>
                </a>

                <a href={EMAIL_URL} className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Correo</h3>
                    <p className="text-gray-600 break-all">{CONTACT.email}</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4">
                  <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Ubicación</h3>
                    <p className="text-gray-600">{CONTACT.location}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-1">Horario</h3>
                    {CONTACT.hours.map((h) => (
                      <p key={h} className="text-gray-600">{h}</p>
                    ))}
                    <p className="text-gray-600 mt-2"><strong>Promesa:</strong> respuesta ágil por WhatsApp en horario de atención.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Envíanos un Mensaje</CardTitle>
              </CardHeader>
              <CardContent>
                {isSuccess ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      ¡Mensaje Enviado!
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Gracias por contactarnos. Te responderemos pronto.
                    </p>
                    <Button onClick={() => setIsSuccess(false)} variant="outline">
                      Enviar Otro Mensaje
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nombre Completo *</Label>
                        <Input
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) => handleChange("name", e.target.value)}
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono *</Label>
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
                      <Label htmlFor="email">Correo Electrónico *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="tu@correo.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Mensaje *</Label>
                      <Textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                        className="h-32"
                      />
                    </div>

                    <div className="flex items-start gap-3">
                      <Checkbox
                        id="consent"
                        checked={formData.consent}
                        onCheckedChange={(checked) => handleChange("consent", checked)}
                      />
                      <Label htmlFor="consent" className="text-sm text-gray-600 cursor-pointer">
                        Acepto que AZ Inmuebles use mis datos para responder mi consulta, según los{" "}
                        <Link to={createPageUrl("TerminosPrivacidad")} className="text-[#C46542] hover:underline">
                          Términos y Privacidad
                        </Link>
                      </Label>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-600 hover:bg-emerald-700"
                      disabled={!formData.consent || isSubmitting}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
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
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">WhatsApp</h3>
                      <p className="text-sm text-gray-600">Respuesta inmediata</p>
                    </div>
                  </CardContent>
                </Card>
              </a>

              <a href={EMAIL_URL}>
                <Card className="hover:shadow-lg transition-all cursor-pointer h-full">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Correo</h3>
                      <p className="text-sm text-gray-600">{CONTACT.email}</p>
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
