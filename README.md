# Éclosion Bijoux — app móvil

Aplicación para **Atelier Éclosion Bijoux**, joyería artesanal tejida a mano (Mulhouse, Francia). Permite explorar el catálogo real de la tienda, cotizar piezas o encargos *sur mesure* y registrar solicitudes.

**Proyecto final — Desarrollo Móvil II (UAM)**  
**Autor:** Juan José Arango Jaramillo  
**Stack:** React Native · TypeScript · Expo SDK 57  
**Repositorio:** https://github.com/Arango134204/atelier-eclosion-app

## Requisitos

- Node.js 20 o superior
- Android: **Expo Go** (SDK 57) o emulador de Android Studio

## Instalación y ejecución

```bash
npm install
cp .env.template .env   # en Windows: copy .env.template .env
npx expo start          # escanear QR con Expo Go
npx expo start --android
```

### Probar el proceso principal en Android

1. Abrir la app → pestaña **Créations**.
2. Buscar o filtrar una pieza → abrir detalle → ajustar cantidad → **Composer ma demande**.
3. En **Votre devis**: opcional sur mesure + zona de envío → **Continuer**.
4. Completar **Vos coordonnées** → guardar.
5. Ver la solicitud en **Mes demandes**.
6. En el menú ☰ → **L'atelier**: mapa, centrar y seguimiento GPS.

### Firebase (opcional pero recomendado)

Sin `.env` de Firebase la app funciona con persistencia local. Para que la artesana reciba solicitudes en la nube: `docs/firebase-setup.md`.

## Comandos útiles

```bash
npm run typecheck
powershell -ExecutionPolicy Bypass -File scripts/generate-brand-assets.ps1
python scripts/generate-informe-docx.py
```

## HTTP del cliente

| Uso | Endpoint |
| --- | --- |
| Listado | `GET https://ateliereclosionbijoux.com/products.json` |
| Detalle | `GET https://ateliereclosionbijoux.com/products/{handle}.json` |

Cliente Axios: `src/services/api/http.ts` · Mapper: `src/features/catalog/api/shopify.mapper.ts` · Hooks: `useProducts` / `useProduct`.

## Idiomas

Francés (marca) + español. Selector en el Drawer. Textos en `src/i18n/locales/`.

## Documentación

| Documento | Contenido |
| --- | --- |
| `docs/01-definicion-alcance.md` | Cliente, problema, reglas |
| `docs/02-mapa-pantallas.md` | Navegación |
| `docs/03-matriz-requisitos.md` | Cobertura del enunciado |
| `docs/04-bitacora.md` | Avances por clase |
| `docs/05-especificacion-mockups.md` | Spec Figma |
| `docs/06-informe-final.md` | Informe + diagramas Mermaid |
| `docs/Informe_Final_Eclosion_Bijoux.docx` | Informe Word (estilo Makumba) |
| `docs/firebase-setup.md` | Cómo crear el proyecto Firebase |
| `docs/evidencias/` | Capturas de prueba |

## Estructura

```
src/
├── app/                 Rutas (Drawer + Tabs + Stack)
├── components/          UI reutilizable
├── features/
│   ├── catalog/         API Shopify, mapper, Query
│   ├── quote/           Reglas y cálculo
│   ├── request/         Validación de contacto
│   └── atelier/         Mapa + GPS
├── store/               Zustand
├── services/            HTTP + Firebase
└── i18n/                FR / ES
```

## Límites conocidos

- Coordenadas del taller = centro de Mulhouse hasta confirmar dirección con la clienta.
- Firestore requiere variables en `.env` (ver plantilla).
- Reglas Firestore abiertas solo para entrega académica.
- Fuera de alcance: pagos y autenticación.
