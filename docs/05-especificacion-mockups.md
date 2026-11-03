# Especificación de mockups (Figma)

Guía para construir los mockups de alta fidelidad en Figma. Los valores coinciden con los del código
(`tailwind.config.js`, `src/theme/colors.ts`), así que lo que se diseñe aquí se puede implementar tal cual.

**Dirección visual:** boutique de joyería editorial. Fondo marfil y mucho aire, con las fotos de las piezas como
protagonistas. El dorado se usa como acento, nunca como relleno grande, y el burdeos solo en detalles. El motivo
gráfico son los **rayos de sol del logo** ("éclosion" = florecer, abrirse).

---

## 1. Preparar el archivo

1. Crear el archivo **"Éclosion Bijoux — App"** con cuatro páginas: `🎨 Fundamentos`, `🧩 Componentes`,
   `📱 Pantallas`, `▶️ Prototipo`.
2. **Frame base:** Android Compact, **360 × 800**. Para la presentación, duplicar algunas pantallas en
   iPhone 15 (**393 × 852**).
3. **Layout grid:** 4 columnas, margen 24, gutter 16. Grid vertical de 8 pt (todos los espacios son múltiplos de 4 u 8).
4. **Fuentes:** Cormorant Garamond y Jost vienen incluidas en Figma (Google Fonts). No hay que instalar nada.
5. **Logo:** importar `assets/brand/logo-original.png` (PNG transparente).
6. **Fotos:** usar las imágenes reales de la tienda (las URLs están en `src/features/catalog/data/catalog.seed.ts`).
   Arrastrarlas desde el navegador o usar el plugin "Image from URL".

---

## 2. Fundamentos (página 🎨)

### Colores — crear como *Color Styles* o *Variables*

| Nombre | Hex | Uso |
| --- | --- | --- |
| `ivoire` | `#FAF6F0` | Fondo general |
| `porcelaine` | `#FFFDF9` | Tarjetas elevadas, campos |
| `lin` | `#F1E9DD` | Fondos de imagen, bloques destacados |
| `sable` | `#E6DACA` | Hover / pressed |
| `grege` | `#D9CCBB` | Líneas finas y bordes |
| `encre` | `#1F1A17` | Texto principal, botón primario |
| `taupe` | `#6E625A` | Texto secundario |
| `taupe-clair` | `#9A8E84` | Placeholder, iconos inactivos |
| `or` | `#BC7C1C` | **Del logo.** Precios, eyebrows, acentos |
| `or-pale` | `#EED9B6` | Fondos de chips seleccionados |
| `bordeaux` | `#570A04` | **Del logo.** Favorito activo, estados "ediciones limitadas" |
| `erreur` | `#B3261E` | Errores de formulario |

### Tipografía — crear como *Text Styles*

| Estilo | Fuente | Tamaño / interlineado | Tracking | Uso |
| --- | --- | --- | --- | --- |
| Display | Cormorant Garamond Regular | 40 / 44 | -1 % | Título de pantalla destacado |
| Title L | Cormorant Garamond Regular | 34 / 40 | 0 | Nombre de la pieza en el detalle |
| Title M | Cormorant Garamond Medium | 24 / 30 | 0 | Títulos de sección, headers |
| Title S | Cormorant Garamond Medium | 20 / 26 | 0 | Nombre en tarjeta |
| Accent | Cormorant Garamond Italic | 18 / 26 | 0 | Frases de marca, citas |
| Body | Jost Light | 16 / 26 | 0 | Párrafos |
| Body S | Jost Regular | 14 / 22 | 0 | Precios, texto de apoyo |
| Label | Jost Medium · MAYÚSCULAS | 12 / 16 | +20 % | Eyebrows, botones, tabs |
| Caption | Jost Medium · MAYÚSCULAS | 11 / 14 | +15 % | Tipo de pieza en tarjeta |

### Formas, sombras y espacios

- **Radios:** 2 px en botones y chips, 4 px en tarjetas e imágenes, 16 px en bottom sheets. Nada de esquinas muy
  redondeadas: el lenguaje es arquitectónico, no "bubbly".
- **Sombras:** casi ninguna. Solo en el bottom sheet y el botón flotante: `y 8, blur 24, #1F1A17 al 8 %`.
- **Líneas:** 1 px `grege` como separadores.
- **Espacios clave:** margen lateral 24 · entre secciones 48 · entre tarjetas 16 (horizontal) y 32 (vertical).

### Motivo gráfico

Recortar del logo un abanico de rayos (sin el texto) y usarlo:
- como marca de agua muy sutil (opacidad 6 %) detrás de los encabezados,
- como separador de sección: tres rayos pequeños en dorado entre dos líneas finas,
- en el estado vacío: medio sol en `or` al 40 %.

---

## 3. Componentes (página 🧩) — crear con variantes

| Componente | Variantes | Especificación |
| --- | --- | --- |
| **Button** | `primary` · `secondary` · `text` × `default` · `pressed` · `disabled` · `loading` | Alto 52, padding horizontal 28, texto Label. Primary: fondo `encre`, texto `ivoire`. Secondary: borde 1 px `encre`. Loading: tres puntos dorados. |
| **ProductCard** | `default` · `pressed` · `sin imagen` · `favorito` | Imagen 4:5 radio 4, corazón arriba a la derecha (32 × 32, fondo `ivoire` 80 %). Debajo: Caption `taupe` → Title S → Body S `or`. |
| **Chip** (filtro) | `off` · `on` | Alto 36, borde `grege`. On: fondo `encre`, texto `ivoire`. |
| **SearchField** | `vacío` · `con texto` · `focus` | Alto 48, solo línea inferior, icono lupa `taupe-clair`. |
| **TextField** | `default` · `focus` · `error` · `disabled` | Label arriba (Label `taupe`), texto Body, línea inferior 1 px → 1.5 px `encre` en focus → `erreur` + mensaje en error. |
| **QuantityStepper** | `1` · `medio` · `máximo` | Botones − / + de 44 × 44 con borde `grege`; número al centro en Title M. En el máximo, el + queda deshabilitado y aparece la nota "Máx. 5". |
| **ColorSwatch** | `off` · `on` · `agotado` | Círculo de 28 con anillo de 2 px `encre` cuando está seleccionado; tachado diagonal si está agotado. |
| **StatusBadge** | `envoyée` · `en cours` · `confirmée` · `annulée` | Caption sobre fondos: `lin` · `or-pale` · verde muy suave · `sable`. |
| **StateMessage** | `vacío` · `error` · `sin conexión` · `no encontrado` | Icono o medio sol, Title M, Body `taupe` y botón secondary opcional. |
| **LanguageSwitcher** | `FR` · `ES` | Control segmentado de 2 opciones, borde `grege`; la opción activa con fondo `encre`. |
| **TabBar** / **Header** | — | Header: menú ☰ · logo (alto 40) · espacio. Tabs: Créations · Favoris · Mes demandes. |

---

## 4. Pantallas (página 📱)

Textos en **francés** (idioma principal). Hacer además una versión en español de 2 o 3 pantallas para mostrar el
cambio de idioma.

### 01 · Splash
Fondo `ivoire`, logo centrado (ancho 200). En la parte inferior, en Caption `taupe-clair`:
"MULHOUSE · INSPIRÉS DE LA COLOMBIE".

### 02 · Bienvenue (primera apertura) — *opcional, suma mucho a "enamorar"*
Foto a sangre de una pieza (60 % superior) con un degradado a `ivoire`. Debajo: Display "Révéler la lumière de
celle qui la porte", Accent "Tissés à la main, perle après perle", el LanguageSwitcher y el botón primary
"DÉCOUVRIR".

### 03 · Créations (catálogo)
- Header con logo.
- Eyebrow `or` "LES CRÉATIONS" + Display "Tissés à la main, perle après perle".
- SearchField "Rechercher une pièce".
- Chips horizontales: Tout · Jardin de Luz · Jardin Andino · Bracelets.
- Grilla de 2 columnas de ProductCard con las 9 piezas reales.
- **Variantes de la pantalla:** cargando (skeletons `lin` con brillo), búsqueda sin resultados, error con
  "Réessayer".

### 04 · Détail produit
- Carrusel de fotos a sangre (4:5) con indicador de puntos y corazón flotante.
- Caption "BOUCLES D'OREILLE" → Title L "Amapola" → precio Title M `or` "55,00 €".
- "Couleur": fila de ColorSwatch con el nombre de la variante debajo ("Bleu ciel").
- "Quantité": QuantityStepper.
- Texto artesanal (Body) + lista corta: "Perles Miyuki · Tissé à la main · ≈ 6 h de travail".
- **Barra fija inferior:** total en vivo a la izquierda ("Total 110,00 €") + botón primary "COMPOSER MA DEMANDE".

### 05 · Devis (cotización)
- Resumen de la pieza (miniatura, nombre, variante, cantidad).
- Toggle "Personnalisation sur mesure (+15 %)" que despliega un campo de notas.
- Selector de envío: France 5 € · Union européenne 9 € · International 15 €.
- Desglose con líneas finas: Sous-total · Sur mesure · Livraison · **Total** (Title M).
- Nota en `or`: "Livraison offerte dès 120 €" y una barra de progreso hacia ese monto.
- Botón "CONTINUER".

### 06 · Mes coordonnées (formulario)
Campos Nom, E-mail, Téléphone y Message. Mostrar una versión con errores ("Adresse e-mail invalide",
"Au moins 8 chiffres") y otra con el teclado abierto: el botón "ENVOYER MA DEMANDE" debe seguir visible.

### 07 · Confirmation
Medio sol dorado animado arriba, Title M "Merci, Camila", Body "Votre demande n° ÉC-0042 a bien été envoyée.
L'atelier vous répond sous 48 h.", resumen y botones "VOIR MES DEMANDES" / "CONTINUER MES DÉCOUVERTES".

### 08 · Favoris
Una versión vacía (StateMessage con medio sol) y otra con 3 tarjetas en grilla.

### 09 · Mes demandes
Lista de tarjetas horizontales: miniatura, nombre, fecha, total y StatusBadge. Incluir un banner de "Hors ligne"
arriba para el estado sin conexión.

### 10 · L'atelier (mapa)
- Mapa a pantalla completa (captura de OpenStreetMap de Mulhouse con tonos desaturados).
- Marcador del taller: pin `encre` con el sol dorado dentro. Ubicación del dispositivo: punto azul estándar
  (claramente distinto del taller).
- Bottom sheet: "Atelier Éclosion · Mulhouse", dirección, botones "Me localiser" y un control
  "Suivi : ▶ Activer / ⏸ Pause".
- **Variante:** permiso denegado, con StateMessage "Activez la localisation pour vous situer" + "OUVRIR LES
  RÉGLAGES", con el mapa del taller todavía visible detrás.

### 11 · La maison
Logo grande, historia de la marca, una foto del taller o de las manos tejiendo, y la firma en Accent.

### 12 · Drawer abierto
Logo + tagline arriba, ítems (Accueil, L'atelier, La maison) con iconos de línea y el LanguageSwitcher abajo.

---

## 5. Animaciones (página ▶️ Prototipo)

En Figma se prototipan con **Smart Animate**. Los mismos valores se implementan después con
`react-native-reanimated`.

| # | Momento | Animación | Duración / curva |
| --- | --- | --- | --- |
| 1 | Splash → Créations | El sol dorado sube y el burdeos baja (se "abren"), el texto aparece, y todo hace fundido al catálogo | 900 ms · ease-out |
| 2 | Entrada del catálogo | Tarjetas aparecen escalonadas (opacidad 0 → 1, y +16 → 0) | 400 ms c/u, 60 ms de desfase |
| 3 | Tarjeta → Détail | **Shared element:** la foto crece desde la tarjeta hasta el carrusel | 450 ms · ease-in-out |
| 4 | Favorito | El corazón se rellena de `bordeaux` con un "pop" (escala 1 → 1.25 → 1) | 300 ms · spring |
| 5 | QuantityStepper | El número sale hacia arriba y el nuevo entra desde abajo; el total se actualiza contando | 220 ms |
| 6 | Toggle sur mesure | El campo de notas se despliega con altura y opacidad | 280 ms · ease-out |
| 7 | Confirmación | Los rayos del sol se dibujan uno por uno y aparece el check | 800 ms |
| 8 | Presionar un botón | Escala 0.97 | 120 ms |
| 9 | Cambio de idioma | Fundido cruzado del texto | 200 ms |

**Reglas:** nada de animaciones en bucle ni decorativas sin propósito. Si el teléfono tiene activado "reducir
movimiento", se reemplazan por fundidos simples.

**Flujo del prototipo para la presentación:** Splash → Créations → toque en "Amapola" → Détail (elegir color y
cantidad 2) → Devis (activar sur mesure, elegir France) → Formulaire → Confirmation → Mes demandes.

---

## 6. Checklist antes de presentar

- [ ] Todas las pantallas usan los estilos de color y texto (nada de valores sueltos).
- [ ] Hay estados vacíos, de carga, de error y de "no encontrado".
- [ ] Contraste legible: texto `taupe` sobre `ivoire` mínimo 14 px.
- [ ] Áreas táctiles de 44 × 44 como mínimo.
- [ ] El formulario sigue visible con el teclado abierto.
- [ ] Versión FR completa + 2 o 3 pantallas en ES.
- [ ] Prototipo navegable con el flujo principal completo.
