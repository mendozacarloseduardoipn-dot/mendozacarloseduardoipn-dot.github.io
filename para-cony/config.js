/* =========================================================
   💗  AQUÍ EDITAS TODO EL CONTENIDO DE LA PÁGINA  💗
   Solo cambia lo que está entre comillas "..." y guarda.
   No borres comas ni corchetes.
   ========================================================= */

window.CONFIG = {

  // Su nombre (o como le dices: "mi amor", "bonita", etc.)
  nombreElla: "Cony",

  // Apodos que van cambiando solos en la portada
  apodos: ["Cony", "Coco", "Mi niña", "Mi amor"],

  // Tu nombre, como quieres que firme la página
  nombreEl: "Carlos",

  // Fecha en que empezaron a ser novios (AÑO-MES-DÍA)
  fechaInicio: "2025-11-22",

  // Dónde empezó todo (déjalo vacío "" para ocultarlo)
  dondeEmpezo: "el cumpleaños de Mía",

  // Frase que aparece en la pantalla del corazón
  fraseInicio: "Espero que te guste, mi niña. Lo hice con todo mi corazón, solo para ti.",

  // ---------- NUESTRA CANCIÓN (opcional) ----------
  // Opción A: pega el link de Spotify de su canción
  //   (en Spotify: ... > Compartir > Copiar enlace de la canción)
  // Opción B: sube un archivo .mp3 a la carpeta "musica" y pon su ruta,
  //   ej. "musica/cancion.mp3" (empieza a sonar sola al abrir el regalo)
  // Si ambas quedan vacías, la sección no aparece.
  cancion: {
    titulo: "Hasta la muerte",
    artista: "Eslabon Armado · Ivan Cornejo",
    spotify: "https://open.spotify.com/track/3qAJAUr7yc9bPDx4ESt6ND",
    archivo: ""
  },

  // ---------- MENSAJE DE VOZ (opcional) ----------
  // Graba una nota de voz en tu iPhone (app Notas de voz), compártela
  // como archivo, súbela a la carpeta "musica" y pon la ruta aquí,
  // ej. "musica/voz.m4a". Vacío = sección oculta.
  mensajeDeVoz: "",

  // ---------- CARTA ----------
  // Cada línea entre comillas es un párrafo.
  carta: [
    "Mi niña:",
    "Hoy cumplimos un año juntos y todavía no encuentro las palabras exactas para explicarte todo lo que significas para mí. Por eso hice esto: un pedacito de internet que es solo tuyo.",
    "Todo empezó en el cumpleaños de Mía. Desde ese día no me quiero separar de ti, y un 22 de noviembre empezó la historia más bonita de mi vida. Desde entonces has estado en todo: en las salidas, en las comidas en familia, en las fotos donde hago caras raras y tú igual te ríes, y hasta en mis partidos de americano. No sabes lo que significa para mí voltear y verte ahí.",
    "Gracias por quererme como soy, por tu paciencia, por tus abrazos y por hacer que los días normales se sientan especiales. Contigo aprendí que el amor también es estar, cuidarse y reírse juntos de las cosas más tontas.",
    "No sé todo lo que nos espera, pero sí sé que lo quiero vivir contigo. Que este sea el primero de muchísimos años.",
    "Te amo con todo mi corazón, Cony."
  ],

  // ---------- RAZONES POR LAS QUE TE AMO ----------
  razones: [
    "Porque desde el cumpleaños de Mía no me he querido separar de ti ni un día.",
    "Por cómo me miras cuando crees que no me doy cuenta.",
    "Porque te ríes de mis caras raras… y a veces haces unas peores que las mías.",
    "Porque contigo puedo ser yo, sin filtros.",
    "Por tus abrazos, que arreglan cualquier día malo.",
    "Porque me apoyas en todo lo que hago.",
    "Por tu sonrisa, que es mi cosa favorita en el mundo.",
    "Porque haces que una salida normal se sienta como una aventura.",
    "Por tu paciencia conmigo (que no es poca).",
    "Porque eres mi persona favorita hasta para no hacer nada.",
    "Porque cuando me pasa algo bueno, eres la primera persona a la que se lo quiero contar.",
    "Porque eres bonita por dentro y por fuera.",
    "Porque cada día contigo aprendo algo nuevo sobre lo que es amar."
  ],
  razonFinal: "Y la siguiente razón todavía la estoy descubriendo… contigo, todos los días.",

  // ---------- LÍNEA DEL TIEMPO ----------
  // fecha puede quedar vacía "" si no la recuerdas
  lineaDelTiempo: [
    { fecha: "", titulo: "El cumpleaños de Mía", icono: "🎂",
      texto: "Ahí te conocí. No sabía que esa fiesta me iba a cambiar la vida, y desde ese día no me quiero separar de ti." },
    { fecha: "22 de noviembre de 2025", titulo: "El día que empezó todo", foto: "videos/clip1.jpg",
      texto: "Ese día empezó oficialmente lo nuestro. No sabía que estaba empezando lo más bonito que me ha pasado. Hoy lo sé." },
    { fecha: "Diciembre 2025", titulo: "Nuestra primera Navidad", foto: "fotos/mini/01.jpg",
      texto: "Luces, frío, abrazos y tú. Mi época favorita del año ahora tiene tu cara." },
    { fecha: "", titulo: "Citas que se volvieron costumbre", foto: "fotos/mini/02.jpg",
      texto: "Plazas, cenas, risas y fotos chuecas. Contigo cualquier plan es mi plan favorito." },
    { fecha: "", titulo: "Mis caras raras y tú", foto: "fotos/mini/14.jpg",
      texto: "Gracias por aguantar mis caras y por reírte conmigo de absolutamente todo." },
    { fecha: "", titulo: "En familia", foto: "fotos/mini/10.jpg",
      texto: "Las comidas en familia saben mejor cuando tú estás en la mesa." },
    { fecha: "", titulo: "En la cancha y fuera de ella", foto: "fotos/mini/13.jpg",
      texto: "Terminar un partido y verte ahí es de las mejores sensaciones del mundo." },
    { fecha: "Noviembre 2026", titulo: "Un año contigo", foto: "fotos/mini/15.jpg",
      texto: "365 días después te elegiría otra vez. Todas las veces." }
  ],

  // ---------- GALERÍA "Momentos que no se borran" ----------
  galeria: [
    { tipo: "video", src: "videos/clip1.mp4", poster: "videos/clip1.jpg", sonido: true, texto: "Donde todo empezó ✨" },
    { tipo: "video", src: "videos/clip2.mp4", poster: "videos/clip2.jpg", sonido: false, texto: "Esa mirada 🙈" },
    { src: "fotos/01.jpg", texto: "Nuestra primera Navidad 🎄" },
    { src: "fotos/02.jpg", texto: "A un segundo del beso" },
    { src: "fotos/03.jpg", texto: "Fotos chuecas, momentos perfectos" },
    { src: "fotos/04.jpg", texto: "Aprobado por los dos 👍" },
    { src: "fotos/05.jpg", texto: "Cenas y risas" },
    { src: "fotos/06.jpg", texto: "Mi lugar favorito" },
    { src: "fotos/07.jpg", texto: "Así de cerquita" },
    { src: "fotos/08.jpg", texto: "Tu sonrisa > todo" },
    { src: "fotos/09.jpg", texto: "Noches que no olvido" },
    { src: "fotos/10.jpg", texto: "En familia 💛" },
    { src: "fotos/11.jpg", texto: "De verde los dos 💚" },
    { src: "fotos/12.jpg", texto: "Nosotros en el espejo" },
    { src: "fotos/13.jpg", texto: "Mi fan número uno 🏈" },
    { src: "fotos/14.jpg", texto: "Payasos oficiales 🤪" },
    { src: "fotos/15.jpg", texto: "Mi paz" },
    { src: "fotos/16.jpg", texto: "Siempre a mi lado" },
    { src: "fotos/17.jpg", texto: "Un año después 💗" }
  ],

  // Fotos especiales
  fotoPortada: "fotos/02.jpg",
  fotoDisco: "fotos/11.jpg",
  fotoRasca: "fotos/06.jpg",
  textoRasca: "Te elegiría otra vez, en todas las vidas.",
  fotoFinal: "fotos/08.jpg",

  // ---------- PREGUNTA FINAL ----------
  pregunta: "¿Quieres seguir escribiendo esta historia conmigo?",
  respuestaSi: "¡Sabía que dirías que sí! 💞",
  mensajeFinal: "Feliz primer aniversario, mi niña. Gracias por este año tan bonito. Vamos por muchos más."
};
