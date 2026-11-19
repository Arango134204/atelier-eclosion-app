# Matriz de requisitos

Estados: ✅ cumplido · 🟡 parcial · ⏳ planeado

Autor: Juan José Arango Jaramillo

| # | Requisito del documento | Función en la app | Pantalla / archivo | Estado | Evidencia |
| --- | --- | --- | --- | --- | --- |
| 1 | React Native + TypeScript + Expo (versiones de clase) | Base del proyecto, Expo SDK 57 | `package.json`, `package-lock.json` | ✅ | Hito 1 |
| 2 | Expo Router y separación por carpetas | Rutas en `src/app`, componentes, features, utils, theme | `src/` | ✅ | Hito 1 |
| 3 | Tipos para entidades, props y respuestas | `Product`, `ShopifyProduct`, props tipadas | `src/features/catalog/types/`, `api/shopify.types.ts` | ✅ | Hito 3 |
| 4 | Stack con función real | Detalle → Cotización → Coordenadas → Confirmación | `src/app/_layout.tsx`, `src/app/request/` | ✅ | Hito 2 |
| 5 | Tabs | Catálogo, Favoritos, Mis solicitudes | `src/app/(drawer)/(tabs)/_layout.tsx` | ✅ | Hito 1 |
| 6 | Drawer | Inicio, El taller, La marca | `src/app/(drawer)/_layout.tsx` | ✅ | Hito 1 |
| 7 | Ruta dinámica + identificador inexistente | `product/[handle]` con 404/error | `src/app/product/[handle].tsx` | ✅ | Hito 1 / 3 |
| 8 | NativeWind, colores, iconos, imágenes y fuente propia | Paleta de marca, Cormorant + Jost, Ionicons | `tailwind.config.js`, `_layout.tsx` | ✅ | Hito 1 |
| 9 | Carga de recursos y áreas seguras | `useFonts` + SplashScreen, `SafeAreaView` | `_layout.tsx`, `Screen.tsx` | ✅ | Hito 1 |
| 10 | 3+ componentes reutilizables con props tipadas | UI de catálogo, cotización, formulario y solicitudes | `src/components/` | ✅ | Hito 1 / 2 |
| 11 | Listas, tarjetas, búsqueda o filtro | Búsqueda + filtro + contador + vacío | `index.tsx`, `useCatalogFilter.ts` | ✅ | Hito 2 |
| 12 | Indicadores de carga, vacíos y alternativa sin imagen | Loading/error Query, vacíos, placeholder imagen | `StateMessage`, `ProductCard`, catálogo/detalle | ✅ | Hito 3 |
| 13 | useState / useEffect con propósito | Splash, idioma, formulario, mapa, NetInfo | varios | ✅ | Hito 1–4 |
| 14 | Hook propio | `useLanguageSync`, `useQuote`, `useCatalogFilter`, `useLocationTracking`, `useNetworkStatus` | `src/` | ✅ | Hito 1–4 |
| 15 | Zustand para estado compartido | Idioma, favoritos, draft, solicitudes | `src/store/` | ✅ | Hito 2 |
| 16 | Contador contextual con límites | Cantidad 1–5 | `QuantityStepper` | ✅ | Hito 2 |
| 17 | Cálculo contextual validado | Sur mesure + envío | `src/features/quote/` | ✅ | Hito 2 |
| 18 | Formulario con validaciones | Contacto | `contact.tsx` | ✅ | Hito 2 |
| 19 | Axios: listado + detalle | Shopify products | `shopify.service.ts` | ✅ | Hito 3 |
| 20 | baseURL, interfaces y mapper | `http.ts`, `shopify.types`, `shopify.mapper` | `src/services/api/`, `features/catalog/api/` | ✅ | Hito 3 |
| 21 | TanStack Query | `useProducts`, `useProduct` | `features/catalog/hooks/` | ✅ | Hito 3 |
| 22 | Mapa OSM + Leaflet en WebView | Taller Mulhouse | `atelier.tsx` | ✅ | Hito 3 |
| 23 | Permisos, centrar, seguimiento, limpieza | `useLocationTracking` | El taller | ✅ | Hito 3 |
| 24 | Persistencia tras cerrar la app | AsyncStorage + Firestore opcional | Mis solicitudes | ✅ | Hito 2 / 4 |
| 25 | Sin conexión / sin confirmaciones falsas | NetInfo + mensajes sent/saved | `OfflineBanner`, confirmación | ✅ | Hito 4 |
| 26 | `.env.template`, README, informe, bitácora, prueba | Documentación completa | `README.md`, `docs/` | ✅ | Hito 4 |
| — | Extra: FR/ES | i18next + selector | `src/i18n/` | ✅ | Hito 1 |
