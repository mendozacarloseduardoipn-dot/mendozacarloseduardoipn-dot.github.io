# Portafolio web · Carlos Eduardo Mendoza

Sitio estático (HTML, CSS y JavaScript sin librerías). No necesita instalar nada: abre `index.html` en el navegador para verlo.

## Estructura de carpetas

```
portafolio-carlos/
├── index.html                  ← la página principal
├── 404.html                    ← página de error
├── robots.txt / sitemap.xml    ← para Google
├── site.webmanifest            ← ícono al guardar en el celular
├── legal/
│   ├── aviso-de-privacidad.html
│   ├── terminos-de-uso.html
│   └── politica-de-cookies.html
└── assets/
    ├── css/main.css            ← todos los estilos
    ├── js/config.js            ← AQUÍ pones videos y CV
    ├── js/main.js              ← animaciones y línea de tiempo
    ├── docs/                   ← aquí va tu CV en PDF
    ├── videos/
    │   ├── cheyennes/
    │   ├── rompecintas/
    │   ├── jp-records/
    │   └── tiktok/             ← aquí van tus videos de @soy_jaca
    └── img/
        ├── carlos.webp         ← tu foto de portada
        ├── clientes/           ← logos de clientes
        └── proyectos/          ← mockups y portadas de videos
```

---

## Videos que ya están puestos

| Teléfono | Archivo |
|---|---|
| cheyennes-1 | `assets/videos/cheyennes/celebracion-nocturna.mp4` |
| cheyennes-2 | `assets/videos/cheyennes/reel-reclutamiento.mp4` |
| vic-1 | `assets/videos/rompecintas/vic-cuarto.mp4` |
| vic-2 | `assets/videos/rompecintas/vic-metro.mp4` |
| vic-3 | `assets/videos/rompecintas/vic-clausurado.mp4` |
| vic-4 | `assets/videos/rompecintas/vic-puebla.mp4` |
| jp-1 | `assets/videos/jp-records/disfruta-el-proceso.mp4` |
| tiktok-1, 2 y 3 | **Pendientes.** Muestran las vistas y el enlace al video en TikTok. Copia tus videos a `assets/videos/tiktok/` y escribe la ruta en `config.js` |

Se comprimieron a 576 px de ancho y 30 fps para que la página cargue rápido.

## Paso a paso: poner tus videos

Los teléfonos de la página ya están listos. Hoy muestran una imagen fija; cuando les pongas un video, se reproducen solos (sin sonido) al aparecer en pantalla, se pausan al salir y tienen un botón para activar el sonido.

### 1. Exporta cada video para web

En Premiere Pro (Archivo → Exportar → Medios) o CapCut:

| Ajuste | Valor |
|---|---|
| Formato | **H.264 (.mp4)** |
| Resolución | **720 × 1280** (vertical). 1080 × 1920 también sirve, pero pesa más |
| Velocidad de bits | 2 a 4 Mbps (VBR, 1 pasada) |
| Audio | AAC, 128 kbps |
| Duración | Ideal 15 a 45 segundos. Si es más largo, usa un recorte |
| Peso por video | **Menos de 8 MB** (GitHub Pages no acepta archivos de más de 100 MB y la página carga lento con videos pesados) |

En Premiere, activa **"Optimizar para streaming / Fast Start"** si aparece. Si un video pesa mucho, pásalo por [HandBrake](https://handbrake.fr) con el preset "Social 720p".

### 2. Nómbralos sin espacios ni acentos

✅ `reclutamiento-2025.mp4`  ❌ `Video Reclutamiento Final (1).MP4`

### 3. Cópialos a su carpeta

- Cheyennes → `assets/videos/cheyennes/`
- Rompecintas → `assets/videos/rompecintas/`
- JP Records → `assets/videos/jp-records/`

### 4. Escribe la ruta en `assets/js/config.js`

Abre el archivo con VS Code (o el Bloc de notas) y llena el campo `src` del teléfono que corresponda:

```js
'cheyennes-1': {
  src: 'assets/videos/cheyennes/reclutamiento-2025.mp4',
  enlace: 'https://www.instagram.com/reel/XXXXXXXX/',   // link directo al reel (opcional)
  texto: 'Ver en Instagram'
},
```

Cada nombre (`cheyennes-1`, `vic-3`, `jp-1`…) corresponde a un teléfono de la página, en orden de izquierda a derecha.

### 5. (Opcional) Cambia la imagen de portada

Es la imagen que se ve mientras carga el video. Exporta un cuadro del video como `.jpg` o `.webp` y reemplaza el archivo del mismo nombre en `assets/img/proyectos/` (por ejemplo `vic-1.webp`).

### ¿Quieres agregar otro teléfono?

Copia un bloque `<figure class="telefono" ...>` en `index.html`, cámbiale el `data-video` por un nombre nuevo (ej. `vic-5`) y agrégalo en `config.js`.

---

## Poner tu CV

1. Copia tu PDF a `assets/docs/` con un nombre sin espacios, por ejemplo `CV-Carlos-Eduardo-Mendoza.pdf`.
2. En `assets/js/config.js` escribe: `cv: 'assets/docs/CV-Carlos-Eduardo-Mendoza.pdf',`
3. El botón **Descargar CV** aparece solo en el menú.

## Mejorar las imágenes

Las imágenes actuales se recortaron de tu diseño de Canva, así que tienen poca resolución. Para que se vean nítidas en pantallas de alta definición, reemplázalas por los archivos originales **con el mismo nombre** (formato `.webp` o cambia la extensión también en `index.html`). Tamaños recomendados:

- `carlos.webp`: 1000 × 1000 px
- Logos de clientes: 600 × 600 px
- Mockups: 1200 px del lado más largo

Puedes convertir a WebP gratis en [squoosh.app](https://squoosh.app).

## Actualizar cifras y textos

Todo el texto está en `index.html`. Las cifras de TikTok están en la sección `id="tiktok"`: el perfil (`perfil-tt__cifras`) y el ranking (`ranking__lista`). En el ranking, `--v` es el largo de la barra: el primer lugar es 100 % y los demás se calculan como vistas ÷ vistas del primero. Las métricas están en el bloque `<div class="metricas">`: cambia el número visible y el atributo `data-cuenta` (el número sin comas).

---

## Publicar el sitio (gratis)

**Opción A · Netlify (la más fácil)**
1. Entra a [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrastra la carpeta `portafolio-carlos` completa.
3. Te da un link como `carlos-mendoza.netlify.app`. Puedes cambiar el nombre en *Site settings*.

**Opción B · GitHub Pages**
1. Crea un repositorio público llamado `tu-usuario.github.io`.
2. Sube todo el contenido de la carpeta.
3. En *Settings → Pages* elige la rama `main`. Tu sitio queda en `https://tu-usuario.github.io`.

**Tu sitio publicado:** https://mendozacarloseduardoipn-dot.github.io. Si algún día compras un dominio propio, reemplaza esa dirección en `index.html`, `robots.txt` y `sitemap.xml`.

---

## Checklist legal

- [x] Aviso de privacidad conforme a la LFPDPPP publicada el 20 de marzo de 2025.
- [x] Términos de uso con aviso de marcas de terceros.
- [x] Política de cookies (el sitio no usa cookies, por eso no necesita banner).
- [x] Casilla de aceptación del Aviso de privacidad en el formulario.
- [ ] **Confirma que cada cliente te autoriza a mostrar su logo y tu trabajo.** Un mensaje de WhatsApp o correo diciendo "sí" basta como respaldo.
- [ ] Si alguna foto muestra a personas reconocibles (jugadores, modelos de mockups), verifica que tengas permiso o que la imagen sea de un banco de mockups con licencia.
- [ ] Si algún día agregas Google Analytics, Meta Pixel o videos incrustados de YouTube/TikTok, actualiza la Política de cookies y agrega un banner de consentimiento.

> Estos textos legales son una base sólida para un portafolio personal, pero no sustituyen la revisión de un abogado.
