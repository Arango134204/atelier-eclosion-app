# Configurar Firebase (Hito 4)

Autor: Juan José Arango Jaramillo

## Pasos (≈ 10 min)

1. Entra a [Firebase Console](https://console.firebase.google.com) con tu cuenta Google.
2. **Agregar proyecto** → nombre sugerido: `atelier-eclosion-bijoux` → desactiva Google Analytics si no lo necesitas.
3. En el proyecto: **Crear una aplicación Web** (`</>`) → apodo `eclosion-app`.
4. Copia el objeto `firebaseConfig` que muestra la consola.
5. En la raíz del repo: copia `.env.template` a `.env` y pega los valores:

```env
EXPO_PUBLIC_FIREBASE_API_KEY=...
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=...
EXPO_PUBLIC_FIREBASE_PROJECT_ID=...
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=...
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
EXPO_PUBLIC_FIREBASE_APP_ID=...
```

6. En la consola: **Build → Firestore Database → Crear base de datos** → modo de prueba (o usa las reglas de `firestore.rules`).
7. Publica las reglas de `firestore.rules` (pestaña Reglas) para permitir escritura en `requests`.
8. Reinicia Expo (`npx expo start -c`) para que cargue el `.env`.

## Comportamiento de la app

- Con Firebase configurado **y** conexión: la solicitud se guarda en el teléfono y se envía a Firestore (`status: sent`).
- Sin Firebase, sin red o si falla el envío: se guarda solo en el teléfono (`status: saved`) y el mensaje de confirmación lo dice con claridad (sin confirmaciones falsas).

## Límite conocido

Las reglas abiertas son válidas para la entrega académica. Antes de producción hay que exigir autenticación o un backend intermedio.
