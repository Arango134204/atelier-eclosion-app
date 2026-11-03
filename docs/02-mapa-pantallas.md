# Mapa de pantallas

```mermaid
flowchart TD
    Root["Stack raíz (src/app/_layout.tsx)"] --> Drawer["Drawer (src/app/(drawer)/_layout.tsx)"]
    Root --> Detail["Detalle de pieza<br/>product/[handle]"]
    Root --> NotFound["+not-found"]

    Drawer --> Tabs["Tabs (src/app/(drawer)/(tabs)/_layout.tsx)"]
    Drawer --> Atelier["El taller — mapa"]
    Drawer --> About["La marca"]

    Tabs --> Catalog["Catálogo"]
    Tabs --> Favorites["Favoritos"]
    Tabs --> Requests["Mis solicitudes"]

    Catalog -->|toca una tarjeta| Detail
    Favorites -->|toca una tarjeta| Detail
    Detail -->|"Solicitar (hito 2)"| Quote["Cotización"]
    Quote --> Form["Formulario de solicitud"]
    Form --> Confirm["Confirmación"]
    Confirm --> Requests
```

| Navegador | Función real | Pantallas |
| --- | --- | --- |
| **Stack** | Flujo del pedido y retroceso | Detalle → Cotización → Formulario → Confirmación |
| **Tabs** | Secciones frecuentes | Catálogo, Favoritos, Mis solicitudes |
| **Drawer** | Accesos complementarios | Inicio, El taller (mapa), La marca |

**Estado al cierre del hito 1:** Stack, Tabs, Drawer, la ruta dinámica `product/[handle]` (incluido el identificador
inexistente) y la pantalla 404 ya funcionan. Cotización, formulario y confirmación se agregan en el hito 2.
