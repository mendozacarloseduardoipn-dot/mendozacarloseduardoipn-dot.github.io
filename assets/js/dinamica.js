/* =========================================================
   Animaciones dinámicas del portafolio
   - Intro de entrada (claqueta que cae desde arriba)
   - Revelado de cada sección y escalonado automático
   - Carruseles infinitos (clientes y galería)
   - Carrusel de reels con reproducción automática
   - Visor de video en grande
   ========================================================= */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const raiz = document.documentElement;
  const reducido = false; // ver nota en main.js

  /* ---------- 1. Intro de entrada ---------- */
  if (raiz.classList.contains('con-intro')) {
    try { sessionStorage.setItem('intro-vista', '1'); } catch (e) {}
    window.scrollTo(0, 0);
    setTimeout(() => raiz.classList.add('intro-fin'), 1900);
    setTimeout(() => { const i = $('.intro'); if (i) i.remove(); }, 2700);
  } else {
    const i = $('.intro'); if (i) i.remove();
  }

  /* ---------- 2. Secciones: revelado y escalonado ---------- */
  // Hermanos con data-entra sin retraso propio reciben uno escalonado
  const grupos = new Map();
  $$('[data-entra]').forEach((el) => {
    if (el.style.getPropertyValue('--retraso')) return;
    const p = el.parentElement;
    if (!grupos.has(p)) grupos.set(p, []);
    grupos.get(p).push(el);
  });
  grupos.forEach((hijos) => {
    if (hijos.length < 2) return;
    hijos.forEach((el, i) => el.style.setProperty('--retraso', `${Math.min(i, 6) * 0.09}s`));
  });

  const secciones = $$('main > section, main > .franja');
  if ('IntersectionObserver' in window && !reducido) {
    secciones.forEach((s) => { if (s.getBoundingClientRect().top > innerHeight * 0.9 && !s.classList.contains('franja')) s.classList.add('seccion-espera'); });
    const obs = new IntersectionObserver((ents) => {
      ents.forEach((en) => {
        if (en.isIntersecting && !en.target.classList.contains('seccion-viva')) { en.target.classList.remove('seccion-espera'); en.target.classList.add('seccion-viva'); obs.unobserve(en.target); }
      });
    }, { threshold: 0.08 });
    secciones.forEach((s) => obs.observe(s));
  }

  /* ---------- 3. Carruseles infinitos ---------- */
  $$('[data-marquesina]').forEach((m) => {
    const pista = m.querySelector('ul');
    if (!pista || reducido) return;
    const originales = Array.from(pista.children);
    // Duplicar hasta cubrir dos veces el ancho visible, para que el ciclo no tenga huecos
    const llenar = () => {
      $$('[data-clon]', pista).forEach((c) => c.remove());
      const base = pista.scrollWidth;
      let copias = Math.max(1, Math.ceil((m.clientWidth * 2) / Math.max(base, 1)));
      const frag = document.createDocumentFragment();
      for (let k = 0; k < copias; k++) {
        originales.forEach((li) => {
          const c = li.cloneNode(true);
          c.setAttribute('data-clon', '');
          c.setAttribute('aria-hidden', 'true');
          $$('a, button', c).forEach((x) => x.setAttribute('tabindex', '-1'));
          frag.appendChild(c);
        });
      }
      pista.appendChild(frag);
      // un ciclo = distancia entre el primer elemento y su primera copia (incluye márgenes)
      const primeraCopia = pista.querySelector('[data-clon]');
      const desplazamiento = primeraCopia ? primeraCopia.offsetLeft - originales[0].offsetLeft : base;
      pista.style.setProperty('--ciclo', `${-desplazamiento}px`);
      pista.style.setProperty('--duracion', `${Math.max(18, base / 45)}s`);
      m.classList.add('activa');
    };
    // Las imágenes tienen ancho y alto declarados, así que se puede medir de inmediato
    llenar();
    window.addEventListener('load', llenar, { once: true });
    let t; window.addEventListener('resize', () => { clearTimeout(t); t = setTimeout(llenar, 200); });
  });

  /* ---------- 4. Carrusel de reels ---------- */
  $$('[data-carrusel]').forEach((car) => {
    const pista = $('.carrusel__pista', car);
    const items = $$('.telefono', pista);
    const puntos = $('.carrusel__puntos', car);
    let actual = 0;
    let temporizador = null;
    let visible = false;

    items.forEach((it, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'carrusel__punto';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', `Video ${i + 1} de ${items.length}`);
      b.addEventListener('click', () => ir(i, true));
      puntos.appendChild(b);
      it.addEventListener('click', (e) => {
        if (!it.classList.contains('activo')) { e.preventDefault(); e.stopPropagation(); ir(i, true); }
      }, true);
    });

    const videoDe = (it) => $('video', it);

    const reproducirActual = () => {
      clearTimeout(temporizador);
      const v = videoDe(items[actual]);
      if (!visible || reducido) return;
      if (v) {
        v.dataset.pausaManual = '';
        v.currentTime = 0;
        v.play().catch(() => { temporizador = setTimeout(siguiente, 7000); });
      } else {
        temporizador = setTimeout(siguiente, 6000);
      }
    };

    function ir(i, manual) {
      const n = items.length;
      actual = (i + n) % n;
      items.forEach((it, k) => {
        let pos = k - actual;
        if (pos > n / 2) pos -= n;
        if (pos < -n / 2) pos += n;
        it.style.setProperty('--pos', pos);
        it.dataset.pos = Math.abs(pos) > 1 ? 'lejos' : String(pos);
        it.classList.toggle('activo', pos === 0);
        it.setAttribute('aria-hidden', pos === 0 ? 'false' : 'true');
        $$('a, button', it).forEach((x) => (pos === 0 ? x.removeAttribute('tabindex') : x.setAttribute('tabindex', '-1')));
        const v = videoDe(it);
        if (v && pos !== 0) { v.pause(); v.muted = true; }
      });
      $$('.carrusel__punto', puntos).forEach((p, k) => p.setAttribute('aria-selected', String(k === actual)));
      reproducirActual();
    }
    const siguiente = () => ir(actual + 1);
    const anterior = () => ir(actual - 1);

    items.forEach((it) => {
      const v = videoDe(it);
      if (v) v.addEventListener('ended', () => { if (it.classList.contains('activo')) siguiente(); });
    });
    $('[data-siguiente]', car).addEventListener('click', () => ir(actual + 1, true));
    $('[data-anterior]', car).addEventListener('click', () => ir(actual - 1, true));
    car.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); siguiente(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); anterior(); }
    });

    // Deslizar con el dedo o el mouse
    let x0 = null;
    pista.addEventListener('pointerdown', (e) => { x0 = e.clientX; });
    pista.addEventListener('pointerup', (e) => {
      if (x0 === null) return;
      const dx = e.clientX - x0; x0 = null;
      if (Math.abs(dx) > 45) (dx < 0 ? siguiente : anterior)();
    });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver((ents) => {
        ents.forEach((en) => {
          visible = en.isIntersecting;
          if (visible) reproducirActual();
          else { clearTimeout(temporizador); items.forEach((it) => { const v = videoDe(it); if (v) v.pause(); }); }
        });
      }, { threshold: 0.4 }).observe(pista);
    } else { visible = true; }

    car.classList.add('listo');
    ir(0);
  });

  /* ---------- 5. Visor de video en grande ---------- */
  let visor = null;
  const crearVisor = () => {
    visor = document.createElement('dialog');
    visor.className = 'visor-video';
    visor.setAttribute('aria-label', 'Video en grande');
    visor.innerHTML = `
      <div class="visor-video__caja">
        <video class="visor-video__video" controls playsinline></video>
        <button class="visor-video__cerrar" type="button" aria-label="Cerrar video">
          <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2"><path d="m5 5 10 10M15 5 5 15"/></svg>
        </button>
      </div>`;
    document.body.appendChild(visor);
    const cerrar = () => visor.close();
    $('.visor-video__cerrar', visor).addEventListener('click', cerrar);
    visor.addEventListener('click', (e) => { if (e.target === visor) cerrar(); });
    visor.addEventListener('close', () => {
      const v = $('video', visor); v.pause(); v.removeAttribute('src'); v.load();
      raiz.classList.remove('visor-abierto');
    });
  };
  window.addEventListener('ver-video', (e) => {
    if (!visor) crearVisor();
    const origen = e.detail.video;
    const v = $('video', visor);
    const api = window.__videosPortafolio;
    if (api) { api.silenciarTodos(); api.lista.forEach((x) => x.pause()); }
    v.src = origen.currentSrc || origen.src;
    v.poster = origen.poster || '';
    v.setAttribute('aria-label', e.detail.titulo || 'Video');
    v.currentTime = 0;
    v.muted = false;
    if (typeof visor.showModal === 'function') visor.showModal(); else visor.setAttribute('open', '');
    raiz.classList.add('visor-abierto');
    v.play().catch(() => { v.muted = true; v.play().catch(() => {}); });
  });
})();
