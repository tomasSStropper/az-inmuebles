import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Lock, FileText } from "lucide-react";

export default function TerminosPrivacidad() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[var(--text)] mb-4">
          Términos y Privacidad
        </h1>
        <p className="text-lg text-[var(--muted)]">
          Tu seguridad y confianza son nuestra prioridad
        </p>
      </div>

      <div className="space-y-8">
        {/* Privacy Notice */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Shield className="w-6 h-6 text-[#C46542]" />
              Aviso de Privacidad
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3 className="text-lg font-semibold mb-3">Recopilación de Datos</h3>
            <p className="text-[var(--text)] mb-4">
              AZ Inmuebles recopila información personal como nombre, correo electrónico, teléfono y
              otros datos que voluntariamente nos proporciones a través de formularios de contacto,
              consultas sobre propiedades o comunicaciones directas.
            </p>

            <h3 className="text-lg font-semibold mb-3">Uso de la Información</h3>
            <p className="text-[var(--text)] mb-4">
              Utilizamos tus datos exclusivamente para:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[var(--text)] space-y-2">
              <li>Responder tus consultas sobre propiedades</li>
              <li>Coordinar visitas y proporcionar información solicitada</li>
              <li>Enviarte actualizaciones sobre propiedades de tu interés (solo si lo autorizas)</li>
              <li>Mejorar nuestros servicios y experiencia de usuario</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">Protección de Datos</h3>
            <p className="text-[var(--text)] mb-4">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tu
              información personal contra acceso no autorizado, pérdida o alteración.
            </p>

            <h3 className="text-lg font-semibold mb-3">Compartir Información</h3>
            <p className="text-[var(--text)] mb-4">
              No vendemos, alquilamos ni compartimos tus datos personales con terceros, excepto
              cuando sea necesario para completar una transacción inmobiliaria (propietarios,
              notarios, entidades financieras) y siempre con tu consentimiento expreso.
            </p>

            <h3 className="text-lg font-semibold mb-3">Tus Derechos</h3>
            <p className="text-[var(--text)] mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[var(--text)] space-y-2">
              <li>Acceder a tus datos personales</li>
              <li>Rectificar información incorrecta o desactualizada</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tu información</li>
              <li>Revocar tu consentimiento en cualquier momento</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">Contacto</h3>
            <p className="text-[var(--text)]">
              Para ejercer tus derechos o realizar consultas sobre privacidad, contáctanos en:{" "}
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
              Términos de Uso
            </CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <h3 className="text-lg font-semibold mb-3">Uso del Sitio Web</h3>
            <p className="text-[var(--text)] mb-4">
              Este sitio web es proporcionado por AZ Inmuebles para facilitar la búsqueda y consulta
              de propiedades inmobiliarias en Coto Brus. Al usar este sitio, aceptas estos términos.
            </p>

            <h3 className="text-lg font-semibold mb-3">Información de Propiedades</h3>
            <p className="text-[var(--text)] mb-4">
              La información de cada propiedad es proporcionada por los propietarios o sus
              representantes autorizados. Aunque nos esforzamos por mantener la información
              actualizada y precisa, esta puede variar. Te recomendamos verificar todos los detalles
              directamente antes de tomar cualquier decisión de compra o inversión.
            </p>

            <h3 className="text-lg font-semibold mb-3">Propiedad Intelectual</h3>
            <p className="text-[var(--text)] mb-4">
              Todo el contenido del sitio, incluyendo textos, diseños, logotipos e imágenes, es
              propiedad de AZ Inmuebles o utilizado con autorización. No está permitido copiar,
              reproducir o distribuir el contenido sin autorización expresa.
            </p>

            <h3 className="text-lg font-semibold mb-3">Limitación de Responsabilidad</h3>
            <p className="text-[var(--text)] mb-4">
              AZ Inmuebles actúa como intermediario entre compradores y vendedores. No somos
              responsables por:
            </p>
            <ul className="list-disc pl-6 mb-4 text-[var(--text)] space-y-2">
              <li>Inexactitudes en la información proporcionada por terceros</li>
              <li>Cambios en disponibilidad o precios de propiedades</li>
              <li>Decisiones de inversión tomadas basándose en la información del sitio</li>
              <li>Interrupciones o errores técnicos del sitio web</li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">Asesoría Legal</h3>
            <p className="text-[var(--text)] mb-4">
              Aunque Carlos Azofeifa Arias es abogado y notario, la información en este sitio no
              constituye asesoría legal formal. Para asuntos legales específicos, se recomienda
              consultar directamente con un profesional del derecho.
            </p>

            <h3 className="text-lg font-semibold mb-3">Modificaciones</h3>
            <p className="text-[var(--text)] mb-4">
              Nos reservamos el derecho de modificar estos términos en cualquier momento. Los
              cambios entrarán en vigor al ser publicados en el sitio.
            </p>

            <h3 className="text-lg font-semibold mb-3">Ley Aplicable</h3>
            <p className="text-[var(--text)]">
              Estos términos se rigen por las leyes de Costa Rica. Cualquier disputa será resuelta
              en los tribunales competentes de Costa Rica.
            </p>
          </CardContent>
        </Card>

        {/* Disclaimer */}
        <Card className="bg-yellow-900/20 border-yellow-800/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <Eye className="w-6 h-6 text-yellow-600" />
              Aviso Importante
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-[var(--text)]">
              <strong>Verificación Necesaria:</strong> La información de cada propiedad es
              proporcionada por los propietarios o sus representantes y puede variar. Es tu
              responsabilidad verificar todos los datos, documentos legales, medidas, condiciones y
              cualquier otro aspecto relevante antes de tomar una decisión de compra. Recomendamos
              realizar inspecciones físicas, revisar documentación legal y consultar con
              profesionales especializados cuando sea necesario.
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
                  ¿Preguntas sobre Términos y Privacidad?
                </h3>
                <p className="text-[var(--text)] mb-3">
                  Si tienes dudas sobre cómo manejamos tus datos o sobre nuestros términos de uso,
                  estamos aquí para ayudarte.
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
        <p>Última actualización: {new Date().toLocaleDateString("es-CR", { year: "numeric", month: "long", day: "numeric" })}</p>
      </div>
    </div>
  );
}
