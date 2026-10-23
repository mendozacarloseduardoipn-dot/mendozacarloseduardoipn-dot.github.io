/* =========================================================
   Portafolio · Carlos Eduardo Mendoza
   Sin dependencias. Todo funciona aunque el JS falle:
   el contenido es visible por defecto.
   ========================================================= */
(() => {
  'use strict';

  const config = window.PORTAFOLIO || { cv: '', videos: {} };
  /* Las animaciones son parte del portafolio, así que se muestran siempre.
     Si el sistema pide menos movimiento, solo se quitan los efectos de
     inclinación y parallax (los más bruscos). */
  const reducido = false;
  const menosMovimiento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (sel, raiz = document) => raiz.querySelector(sel);
  const $$ = (sel, raiz = document) => Array.from(raiz.querySelectorAll(sel));

  /* ---------- Año del pie ---------- */
  const anio = $('#anio');
  if (anio) anio.textContent = new Date().getFullYear();

  /* ---------- Botón de CV ---------- */
  const botonCV = $('#boton-cv');
  if (botonCV && config.cv) {
    botonCV.href = config.cv;
    botonCV.hidden = false;
    botonCV.setAttribute('download', '');
    botonCV.removeAttribute('target');
  }

  /* ---------- Encabezado: fondo al desplazar ---------- */
  const cabecera = $('#cabecera');
  const alDesplazar = () => cabecera && cabecera.classList.toggle('con-fondo', window.scrollY > 24);

  /* ---------- Menú móvil ---------- */
  const botonMenu = $('#menu-boton');
  const cerrarMenu = () => {
    document.body.classList.remove('menu-abierto');
    botonMenu && botonMenu.setAttribute('aria-expanded', 'false');
  };
  if (botonMenu) {
    botonMenu.addEventListener('click', () => {
      const abierto = document.body.classList.toggle('menu-abierto');
      botonMenu.setAttribute('aria-expanded', String(abierto));
      botonMenu.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });
    $$('#menu a').forEach((a) => a.addEventListener('click', cerrarMenu));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarMenu(); });
  }

  /* ---------- Entradas y salidas animadas ----------
     Al cargar, solo se ocultan los elementos que aún no se ven.
     Después cada elemento:
       - entra cuando aparece por abajo,
       - sale (desenfoque hacia arriba) cuando se va por arriba,
       - y vuelve a entrar si regresas. */
  if (!reducido && 'IntersectionObserver' in window) {
    const animables = $$('[data-entra]');
    animables
      .filter((el) => el.getBoundingClientRect().top > window.innerHeight * 0.92)
      .forEach((el) => el.classList.add('pendiente'));
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        const el = en.target;
        if (en.isIntersecting) {
          el.classList.remove('pendiente', 'salio');
        } else if (en.rootBounds && en.boundingClientRect.bottom <= en.rootBounds.top + 1) {
          el.classList.add('salio');
          el.classList.remove('pendiente');
        } else if (en.rootBounds && en.boundingClientRect.top >= en.rootBounds.bottom - 1) {
          el.classList.add('pendiente');
          el.classList.remove('salio');
        }
      });
    }, { rootMargin: '-4% 0px -6% 0px', threshold: 0 });
    animables.forEach((el) => obs.observe(el));
  }

  /* ---------- Salida de la portada y relleno del nombre del pie ---------- */
  const portada = $('.portada');
  const gigante = $('.pie__gigante');
  const efectosScroll = () => {
    if (menosMovimiento) return;
    if (portada) {
      const s = Math.min(1, Math.max(0, window.scrollY / (portada.offsetHeight * 0.85)));
      portada.style.setProperty('--s', s.toFixed(3));
    }
    if (gigante) {
      // se llena por completo justo al llegar al final de la página
      const restante = document.documentElement.scrollHeight - window.innerHeight - window.scrollY;
      const p = Math.min(1, Math.max(0, 1 - restante / (window.innerHeight * 0.7)));
      gigante.style.setProperty('--relleno', `${(p * 100).toFixed(1)}%`);
    }
  };

  /* ---------- Ajustar el nombre gigante del pie al ancho exacto ---------- */
  const ajustarGigante = () => {
    if (!gigante) return;
    const ancho = gigante.parentElement.clientWidth -
      parseFloat(getComputedStyle(gigante.parentElement).paddingLeft) -
      parseFloat(getComputedStyle(gigante.parentElement).paddingRight);
    gigante.style.fontSize = '100px';
    const medida = gigante.scrollWidth || 1;
    gigante.style.fontSize = `${Math.min(240, (ancho / medida) * 100 * 0.98)}px`;
  };
  ajustarGigante();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(ajustarGigante);
  window.addEventListener('resize', ajustarGigante);

  /* ---------- Hora en Ciudad de México (pie) ---------- */
  const hora = $('#hora-cdmx');
  if (hora) {
    const fmt = new Intl.DateTimeFormat('es-MX', { timeZone: 'America/Mexico_City', hour: '2-digit', minute: '2-digit', hour12: false });
    const tic = () => { hora.textContent = fmt.format(new Date()); };
    tic();
    setInterval(tic, 30000);
  }

  /* ---------- Contadores ---------- */
  const formato = new Intl.NumberFormat('es-MX');
  if (!reducido && 'IntersectionObserver' in window) {
    const contar = (el) => {
      const meta = Number(el.dataset.cuenta);
      const dur = 1600;
      const t0 = performance.now();
      const paso = (t) => {
        const p = Math.min(1, (t - t0) / dur);
        const e = 1 - Math.pow(1 - p, 4);
        el.textContent = formato.format(Math.round(meta * e));
        if (p < 1) requestAnimationFrame(paso);
      };
      requestAnimationFrame(paso);
    };
    const obsCifras = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        if (en.isIntersecting) { contar(en.target); obsCifras.unobserve(en.target); }
      });
    }, { threshold: 0.6 });
    $$('[data-cuenta]').forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) obsCifras.observe(el);
    });
  }

  /* ---------- Videos en los teléfonos ----------
     Cada video se reproduce solo (sin sonido) cuando aparece en pantalla.
     Controles: tocar el video = pausa/reproducir, botón de sonido,
     botón para verlo en grande con sonido y barra de progreso. */
  const ICONOS = {
    sonidoOn: '<svg viewBox="0 0 20 20" fill="none" stroke="#fff" stroke-width="1.7"><path d="M3 7.5h3l4-3.5v12l-4-3.5H3z"/><path d="M13.5 7a4 4 0 0 1 0 6M15.8 4.8a7 7 0 0 1 0 10.4"/></svg>',
    sonidoOff: '<svg viewBox="0 0 20 20" fill="none" stroke="#fff" stroke-width="1.7"><path d="M3 7.5h3l4-3.5v12l-4-3.5H3z"/><path d="m13.5 7.5 5 5m0-5-5 5"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M8 5.5v13l11-6.5z"/></svg>',
    pausa: '<svg viewBox="0 0 24 24" fill="#fff"><path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z"/></svg>',
    ampliar: '<svg viewBox="0 0 20 20" fill="none" stroke="#fff" stroke-width="1.8"><path d="M12 3h5v5M8 17H3v-5M17 3l-6 6M3 17l6-6"/></svg>'
  };

  const videosActivos = [];
  const silenciarTodos = () => {
    videosActivos.forEach((v) => { v.muted = true; });
    $$('.telefono__sonido').forEach((b) => { b.innerHTML = ICONOS.sonidoOff; b.setAttribute('aria-label', 'Activar sonido'); });
  };

  $$('[data-video]').forEach((tel) => {
    const datos = (config.videos || {})[tel.dataset.video] || {};
    const pantalla = $('.telefono__pantalla', tel);
    const portada = $('img', pantalla);
    const enCarrusel = !!tel.closest('[data-carrusel]');

    if (datos.enlace) {
      const a = document.createElement('a');
      a.className = 'telefono__enlace';
      a.href = datos.enlace;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      a.textContent = datos.texto || 'Ver publicación';
      tel.appendChild(a);
    }

    if (!datos.src) return;

    const video = document.createElement('video');
    video.src = datos.src;
    video.muted = true;
    video.defaultMuted = true;
    video.loop = !enCarrusel; // en el carrusel, al terminar pasa al siguiente
    video.playsInline = true;
    video.autoplay = !enCarrusel;
    video.setAttribute('playsinline', '');
    video.setAttribute('muted', '');
    video.preload = 'metadata';
    if (portada) video.poster = portada.currentSrc || portada.src;
    video.setAttribute('aria-label', portada ? portada.alt : 'Video');
    video.addEventListener('error', () => { video.remove(); tel.classList.remove('con-video'); });
    pantalla.appendChild(video);
    tel.classList.add('con-video');

    // Tocar = pausa / reproducir
    const toque = document.createElement('button');
    toque.type = 'button';
    toque.className = 'telefono__toque';
    toque.setAttribute('aria-label', 'Pausar o reproducir video');
    const estado = document.createElement('span');
    estado.className = 'telefono__estado';
    estado.setAttribute('aria-hidden', 'true');
    toque.appendChild(estado);
    toque.addEventListener('click', (e) => {
      if (tel.closest('[data-carrusel]') && !tel.classList.contains('activo')) return; // el carrusel lo maneja
      e.stopPropagation();
      if (video.paused) { video.dataset.pausaManual = ''; video.play().catch(() => {}); estado.innerHTML = ICONOS.play; }
      else { video.dataset.pausaManual = '1'; video.pause(); estado.innerHTML = ICONOS.pausa; }
      estado.classList.remove('flash'); void estado.offsetWidth; estado.classList.add('flash');
    });
    tel.appendChild(toque);

    // Progreso
    const progreso = document.createElement('span');
    progreso.className = 'telefono__progreso';
    progreso.innerHTML = '<span></span>';
    tel.appendChild(progreso);
    const barra = progreso.firstChild;
    video.addEventListener('timeupdate', () => {
      if (video.duration) barra.style.transform = `scaleX(${video.currentTime / video.duration})`;
    });

    // Sonido
    const boton = document.createElement('button');
    boton.type = 'button';
    boton.className = 'telefono__sonido';
    boton.setAttribute('aria-label', 'Activar sonido');
    boton.innerHTML = ICONOS.sonidoOff;
    boton.addEventListener('click', (e) => {
      e.stopPropagation();
      const activar = video.muted;
      silenciarTodos();
      video.muted = !activar;
      boton.innerHTML = activar ? ICONOS.sonidoOn : ICONOS.sonidoOff;
      boton.setAttribute('aria-label', activar ? 'Silenciar' : 'Activar sonido');
      if (activar) { video.dataset.pausaManual = ''; video.play().catch(() => {}); }
    });
    tel.appendChild(boton);

    // Ver en grande
    const ampliar = document.createElement('button');
    ampliar.type = 'button';
    ampliar.className = 'telefono__ampliar';
    ampliar.setAttribute('aria-label', 'Ver video en grande');
    ampliar.innerHTML = ICONOS.ampliar;
    ampliar.addEventListener('click', (e) => {
      e.stopPropagation();
      window.dispatchEvent(new CustomEvent('ver-video', { detail: { video, titulo: video.getAttribute('aria-label') } }));
    });
    tel.appendChild(ampliar);

    video.__carrusel = enCarrusel;
    videosActivos.push(video);
  });
  window.__videosPortafolio = { lista: videosActivos, silenciarTodos };

  // Reproducción automática al aparecer (los del carrusel los controla dinamica.js)
  const libres = videosActivos.filter((v) => !v.__carrusel);
  if (libres.length && 'IntersectionObserver' in window) {
    const obsVideo = new IntersectionObserver((entradas) => {
      entradas.forEach((en) => {
        const v = en.target;
        if (en.isIntersecting && !reducido && v.dataset.pausaManual !== '1') {
          v.play().catch(() => {});
        } else if (!en.isIntersecting) {
          v.pause();
        }
      });
    }, { threshold: 0.35 });
    libres.forEach((v) => obsVideo.observe(v));
  }

  /* ---------- Inclinación de teléfonos al pasar el mouse ---------- */
  if (!menosMovimiento && window.matchMedia('(hover: hover)').matches) {
    $$('.telefono').filter((t) => !t.closest('[data-carrusel]')).forEach((tel) => {
      tel.addEventListener('pointermove', (e) => {
        const r = tel.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        tel.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translateY(-4px)`;
      });
      tel.addEventListener('pointerleave', () => { tel.style.transform = ''; });
    });
  }

  /* ---------- Copiar correo / teléfono ---------- */
  $$('[data-copiar]').forEach((b) => {
    b.addEventListener('click', () => {
      const texto = b.dataset.copiar;
      const listo = () => { b.textContent = 'Copiado'; setTimeout(() => { b.textContent = 'Copiar'; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(listo).catch(() => seleccionar(b));
      } else {
        seleccionar(b);
      }
    });
  });
  function seleccionar(boton) {
    const destino = boton.parentElement.querySelector('.via__texto a, .via__texto span');
    if (!destino) return;
    const rango = document.createRange();
    rango.selectNodeContents(destino);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(rango);
    boton.textContent = 'Seleccionado';
  }

  /* ---------- Formulario: arma un correo ---------- */
  const form = $('#formulario');
  if (form) {
    const aviso = $('#formulario-aviso');
    const correo = ($('#correo') && $('#correo').textContent.trim()) || '';
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = form.nombre.value.trim();
      const mensaje = form.mensaje.value.trim();
      aviso.classList.remove('error');
      if (!nombre || !mensaje) {
        aviso.textContent = 'Escribe tu nombre y tu mensaje para continuar.';
        aviso.classList.add('error');
        (!nombre ? form.nombre : form.mensaje).focus();
        return;
      }
      if (!form.privacidad.checked) {
        aviso.textContent = 'Marca la casilla del Aviso de privacidad para continuar.';
        aviso.classList.add('error');
        form.privacidad.focus();
        return;
      }
      const empresa = form.empresa.value.trim();
      const asunto = `${form.tipo.value} · ${nombre}${empresa ? ' (' + empresa + ')' : ''}`;
      const cuerpo = `Hola Carlos,\n\n${mensaje}\n\n${nombre}${empresa ? '\n' + empresa : ''}`;
      window.location.href = `mailto:${correo}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
      aviso.textContent = `Se abrió tu app de correo con el mensaje listo. Si no se abrió, escríbeme a ${correo}.`;
    });
  }

  /* ---------- Línea de tiempo ----------
     Cada sección es un clip. El cabezal sigue al scroll y el timecode
     corre a 30 cuadros por segundo sobre una duración de 3 minutos. */
  const pista = $('#pista');
  const cabezal = $('#cabezal');
  const tc = $('#tc');
  const tcPortada = $('#tc-portada');
  const escena = $('#escena');
  const secciones = $$('[data-clip]');
  const DURACION = 180; // segundos
  const FPS = 30;
  let clips = [];
  let total = 1;

  const timecode = (seg) => {
    const f = Math.floor((seg % 1) * FPS);
    const s = Math.floor(seg) % 60;
    const m = Math.floor(seg / 60) % 60;
    const h = Math.floor(seg / 3600);
    return [h, m, s, f].map((n) => String(n).padStart(2, '0')).join(':');
  };

  const construir = () => {
    if (!pista) return;
    clips.forEach((c) => c.boton.remove());
    const alto = document.documentElement.scrollHeight;
    total = Math.max(1, alto - window.innerHeight);
    clips = secciones.map((sec, i) => {
      const inicio = i === 0 ? 0 : sec.offsetTop;
      const fin = i === secciones.length - 1 ? alto : secciones[i + 1].offsetTop;
      const b = document.createElement('button');
      b.type = 'button';
      b.className = `clip clip--${sec.dataset.tipo || 'base'}`;
      b.style.flex = `${Math.max(1, fin - inicio)} 1 0`;
      b.textContent = sec.dataset.clip;
      b.setAttribute('aria-label', `Ir a ${sec.dataset.clip}`);
      b.addEventListener('click', (e) => {
        if (arrastrado) { e.preventDefault(); return; }
        sec.scrollIntoView({ behavior: reducido ? 'auto' : 'smooth' });
      });
      pista.insertBefore(b, cabezal);
      return { boton: b, inicio, fin, nombre: sec.dataset.clip, sec };
    });
    actualizar();
  };

  let ultimoActivo = null;
  const actualizar = () => {
    const p = Math.min(1, Math.max(0, window.scrollY / total));
    if (cabezal) cabezal.style.left = `calc(${p * 100}% - 1px)`;
    const codigo = timecode(p * DURACION);
    if (tc) tc.textContent = codigo;
    if (tcPortada) tcPortada.textContent = codigo;

    const centro = window.scrollY + window.innerHeight * 0.4;
    const activo = clips.find((c) => centro >= c.inicio && centro < c.fin) || clips[clips.length - 1];
    if (activo && activo !== ultimoActivo) {
      clips.forEach((c) => c.boton.classList.toggle('activo', c === activo));
      if (escena) escena.textContent = activo.nombre;
      $$('#menu a[href^="#"]').forEach((a) => {
        const id = a.getAttribute('href').slice(1);
        const esProyecto = activo.sec.classList.contains('proyecto');
        a.classList.toggle('activo', id === activo.sec.id || (esProyecto && id === 'cheyennes'));
      });
      ultimoActivo = activo;
    }
  };

  // Arrastrar sobre la pista para "scrubear" la página
  let arrastrando = false;
  let arrastrado = false;
  let xInicio = 0;
  const irA = (clientX) => {
    const r = pista.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
    window.scrollTo({ top: p * total, behavior: 'auto' });
  };
  if (pista) {
    pista.addEventListener('pointerdown', (e) => {
      arrastrando = true;
      arrastrado = false;
      xInicio = e.clientX;
      document.documentElement.style.scrollBehavior = 'auto';
    });
    window.addEventListener('pointermove', (e) => {
      if (!arrastrando) return;
      if (Math.abs(e.clientX - xInicio) > 4) arrastrado = true;
      if (arrastrado) irA(e.clientX);
    });
    window.addEventListener('pointerup', () => {
      if (!arrastrando) return;
      arrastrando = false;
      document.documentElement.style.scrollBehavior = '';
      setTimeout(() => { arrastrado = false; }, 0);
    });
  }

  // Timecode del visor corriendo en la portada aunque no haya scroll
  if (tcPortada && !reducido) {
    let cuadro = 0;
    setInterval(() => {
      if (window.scrollY > 10) return;
      cuadro += 1;
      tcPortada.textContent = timecode(cuadro / FPS);
    }, 1000 / FPS);
  }

  let pendienteRAF = false;
  window.addEventListener('scroll', () => {
    alDesplazar();
    efectosScroll();
    if (pendienteRAF) return;
    pendienteRAF = true;
    requestAnimationFrame(() => { actualizar(); pendienteRAF = false; });
  }, { passive: true });

  let temporizador;
  window.addEventListener('resize', () => {
    clearTimeout(temporizador);
    temporizador = setTimeout(construir, 150);
  });
  window.addEventListener('load', construir);
  construir();
  alDesplazar();
  efectosScroll();
})();
