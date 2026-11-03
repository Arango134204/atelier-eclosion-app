# Éclosion Bijoux — app móvil

Aplicación para **Atelier Éclosion Bijoux**, joyería artesanal tejida a mano (Mulhouse, Francia). Permite explorar
el catálogo real de la tienda y solicitar piezas o encargos sur mesure.

Proyecto final de Desarrollo Móvil II — React Native, TypeScript y Expo.

## Requisitos

- Node.js 20 o superior (probado con Node 24)
- Android: la app **Expo Go** (SDK 57) en el teléfono, o un emulador de Android Studio

## Instalación y ejecución

```bash
npm install
npx expo start          # escanear el QR con Expo Go
npx expo start --android  # abrir directamente en el emulador
```

### Con el emulador de Android Studio

1. Abrir Android Studio → **Device Manager** → ▶ en el dispositivo (por ejemplo `Medium_Phone_API_37.0`). Esperar a que muestre la pantalla de inicio de Android.
2. En la terminal (la de Android Studio: **View → Tool Windows → Terminal**), dentro de la carpeta del proyecto:
   ```bash
   npx expo start
   ```
3. Presionar `a`. La primera vez Expo instala Expo Go en el emulador; después la app abre directamente.
4. Para recargar después de un cambio, presionar `r` en la terminal. Para detener el servidor, `Ctrl + C`.

### En un teléfono Android

Instalar **Expo Go** desde Play Store, conectarse a la misma red WiFi que el computador y escanear el QR que
muestra `npx expo start`. Si la red bloquea la conexión, usar `npx expo start --tunnel`.

## Comandos útiles

```bash
npm run typecheck   # verificación de TypeScript
powershell -ExecutionPolicy Bypass -File scripts/generate-brand-assets.ps1   # regenerar iconos desde el logo
```

## Idiomas

La app está en **francés** (idioma principal de la marca) y **español**. En la primera apertura usa español si el
teléfono está en español y francés en cualquier otro caso. Se puede cambiar en el menú lateral (☰) → **FR / ES**, y
la elección se recuerda.

- Textos: `src/i18n/locales/fr.ts` y `src/i18n/locales/es.ts`. TypeScript obliga a que ambos tengan las mismas claves.
- Para agregar un texto: crear la clave en `fr.ts`, traducirla en `es.ts` y usar `t('seccion.clave')` con `useTranslation()`.

## Identidad de marca

- Logo oficial: `assets/brand/logo-original.png` (fuente: ateliereclosionbijoux.com).
- Colores: dorado `#BC7C1C` y burdeos `#570A04` (del logo); marfil `#FAF6F0` y tinta `#1F1A17` como neutros.
- Tipografías: Cormorant Garamond (títulos) y Jost (texto), en `assets/fonts/`.

## Estructura

```
src/
├── app/                    Rutas (Expo Router)
│   ├── _layout.tsx         Stack raíz + carga de fuentes
│   ├── (drawer)/           Drawer: Inicio, El taller, La marca
│   │   └── (tabs)/         Tabs: Catálogo, Favoritos, Mis solicitudes
│   ├── product/[handle].tsx  Detalle dinámico
│   └── +not-found.tsx
├── components/             Componentes reutilizables (ui/, catalog/)
├── features/catalog/       Tipos y datos del catálogo (API en el hito 3)
├── theme/                  Colores y fuentes para props sin className
└── utils/
docs/                       Alcance, mapa de pantallas, matriz de requisitos, bitácora
```

## Estado actual

Hito 1 completado: base del proyecto, navegación Stack + Tabs + Drawer, ruta dinámica y componentes base.
El catálogo usa temporalmente una copia local de las 9 piezas reales de la tienda. En el hito 3 se reemplaza por
peticiones HTTP a la API de Shopify. Ver `docs/03-matriz-requisitos.md`.
