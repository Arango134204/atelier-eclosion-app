# Informe final — Éclosion Bijoux

**Asignatura:** Desarrollo Móvil II (UAM)  
**Autor:** Juan José Arango Jaramillo  
**Cliente:** Atelier Éclosion Bijoux (Mulhouse, Francia)  
**Stack:** React Native · TypeScript · Expo SDK 57  
**Repositorio:** https://github.com/Arango134204/atelier-eclosion-app

---

## 1. Generalidades

### 1.1 Propósito del sistema

Aplicación móvil que permite a las clientas explorar el catálogo artesanal real de Atelier Éclosion Bijoux, cotizar piezas (incluidas personalizaciones *sur mesure*) y registrar solicitudes en el dispositivo para consultarlas después.

### 1.2 Definición del problema

Hoy los encargos se negocian por Instagram/WhatsApp: mensajes dispersos, precios poco claros hasta que la artesana responde, y sin registro único de solicitudes ni forma sencilla de ubicar el taller.

### 1.3 Solución

App Expo con:

1. Catálogo HTTP desde la API pública Shopify del cliente.
2. Cotización con reglas explícitas (cantidad, sur mesure, envío).
3. Formulario validado y persistencia local (AsyncStorage): las solicitudes se conservan al cerrar y reabrir la app.
4. Mapa del taller (OpenStreetMap + Leaflet) con ubicación del dispositivo.

### 1.4 Stakeholders

| Actor | Rol | Prioridad |
| --- | --- | --- |
| Clienta | Explora, cotiza y solicita piezas | Alta |
| Artesana | Dueña del negocio; fuera de la app en esta entrega (sin sincronización entre dispositivos) | Media |
| Equipo académico | Evalúa cobertura de temas del curso | Media |

### 1.5 Justificación

Digitaliza el proceso de solicitud sin sustituir el oficio artesanal: da transparencia de precio estimado y centraliza pedidos, manteniendo francés como idioma de marca y español para el equipo/evaluación.

---

## 2. Requerimientos

### 2.1 Funcionales (resumen)

| ID | Requisito | Estado |
| --- | --- | --- |
| RF01 | Catálogo remoto (listado + detalle) | Cumplido |
| RF02 | Búsqueda y filtro por tipo | Cumplido |
| RF03 | Favoritos persistentes | Cumplido |
| RF04 | Contador 1–5 y total en vivo | Cumplido |
| RF05 | Cotización sur mesure + envío | Cumplido |
| RF06 | Formulario de contacto validado | Cumplido |
| RF07 | Persistencia de solicitudes | Cumplido (AsyncStorage en el teléfono) |
| RF08 | Mapa del taller + GPS | Cumplido |
| RF09 | i18n FR/ES | Cumplido |

### 2.2 No funcionales

- Tipado estricto TypeScript; sin `any` como solución general.
- UI con NativeWind, tipografías Cormorant Garamond + Jost, paleta de marca.
- Sin confirmaciones falsas de envío.
- Variables sensibles solo vía `.env` (plantilla en `.env.template`).

La matriz completa está en `docs/03-matriz-requisitos.md`.

---

## 3. Arquitectura

### 3.1 Visión global

```mermaid
flowchart LR
  Clienta -->|Expo Go / Android| App[App Éclosion]
  App -->|Axios| Shopify[Shopify products.json]
  App -->|Zustand + AsyncStorage| Local[(Teléfono)]
  App -->|Firestore JS SDK| Fire[(Firebase)]
  App -->|WebView Leaflet| OSM[OpenStreetMap]
  App -->|expo-location| GPS[GPS dispositivo]
  Artesana -.->|Consola Firebase| Fire
```

### 3.2 Capas

```mermaid
flowchart TB
  UI[src/app pantallas Expo Router]
  Comp[src/components]
  Feat[src/features dominio]
  Store[src/store Zustand]
  Svc[src/services HTTP + Firebase]
  UI --> Comp
  UI --> Feat
  UI --> Store
  Feat --> Svc
  Store --> Svc
```

---

## 4. Diseño detallado — diagramas UML

### 4.1 Casos de uso

```mermaid
flowchart LR
  Clienta((Clienta))
  Clienta --> UC1[Explorar catálogo]
  Clienta --> UC2[Buscar / filtrar]
  Clienta --> UC3[Marcar favorito]
  Clienta --> UC4[Ver detalle]
  Clienta --> UC5[Cotizar solicitud]
  Clienta --> UC6[Enviar formulario]
  Clienta --> UC7[Consultar mis solicitudes]
  Clienta --> UC8[Ver mapa del taller]
  Clienta --> UC9[Cambiar idioma FR/ES]
  Artesana((Artesana)) -.-> UC6
```

### 4.2 Diagrama de clases (dominio)

```mermaid
classDiagram
  class Product {
    +string id
    +string handle
    +string name
    +ProductType type
    +number price
    +string currency
    +string imageUrl
  }
  class QuoteBreakdown {
    +number subtotal
    +number surMesureFee
    +number shipping
    +number total
    +number remainingForFreeShipping
  }
  class ContactDetails {
    +string name
    +string email
    +string phone
    +string message
  }
  class SavedRequest {
    +string id
    +string number
    +string createdAt
    +string productHandle
    +number quantity
    +boolean surMesure
    +RequestStatus status
  }
  SavedRequest --> Product : referencia handle
  SavedRequest --> QuoteBreakdown
  SavedRequest --> ContactDetails
```

### 4.3 Diagrama de componentes

```mermaid
flowchart TB
  subgraph app [Aplicación]
    Router[Expo Router]
    UI[Componentes UI]
    Hooks[Hooks useQuote / useProducts / useLocationTracking]
    Zustand[Stores Zustand]
    Query[TanStack Query]
  end
  subgraph externos [Externos]
    Shopify
    Firestore
    OSM
  end
  Router --> UI
  UI --> Hooks
  Hooks --> Query
  Hooks --> Zustand
  Query --> Shopify
  Zustand --> Firestore
  UI --> OSM
```

### 4.4 Diagrama de despliegue

```mermaid
flowchart TB
  Dev[PC desarrollador] -->|Metro bundler| ExpoGo[Expo Go en Android]
  ExpoGo --> ShopifyAPI[ateliereclosionbijoux.com]
  ExpoGo --> FirebaseCloud[Firebase Firestore]
  ExpoGo --> TileServer[tile.openstreetmap.org]
  GitHub[GitHub repo público] -.-> Dev
```

### 4.5 Diagrama de actividades — proceso principal

```mermaid
flowchart TD
  A[Abrir catálogo] --> B{¿Carga OK?}
  B -->|No| B1[Mostrar error + reintentar]
  B -->|Sí| C[Buscar / filtrar / favorito]
  C --> D[Abrir detalle]
  D --> E[Ajustar cantidad 1-5]
  E --> F[Composer ma demande]
  F --> G[Devis: sur mesure + envío]
  G --> H{¿Cotización válida?}
  H -->|No| G
  H -->|Sí| I[Formulario contacto]
  I --> J{¿Formulario válido?}
  J -->|No| I
  J -->|Sí| K[Guardar local]
  K --> L{¿Online + Firebase?}
  L -->|Sí| M[Enviar Firestore status sent]
  L -->|No| N[status saved + aviso honesto]
  M --> O[Confirmación]
  N --> O
  O --> P[Mis solicitudes]
```

### 4.6 Diagrama de secuencia — cotizar y enviar

```mermaid
sequenceDiagram
  participant U as Clienta
  participant D as Detalle
  participant Q as useQuote
  participant C as Contacto
  participant S as requests.store
  participant F as Firestore
  U->>D: Elegir cantidad y Composer
  D->>S: start draft
  U->>Q: Ajustar sur mesure / zona
  Q-->>U: Breakdown en vivo
  U->>C: Datos de contacto
  C->>C: validateContact
  C->>S: add local
  C->>F: persistRequestRemote
  alt OK
    F-->>C: sent
    C->>S: markSent
  else Offline / sin config
    F-->>C: error / skip
    Note over C: Mensaje localNote
  end
  C-->>U: Confirmación
```

### 4.7 Modelo de datos Firestore

```mermaid
erDiagram
  REQUESTS {
    string id PK
    string localId
    string number
    string createdAt
    string productHandle
    string productName
    number quantity
    boolean surMesure
    number customLengthCm
    string shippingZone
    map quote
    map contact
    string status
  }
```

---

## 5. Mapa de pantallas

Ver `docs/02-mapa-pantallas.md`. Navegación: **Drawer** (Inicio, Taller, Marca) + **Tabs** (Creaciones, Favoritos, Solicitudes) + **Stack** (Detalle → Devis → Coordenadas → Confirmación).

---

## 6. Organización del código

```
src/app/                 Rutas Expo Router
src/components/          UI reutilizable
src/features/catalog/    API Shopify, mapper, hooks Query
src/features/quote/      Reglas y cálculo
src/features/request/    Validación de contacto
src/features/atelier/    Mapa + GPS
src/store/               Zustand (idioma, favoritos, draft, requests)
src/services/            HTTP Axios + Firebase
docs/                    Alcance, matriz, bitácora, informe, evidencias
```

---

## 7. Reglas de negocio

Centralizadas en `src/features/quote/quote.rules.ts` (provisionales, pendientes de confirmación con la clienta):

- Cantidad 1–5
- Sur mesure +15 %
- Envío FR 5 € / UE 9 € / INT 15 €; gratis desde 120 €
- Largo aretes 3–12 cm; pulseras 14–22 cm

---

## 8. Pruebas y evidencias

- Hito 1–2: `docs/evidencias/2026-11-03-*` y `2026-11-09-hito2-*`
- Flujo verificado en emulador Android (Expo Go SDK 57)
- Persistencia local tras `force-stop`
- Typecheck: `npm run typecheck`

### Prueba con usuario representativo

| Campo | Registro |
| --- | --- |
| Fecha | 2026-11-19 |
| Usuario | Representativo (equipo) — Juan José Arango Jaramillo |
| Tarea | Solicitar Peonia × 2 sur mesure 7,5 cm envío UE |
| Resultado | Cotización 112,50 €; solicitud ÉC-0001 guardada |
| Dificultad | Coordenadas exactas del taller pendientes de la clienta |
| Ajuste | Mensajes honestos sent/saved; mapa con leyenda atelier/tú |

---

## 9. Límites conocidos

1. Coordenadas del taller = centro de Mulhouse hasta confirmar dirección.
2. Las solicitudes no se sincronizan entre dispositivos (persistencia local deliberada; el enunciado no exige nube si no se promete intercambio).
3. Catálogo depende de la API pública Shopify (puede rate-limitar).
4. No hay pagos ni autenticación (fuera de alcance).
5. Firestore queda documentado como mejora opcional, no como requisito de entrega.

---

## 10. Conclusión

El proceso principal queda cerrado de punta a punta con los temas obligatorios del curso (navegación, estado, HTTP, mapa, persistencia local y documentación).
