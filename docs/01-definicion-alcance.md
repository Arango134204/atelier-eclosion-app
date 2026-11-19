# Hito 1 — Definición y alcance

## Cliente

**Atelier Éclosion Bijoux** — taller de joyería artesanal de autor en Mulhouse (Francia). Cada pieza se teje a mano,
perla a perla, con inspiración colombiana y se produce en pequeñas series. Vende hoy por su tienda web
([ateliereclosionbijoux.com](https://ateliereclosionbijoux.com), Shopify) y por mensajes directos.

- **Usuario principal:** clienta final que quiere comprar una pieza del catálogo o encargar una personalizada.
- **Usuario secundario:** la artesana, que recibe y gestiona las solicitudes.

## Problema actual

| Hoy | Con la app |
| --- | --- |
| Los encargos personalizados (colores, largo, cantidades) se negocian por Instagram/WhatsApp, con mensajes dispersos. | La clienta arma su solicitud dentro de la app con la pieza, la variante, la cantidad y sus notas. |
| La clienta no sabe cuánto costará una personalización hasta que la artesana responde. | La app calcula una cotización estimada con reglas explícitas. |
| La artesana pierde el rastro de qué pidió quién y en qué estado está. | Las solicitudes quedan guardadas en el teléfono de la clienta, con número y estado, y se pueden volver a consultar. |
| Para saber dónde ver o recoger las piezas hay que preguntar. | Mapa del taller con la ubicación de la clienta. |

**Beneficio esperado:** menos ida y vuelta de mensajes, precios claros antes de pedir y un registro único de solicitudes.

## Proceso principal (de principio a fin)

**Solicitar una pieza (pedido o sur mesure):**

1. Explorar el catálogo real (datos HTTP de la tienda Shopify) con búsqueda y filtro por colección.
2. Abrir el detalle de una pieza (ruta dinámica `product/[handle]`).
3. Elegir variante (color) y **cantidad** (contador con límites 1–5).
4. Ver la **cotización**: precio × cantidad + recargo de personalización + envío según destino.
5. Llenar el **formulario** de solicitud (nombre, email, teléfono, notas) con validaciones.
6. Guardar: la solicitud se conserva en el **teléfono** (AsyncStorage) y aparece en "Mis solicitudes" con su estado.

### Datos que entran

Pieza seleccionada, variante, cantidad, opción de personalización, país de envío y datos de contacto.

### Reglas de negocio (borrador para acordar con la clienta)

- La cantidad va de 1 a 5 por pieza. Si la variante reporta menos stock, el máximo es ese stock.
- Recargo sur mesure: +15 % sobre el subtotal si se piden colores o largo distintos.
- Largo sur mesure: aretes de 3 a 12 cm, pulseras de 14 a 22 cm; acepta decimales con coma ("7,5").
- Envío: Francia 5 €, Unión Europea 9 €, internacional 15 €. Gratis desde 120 € (subtotal + recargo).
- Total = subtotal + recargo + envío. No se permiten cantidades negativas, vacías ni no numéricas.
- Email con formato válido y teléfono con al menos 8 dígitos. Las notas son obligatorias si es sur mesure.

### Resultado para el usuario

Una solicitud confirmada con número, total estimado y estado (`enviada` → `en revisión` → `confirmada`).

## Funciones complementarias

1. **Favoritos** — guardar piezas (Zustand con persistencia) y pasar de favoritos a solicitud.
2. **El taller** — mapa OpenStreetMap/Leaflet con el taller en Mulhouse, ubicación del dispositivo y seguimiento.
3. **Búsqueda y filtro** — por nombre y por colección (`jardin-andino`, `jardin-de-luz`, `bracelets`).

## Fuente de datos remota

API pública de la tienda Shopify del cliente (sin credenciales):

| Uso | Endpoint |
| --- | --- |
| Listado | `GET https://ateliereclosionbijoux.com/products.json` |
| Detalle por identificador | `GET https://ateliereclosionbijoux.com/products/{handle}.json` |
| Productos de una colección | `GET https://ateliereclosionbijoux.com/collections/{handle}/products.json` |
| Colecciones | `GET https://ateliereclosionbijoux.com/collections.json` |

Persistencia de solicitudes: **AsyncStorage** en el dispositivo (se consultan tras cerrar y reabrir la app). No se promete sincronización entre dispositivos; una nube (p. ej. Firestore) quedaría como mejora futura.

## Fuera de alcance

Pagos en línea, autenticación, seguimiento en segundo plano y cálculo de rutas.
