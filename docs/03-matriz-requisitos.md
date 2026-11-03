# Matriz de requisitos (inicial)

Estados: ✅ cumplido · 🟡 parcial · ⏳ planeado (hito indicado)

| # | Requisito del documento | Función en la app | Pantalla / archivo | Estado | Evidencia |
| --- | --- | --- | --- | --- | --- |
| 1 | React Native + TypeScript + Expo (versiones de clase) | Base del proyecto, Expo SDK 57 | `package.json`, `package-lock.json` | ✅ | Hito 1 |
| 2 | Expo Router y separación por carpetas | Rutas en `src/app`, componentes, features, utils, theme | `src/` | ✅ | Hito 1 |
| 3 | Tipos para entidades, props y respuestas | `Product`, props tipadas; tipos Shopify en el hito 3 | `src/features/catalog/types/` | 🟡 | Hito 1 / 3 |
| 4 | Stack con función real | Detalle de pieza y retroceso; flujo de pedido | `src/app/_layout.tsx` | 🟡 | Hito 1 / 2 |
| 5 | Tabs | Catálogo, Favoritos, Mis solicitudes | `src/app/(drawer)/(tabs)/_layout.tsx` | ✅ | Hito 1 |
| 6 | Drawer | Inicio, El taller, La marca | `src/app/(drawer)/_layout.tsx` | ✅ | Hito 1 |
| 7 | Ruta dinámica + identificador inexistente | `product/[handle]` con estado "Esta pieza no existe" | `src/app/product/[handle].tsx` | ✅ | Hito 1 |
| 8 | NativeWind, colores, iconos, imágenes y fuente propia | Paleta de marca, Cormorant Garamond + Jost, Ionicons | `tailwind.config.js`, `src/app/_layout.tsx` | ✅ | Hito 1 |
| 9 | Carga de recursos y áreas seguras | `useFonts` + SplashScreen, `SafeAreaView` | `src/app/_layout.tsx`, `src/components/ui/Screen.tsx` | ✅ | Hito 1 |
| 10 | 3+ componentes reutilizables con props tipadas, usados | `Screen`, `AppButton`, `StateMessage`, `ProductCard` | `src/components/` | ✅ | Hito 1 |
| 11 | Listas y tarjetas, búsqueda o filtro | Grilla del catálogo; búsqueda y filtro por colección | `src/app/(drawer)/(tabs)/index.tsx` | 🟡 | Hito 1 / 2 |
| 12 | Indicadores de carga, vacíos y alternativa sin imagen | Estados vacíos y placeholder de imagen; carga en el hito 3 | `StateMessage`, `ProductCard` | 🟡 | Hito 1 / 3 |
| 13 | useState / useEffect con propósito | Fallback de imagen, ocultar el splash al cargar fuentes, sincronizar idioma | `ProductCard`, `_layout.tsx`, `useLanguageSync.ts` | ✅ | Hito 1 |
| 14 | Hook propio | `useLanguageSync` (entradas, estado, efectos y resultado documentados); luego `useQuote` y `useLocationTracking` | `src/i18n/useLanguageSync.ts` | 🟡 | Hito 1 / 2 / 3 |
| 15 | Zustand para estado compartido | Preferencia de idioma persistida (AsyncStorage); luego favoritos y solicitud en curso | `src/store/settings.store.ts` | 🟡 | Hito 1 / 2 |
| 16 | Contador contextual con límites | Cantidad por pieza (1–5 o stock) | Detalle / Cotización | ⏳ | Hito 2 |
| 17 | Cálculo contextual validado | Subtotal + recargo sur mesure + envío | Cotización | ⏳ | Hito 2 |
| 18 | Formulario con validaciones | Datos de contacto y notas | Formulario | ⏳ | Hito 2 |
| 19 | Axios: listado + detalle | Shopify `/products.json` y `/products/{handle}.json` | `src/services/api/` | ⏳ | Hito 3 |
| 20 | baseURL centralizada, interfaces y mapper | `shopify.mapper.ts` → `Product` | `src/features/catalog/api/` | ⏳ | Hito 3 |
| 21 | TanStack Query: queryKey, caché, estados, reintento | `useProducts`, `useProduct` | `src/features/catalog/hooks/` | ⏳ | Hito 3 |
| 22 | Mapa OSM + Leaflet en WebView con marcador del cliente | Taller en Mulhouse | `src/app/(drawer)/atelier.tsx` | ⏳ | Hito 3 |
| 23 | Permisos, centrar, activar/pausar/reanudar seguimiento, limpieza | `useLocationTracking` | El taller | ⏳ | Hito 3 |
| 24 | Persistencia tras cerrar la app | Solicitudes en Firestore; favoritos con persistencia local | Mis solicitudes | ⏳ | Hito 4 |
| 25 | Sin conexión / sin confirmaciones falsas | Detección de red y errores de envío | Formulario | ⏳ | Hito 4 |
| 26 | `.env.template`, README, informe, bitácora, prueba con el cliente | Documentación | `README.md`, `docs/` | 🟡 | Hito 1 / 4 |
| — | *Extra del cliente:* francés como idioma principal + español | i18next + expo-localization; selector FR/ES en el Drawer, persistido | `src/i18n/`, `LanguageSwitcher.tsx` | ✅ | `docs/evidencias/2026-11-03-*` |
