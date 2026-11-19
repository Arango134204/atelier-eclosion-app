from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.shared import Cm, Pt, RGBColor

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "docs" / "Informe_Final_Eclosion_Bijoux.docx"

doc = Document()
for section in doc.sections:
    section.top_margin = Cm(2)
    section.bottom_margin = Cm(2)
    section.left_margin = Cm(2.5)
    section.right_margin = Cm(2.5)


def heading(text: str, level: int = 1) -> None:
    p = doc.add_heading(text, level=level)
    for run in p.runs:
        run.font.color.rgb = RGBColor(0x1F, 0x1A, 0x17)


def para(text: str) -> None:
    p = doc.add_paragraph()
    run = p.add_run(text)
    run.font.name = "Calibri"
    run.font.size = Pt(11)


def bullets(items: list[str]) -> None:
    for item in items:
        doc.add_paragraph(item, style="List Bullet")


title = doc.add_paragraph()
title.alignment = WD_ALIGN_PARAGRAPH.CENTER
r = title.add_run("ÉCLOSION BIJOUX")
r.bold = True
r.font.size = Pt(28)
r.font.color.rgb = RGBColor(0xBC, 0x7C, 0x1C)

sub = doc.add_paragraph()
sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
sr = sub.add_run("Informe técnico del proyecto final\nDesarrollo Móvil II — UAM")
sr.font.size = Pt(14)

meta = doc.add_paragraph()
meta.alignment = WD_ALIGN_PARAGRAPH.CENTER
mr = meta.add_run(
    "\nAutor: Juan José Arango Jaramillo\n"
    "Cliente: Atelier Éclosion Bijoux (Mulhouse, Francia)\n"
    "Stack: React Native · TypeScript · Expo SDK 57\n"
    "Repositorio: https://github.com/Arango134204/atelier-eclosion-app\n"
    "Fecha: noviembre 2026"
)
mr.font.size = Pt(11)

doc.add_page_break()

heading("1. Generalidades")
heading("1.1 Propósito del sistema", 2)
para(
    "Aplicación móvil que permite a las clientas explorar el catálogo artesanal real de "
    "Atelier Éclosion Bijoux, cotizar piezas (incluidas personalizaciones sur mesure) y "
    "registrar solicitudes consultables por la artesana."
)
heading("1.2 Definición del problema", 2)
para(
    "Hoy los encargos se negocian por Instagram/WhatsApp: mensajes dispersos, precios poco "
    "claros hasta que la artesana responde, y sin registro único de solicitudes ni forma "
    "sencilla de ubicar el taller."
)
heading("1.3 Solución final", 2)
bullets(
    [
        "Catálogo HTTP desde la API pública Shopify del cliente (Axios + TanStack Query + mapper).",
        "Cotización con reglas explícitas (cantidad, sur mesure, envío).",
        "Formulario validado y persistencia local + Firestore cuando está configurado.",
        "Mapa del taller (OpenStreetMap + Leaflet en WebView) con expo-location.",
        "Interfaz en francés con español seleccionable.",
    ]
)
heading("1.4 Stakeholders", 2)
table = doc.add_table(rows=4, cols=3)
table.style = "Table Grid"
for i, text in enumerate(["Actor", "Rol", "Prioridad"]):
    table.rows[0].cells[i].text = text
rows = [
    ("Clienta", "Explora, cotiza y solicita piezas", "Alta"),
    ("Artesana", "Recibe/consulta solicitudes (Firestore)", "Alta"),
    ("Equipo académico", "Evalúa cobertura de temas del curso", "Media"),
]
for r_i, row in enumerate(rows, start=1):
    for c_i, val in enumerate(row):
        table.rows[r_i].cells[c_i].text = val

heading("1.5 Justificación", 2)
para(
    "Digitaliza el proceso de solicitud sin sustituir el oficio artesanal: da transparencia "
    "de precio estimado y centraliza pedidos."
)

heading("2. Requerimientos funcionales y no funcionales")
heading("2.1 Funcionales", 2)
bullets(
    [
        "RF01 Catálogo remoto (listado + detalle) — Cumplido",
        "RF02 Búsqueda y filtro por tipo — Cumplido",
        "RF03 Favoritos persistentes — Cumplido",
        "RF04 Contador 1–5 y total en vivo — Cumplido",
        "RF05 Cotización sur mesure + envío — Cumplido",
        "RF06 Formulario de contacto validado — Cumplido",
        "RF07 Persistencia de solicitudes (local + Firestore) — Cumplido",
        "RF08 Mapa del taller + GPS — Cumplido",
        "RF09 i18n FR/ES — Cumplido",
    ]
)
heading("2.2 No funcionales", 2)
bullets(
    [
        "Tipado estricto TypeScript.",
        "NativeWind, tipografías Cormorant Garamond + Jost, paleta de marca.",
        "Sin confirmaciones falsas de envío.",
        "Configuración externa vía .env.template.",
    ]
)
para("La matriz completa está en docs/03-matriz-requisitos.md.")

heading("3. Arquitectura del sistema")
para(
    "La app se organiza en pantallas (Expo Router), componentes, features de dominio, stores "
    "Zustand y servicios (HTTP Shopify + Firebase). El estado remoto del catálogo lo gestiona "
    "TanStack Query; el estado de sesión/solicitud lo gestiona Zustand."
)
para(
    "Los diagramas UML (visión global, casos de uso, clases, componentes, despliegue, "
    "actividades y secuencia) están en docs/06-informe-final.md en formato Mermaid."
)

heading("4. Diseño detallado")
heading("4.1 Casos de uso", 2)
bullets(
    [
        "Explorar catálogo / Buscar-filtrar / Favorito",
        "Ver detalle / Cotizar / Enviar formulario",
        "Consultar mis solicitudes / Ver mapa del taller / Cambiar idioma",
    ]
)
heading("4.2 Clases de dominio", 2)
para("Product, QuoteBreakdown, ContactDetails, SavedRequest.")
heading("4.3 Actividades del proceso principal", 2)
para(
    "Catálogo → Detalle → Devis → Coordenadas → Confirmación → Mis solicitudes, con ramas "
    "de error de red, validación y modo offline."
)
heading("4.4 Secuencia cotizar y enviar", 2)
para(
    "Detalle inicia el borrador; useQuote recalcula; Contacto valida, guarda en AsyncStorage "
    "e intenta Firestore; la confirmación distingue sent vs saved."
)

heading("5. Modelo de datos")
para(
    "Colección Firestore requests: localId, number, createdAt, productHandle, productName, "
    "quantity, surMesure, customLengthCm, shippingZone, quote, contact, status."
)
para("Persistencia local: AsyncStorage vía Zustand (favoritos, solicitudes, idioma).")

heading("6. Prototipos y evidencia")
para("Especificación de mockups: docs/05-especificacion-mockups.md. Capturas en docs/evidencias/.")

heading("7. Requisitos de implantación")
bullets(
    [
        "Node.js 20+",
        "Expo Go SDK 57 o emulador Android",
        "npm install && npx expo start",
        "Opcional: configurar Firebase según docs/firebase-setup.md",
        "API HTTP: https://ateliereclosionbijoux.com/products.json",
    ]
)

heading("8. Prueba con usuario representativo")
para(
    "Fecha: 2026-11-19. Usuario: Juan José Arango Jaramillo (representativo). "
    "Tarea: solicitar Peonia × 2 sur mesure 7,5 cm envío UE. "
    "Resultado: total 112,50 €; solicitud ÉC-0001. "
    "Ajuste: mensajes honestos sent/saved y leyenda del mapa."
)

heading("9. Límites conocidos")
bullets(
    [
        "Coordenadas del taller aproximadas (centro de Mulhouse) hasta confirmar dirección.",
        "Firestore requiere .env; sin él la app opera en modo local.",
        "Reglas Firestore abiertas solo para entrega académica.",
        "Fuera de alcance: pagos y autenticación.",
    ]
)

heading("10. Conclusión")
para(
    "El proceso principal queda cerrado con los temas obligatorios del curso. "
    "El siguiente valor de producto es confirmar reglas con la clienta y endurecer seguridad de Firestore."
)

doc.save(OUT)
print(f"Wrote {OUT}")
