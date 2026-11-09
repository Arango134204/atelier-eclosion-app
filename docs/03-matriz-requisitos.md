# Matriz de requisitos (inicial)

Estados: ✅ cumplido · 🟡 parcial · ⏳ planeado (hito indicado)

| # | Requisito del documento | Función en la app | Pantalla / archivo | Estado | Evidencia |
| --- | --- | --- | --- | --- | --- |
| 1 | React Native + TypeScript + Expo (versiones de clase) | Base del proyecto, Expo SDK 57 | `package.json`, `package-lock.json` | ✅ | Hito 1 |
| 2 | Expo Router y separación por carpetas | Rutas en `src/app`, componentes, features, utils, theme | `src/` | ✅ | Hito 1 |
| 3 | Tipos para entidades, props y respuestas | `Product`, props tipadas; tipos Shopify en el hito 3 | `src/features/catalog/types/` | 🟡 | Hito 1 / 3 |
| 4 | Stack con función real | Detalle → Cotización → Coordenadas → Confirmación; la confirmación no permite volver atrás y regresa a Tabs | `src/app/_layout.tsx`, `src/app/request/` | ✅ | `docs/evidencias/2026-11-09-hito2-04…10` |
| 5 | Tabs | Catálogo, Favoritos, Mis solicitudes | `src/app/(drawer)/(tabs)/_layout.tsx` | ✅ | Hito 1 |
| 6 | Drawer | Inicio, El taller, La marca | `src/app/(drawer)/_layout.tsx` | ✅ | Hito 1 |
| 7 | Ruta dinámica + identificador inexistente | `product/[handle]` con estado "Esta pieza no existe" | `src/app/product/[handle].tsx` | ✅ | Hito 1 |
| 8 | NativeWind, colores, iconos, imágenes y fuente propia | Paleta de marca, Cormorant Garamond + Jost, Ionicons | `tailwind.config.js`, `src/app/_layout.tsx` | ✅ | Hito 1 |
| 9 | Carga de recursos y áreas seguras | `useFonts` + SplashScreen, `SafeAreaView` | `src/app/_layout.tsx`, `src/components/ui/Screen.tsx` | ✅ | Hito 1 |
| 10 | 3+ componentes reutilizables con props tipadas, usados | `Screen`, `AppButton`, `StateMessage`, `ProductCard`, `ProductGrid`, `FavoriteButton`, `QuantityStepper`, `Chip`, `SearchField`, `TextField`, `PriceRow`, `StatusBadge`, `RequestCard`, `BottomActionBar` | `src/components/` | ✅ | Hito 1 / 2 |
| 11 | Listas y tarjetas, búsqueda o filtro | Búsqueda por nombre (sin distinguir mayúsculas ni tildes) + filtro Todo / Aretes / Pulseras, contador de resultados y estado "sin resultados" | `src/app/(drawer)/(tabs)/index.tsx`, `useCatalogFilter.ts` | ✅ | `2026-11-09-hito2-01…03` |
| 12 | Indicadores de carga, vacíos y alternativa sin imagen | Estados vacíos y placeholder de imagen; carga en el hito 3 | `StateMessage`, `ProductCard` | 🟡 | Hito 1 / 3 |
| 13 | useState / useEffect con propósito | Fallback de imagen, ocultar el splash al cargar fuentes, sincronizar idioma, cantidad en el detalle, foco de los campos, barra de envío gratis animada | `ProductCard`, `_layout.tsx`, `useLanguageSync.ts`, `TextField`, `FreeShippingProgress` | ✅ | Hito 1 / 2 |
| 14 | Hook propio | `useLanguageSync`, `useQuote` y `useCatalogFilter`, cada uno con entradas, estado, efectos y resultado documentados; `useLocationTracking` en el hito 3 | `src/i18n/useLanguageSync.ts`, `src/features/quote/useQuote.ts`, `src/features/catalog/useCatalogFilter.ts` | ✅ | Hito 1 / 2 |
| 15 | Zustand para estado compartido | Idioma, favoritos (catálogo, detalle y pestaña Favoritos), solicitud en curso (Detalle → Cotización → Coordenadas) y solicitudes guardadas | `src/store/` | ✅ | `2026-11-09-hito2-01`, `-12` |
| 16 | Contador contextual con límites | Cantidad por pieza de 1 a 5; los botones se desactivan en los límites y el total se actualiza en vivo | `QuantityStepper`, Detalle, Cotización | ✅ | `2026-11-09-hito2-04` |
| 17 | Cálculo contextual validado | Subtotal + 15 % sur mesure + envío por zona (5/9/15 €), gratis desde 120 €; el largo sur mesure se valida por tipo de pieza (aretes 3–12 cm, pulsera 14–22 cm) y acepta coma decimal | `src/features/quote/`, `src/app/request/quote.tsx` | ✅ | `2026-11-09-hito2-05…07` |
| 18 | Formulario con validaciones | Nombre, correo, teléfono (mín. 8 dígitos) y mensaje (obligatorio en sur mesure); errores tras el primer envío y corrección en vivo; teclado adecuado y salto entre campos | `src/app/request/contact.tsx`, `validateContact.ts` | ✅ | `2026-11-09-hito2-08…10` |
| 19 | Axios: listado + detalle | Shopify `/products.json` y `/products/{handle}.json` | `src/services/api/` | ⏳ | Hito 3 |
| 20 | baseURL centralizada, interfaces y mapper | `shopify.mapper.ts` → `Product` | `src/features/catalog/api/` | ⏳ | Hito 3 |
| 21 | TanStack Query: queryKey, caché, estados, reintento | `useProducts`, `useProduct` | `src/features/catalog/hooks/` | ⏳ | Hito 3 |
| 22 | Mapa OSM + Leaflet en WebView con marcador del cliente | Taller en Mulhouse | `src/app/(drawer)/atelier.tsx` | ⏳ | Hito 3 |
| 23 | Permisos, centrar, activar/pausar/reanudar seguimiento, limpieza | `useLocationTracking` | El taller | ⏳ | Hito 3 |
| 24 | Persistencia tras cerrar la app | Hoy: favoritos y solicitudes en el teléfono (AsyncStorage), verificado tras cerrar la app. Hito 4: solicitudes en Firestore | Mis solicitudes, Favoritos | 🟡 | `2026-11-09-hito2-11` |
| 25 | Sin conexión / sin confirmaciones falsas | Detección de red y errores de envío | Formulario | ⏳ | Hito 4 |
| 26 | `.env.template`, README, informe, bitácora, prueba con el cliente | Documentación | `README.md`, `docs/` | 🟡 | Hito 1 / 4 |
| — | *Extra del cliente:* francés como idioma principal + español | i18next + expo-localization; selector FR/ES en el Drawer, persistido | `src/i18n/`, `LanguageSwitcher.tsx` | ✅ | `docs/evidencias/2026-11-03-*` |
