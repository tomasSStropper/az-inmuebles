export const CONTACT = {
  phoneLocal: "83819331",
  phoneDisplay: "8381-9331",
  phoneE164: "+50683819331",
  email: "azinmmuebles@gmail.com",
  location: "San Vito, Coto Brus, Puntarenas",
  hours: [
    "Lunes a Viernes: 8:00 AM - 5:00 PM",
    "Sábado: 8:00 AM - 12:00 PM",
  ],
};

export function whatsappUrl(message) {
  return `https://wa.me/506${CONTACT.phoneLocal}?text=${encodeURIComponent(message)}`;
}

export const PHONE_URL = `tel:${CONTACT.phoneE164}`;
export const EMAIL_URL = `mailto:${CONTACT.email}`;

export const DEFAULT_WHATSAPP_MESSAGE =
  "Hola, estoy interesado en conocer más sobre las propiedades disponibles en Coto Brus. ¿Podrían brindarme información?";
