# AZ Inmuebles (clone Base44 -> GitHub/Vercel)

Proyecto React + Vite + Tailwind, clon visual del sitio de Base44, con datos mock.

## Requisitos
- Node.js 18+

## Instalación
```bash
npm install
npm run dev
```

## Deploy en Vercel
- Framework: Vite
- Build: `npm run build`
- Output: `dist`

## Datos
Los datos están en `src/entities/Property.js` (mock).  
El envío de correo es mock en `src/integrations/Core.js` (solo consola).

## Variable opcional para imagen del hero
Si en producción no carga el fondo del hero por políticas CSP/bloqueo de `data:` URLs, define esta variable en tu hosting:

```bash
VITE_HERO_BG_IMAGE_URL=https://tu-cdn-o-storage/hero-coto-brus.jpg
```

Si no está definida, la app usa el fallback embebido actual.
