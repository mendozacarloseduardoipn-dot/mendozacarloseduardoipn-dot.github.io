/* =========================================================
   CONFIGURACIÓN DEL PORTAFOLIO
   Este es el único archivo que necesitas tocar para:
   1) Poner o cambiar los videos de los teléfonos.
   2) Activar el botón "Descargar CV".
   Guía completa paso a paso: LEEME.md
   ========================================================= */

window.PORTAFOLIO = {

  /* CV en PDF.
     1. Copia tu PDF a la carpeta assets/docs/
     2. Escribe aquí su ruta. Ejemplo:
        cv: 'assets/docs/CV-Carlos-Eduardo-Mendoza.pdf',
     Si lo dejas vacío (''), el botón no aparece. */
  cv: 'assets/docs/CV-Carlos-Eduardo-Mendoza.pdf',

  /* Videos de los teléfonos.
     Cada teléfono del HTML tiene un data-video="nombre".
     - src:    ruta del archivo .mp4 dentro de assets/videos/
     - enlace: (opcional) a dónde lleva el botón del teléfono
     - texto:  (opcional) lo que dice ese botón
     Si src está vacío, el teléfono muestra su portada. */
  videos: {
    /* Cheyennes ESIME Culhuacán */
    'cheyennes-1': { src: 'assets/videos/cheyennes/celebracion-nocturna.mp4', enlace: 'https://www.instagram.com/cheyennes.culhuacan/', texto: 'Ver en Instagram' },
    'cheyennes-2': { src: 'assets/videos/cheyennes/reel-reclutamiento.mp4',  enlace: 'https://www.instagram.com/cheyennes.culhuacan/', texto: 'Ver en Instagram' },

    /* Rompecintas, Vic Diego */
    'vic-1': { src: 'assets/videos/rompecintas/vic-cuarto.mp4',     enlace: 'https://www.tiktok.com/@rompe_cintas', texto: 'Ver en TikTok' },
    'vic-2': { src: 'assets/videos/rompecintas/vic-metro.mp4',      enlace: 'https://www.tiktok.com/@rompe_cintas', texto: 'Ver en TikTok' },
    'vic-3': { src: 'assets/videos/rompecintas/vic-clausurado.mp4', enlace: 'https://www.tiktok.com/@rompe_cintas', texto: 'Ver en TikTok' },
    'vic-4': { src: 'assets/videos/rompecintas/vic-puebla.mp4',     enlace: 'https://www.tiktok.com/@rompe_cintas', texto: 'Ver en TikTok' },

    /* JP Records */
    'jp-1': { src: 'assets/videos/jp-records/disfruta-el-proceso.mp4', enlace: 'https://www.instagram.com/jp.rec0rds/', texto: 'Ver en Instagram' },

    /* Mi TikTok (@soy_jaca).
       Cuando tengas tus videos, cópialos a assets/videos/tiktok/
       y escribe la ruta en src. Mientras tanto, el teléfono
       muestra una tarjeta con las vistas y el enlace al video. */
    'tiktok-1': { src: '', enlace: 'https://www.tiktok.com/@soy_jaca/video/7498210960218377480', texto: 'Ver en TikTok' },
    'tiktok-2': { src: '', enlace: 'https://www.tiktok.com/@soy_jaca/video/7545369905248406802', texto: 'Ver en TikTok' },
    'tiktok-3': { src: '', enlace: 'https://www.tiktok.com/@soy_jaca/video/7496316897768623368', texto: 'Ver en TikTok' }
  }
};
