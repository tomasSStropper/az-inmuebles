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

## Cloudflare Pages (preparado, todavía sin usar)

Producción sigue en Vercel (`vercel.json`) hasta que se decida el cambio.

| Ajuste en Pages | Valor |
| --- | --- |
| Framework | Ninguno |
| Comando de build | `npm run build` |
| Carpeta de salida | `dist` |
| Rama de producción | `main` |
| Node | `.node-version` (24) |
| Variables | Ninguna obligatoria. `VITE_HERO_BG_IMAGE_URL` es opcional |

- No hace falta regla de rutas ni `404.html`: sin `404.html`, Pages sirve `index.html` en cualquier ruta, igual que el `rewrite` de `vercel.json`. Agregar un `404.html` rompería las rutas internas (`/properties`, `/contact`).
- Única diferencia conocida: `/index.html` responde 200 en Vercel y redirige a `/` en Pages.
- El dominio sin www (`azinmueblescr.com`) lo redirige Vercel a `www`. Pages no puede atenderlo mientras el dominio no sea una zona de Cloudflare.
- Comparar antes de cambiar el DNS: `bash scripts/comparar-sitio.sh https://www.azinmueblescr.com https://az-inmuebles.pages.dev`. Compara 25 rutas, archivos y las cabeceras. Sale con error si hay diferencias.

## Datos
Los datos están en `src/entities/Property.js` (mock).  
El envío de correo es mock en `src/integrations/Core.js` (solo consola).

## Variable opcional para imagen del hero
Si en producción no carga el fondo del hero por políticas CSP/bloqueo de `data:` URLs, define esta variable en tu hosting:

```bash
VITE_HERO_BG_IMAGE_URL=https://tu-cdn-o-storage/hero-coto-brus.jpg
```

Si no está definida, la app usa el fallback embebido actual.
