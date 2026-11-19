import { ATELIER_LOCATION } from './atelier.location';

interface MapHtmlOptions {
  device?: { latitude: number; longitude: number } | null;
  /** Idioma de las etiquetas del mapa. */
  language: 'fr' | 'es';
}

const LABELS = {
  fr: { atelier: 'Atelier', you: 'Vous' },
  es: { atelier: 'Taller', you: 'Tú' },
} as const;

/** HTML autónomo con Leaflet + OpenStreetMap para cargar en un WebView. */
export function buildAtelierMapHtml({ device, language }: MapHtmlOptions): string {
  const labels = LABELS[language];
  const atelier = ATELIER_LOCATION;
  const deviceJs = device
    ? `L.marker([${device.latitude}, ${device.longitude}], { icon: youIcon }).addTo(map).bindPopup(${JSON.stringify(labels.you)});
       bounds.extend([${device.latitude}, ${device.longitude}]);`
    : '';

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
  <style>
    html, body, #map { height: 100%; margin: 0; background: #FAF6F0; }
    .leaflet-container { font-family: system-ui, sans-serif; }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const map = L.map('map', { zoomControl: true }).setView([${atelier.latitude}, ${atelier.longitude}], 14);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const atelierIcon = L.divIcon({
      className: '',
      html: '<div style="width:18px;height:18px;border-radius:50%;background:#BC7C1C;border:3px solid #570A04;box-shadow:0 1px 4px rgba(0,0,0,.35)"></div>',
      iconSize: [18, 18],
      iconAnchor: [9, 9]
    });
    const youIcon = L.divIcon({
      className: '',
      html: '<div style="width:16px;height:16px;border-radius:50%;background:#1F1A17;border:3px solid #FFFDF9;box-shadow:0 1px 4px rgba(0,0,0,.35)"></div>',
      iconSize: [16, 16],
      iconAnchor: [8, 8]
    });

    const atelierMarker = L.marker([${atelier.latitude}, ${atelier.longitude}], { icon: atelierIcon })
      .addTo(map)
      .bindPopup(${JSON.stringify(`${labels.atelier} — ${atelier.city}`)});
    const bounds = L.latLngBounds([[${atelier.latitude}, ${atelier.longitude}]]);
    ${deviceJs}
    if (bounds.isValid()) map.fitBounds(bounds.pad(0.35));
    setTimeout(() => map.invalidateSize(), 200);
  </script>
</body>
</html>`;
}
