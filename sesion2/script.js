/* =========================================================
   AURA - Lógica de la aplicación
   1. Datos (catálogo de canciones, artistas, playlists)
   2. Estado de la app (cola, favoritos, playlist del usuario)
   3. Renderizado dinámico de las secciones
   4. Búsqueda de canciones (texto + filtro por género)
   5. Reproductor (play/pausa, siguiente, aleatorio, repetir, volumen)
      El audio se genera con Web Audio API para no depender de archivos mp3.
   6. Navegación entre vistas y eventos
   ========================================================= */
 
/* ---------- 1. DATOS ---------- */
const TRACKS = [
  { id: 't1',  title: 'Silken Rhythms',            artist: 'Mélanie Vane',          album: 'Velvet Sessions',   genre: 'Liquid Velvet',    dur: 214, art: 'art-a', streams: '2.4M' },
  { id: 't2',  title: 'Midnight Sun',              artist: 'Kaelen Voss',           album: 'Solar Hours',       genre: 'Ambient Solitude', dur: 245, art: 'art-b', streams: '1.9M' },
  { id: 't3',  title: 'Velvet Horizons',           artist: 'The Obsidian Quintet',  album: 'Obsidian Live',     genre: 'Dark Room Jazz',   dur: 298, art: 'art-c', streams: '1.7M' },
  { id: 't4',  title: 'Echoes of Gold',            artist: 'Aria Thorne',           album: 'Brass & Silk',      genre: 'Dark Room Jazz',   dur: 231, art: 'art-d', streams: '1.2M' },
  { id: 't5',  title: 'Chronicles of Silence',     artist: 'Hana Blume',            album: 'Monoliths',         genre: 'Ambient Solitude', dur: 276, art: 'art-h', year: 2026 },
  { id: 't6',  title: 'Midnight Blue & Amber',     artist: 'Vesper Guild',          album: 'Fluid Metals',      genre: 'Noir Electronic',  dur: 262, art: 'art-e', year: 2026 },
  { id: 't7',  title: 'Stardust Suite',            artist: 'Orchestra of Light',    album: 'Celestial Map',     genre: 'Classical Silk',   dur: 356, art: 'art-f', year: 2026 },
  { id: 't8',  title: 'Subliminal Frequency',      artist: 'Zora Wave',             album: 'Violet Fabric',     genre: 'Noir Electronic',  dur: 223, art: 'art-g', year: 2026 },
  { id: 't9',  title: 'Nocturne No. 5 in G Minor', artist: 'Parisian Jazz Quintet', album: 'Nocturnes in Velvet & Gold', genre: 'Dark Room Jazz', dur: 312, art: 'art-a' },
  { id: 't10', title: 'Chamber Symphony in D Minor', artist: 'Klaus Sterling',      album: 'Royal Harmonic',    genre: 'Chamber Devotion', dur: 402, art: 'art-d' },
  { id: 't11', title: 'Sonata of the Deep Blue',   artist: 'Hillary Cross',         album: 'The Ocean Chamber', genre: 'Classical Silk',   dur: 402, art: 'art-e' },
  { id: 't12', title: 'Subterranean Whispers',     artist: 'Aero Synth Guild',      album: 'Geolithic Sessions', genre: 'Noir Electronic', dur: 310, art: 'art-i' },
  { id: 't13', title: 'Resonance in Velvet',       artist: 'Mélanie Vane',          album: 'Plum & Decanter',   genre: 'Liquid Velvet',    dur: 434, art: 'art-g' },
  { id: 't14', title: 'Elysian Fields Live',       artist: 'Parisian Jazz Quintet', album: 'AURA Premieres',    genre: 'Dark Room Jazz',   dur: 545, art: 'art-c' },
  { id: 't15', title: 'Violin at Dusk',            artist: 'Sasha Noir',            album: 'Neo Strings',       genre: 'Classical Silk',   dur: 268, art: 'art-h' },
  { id: 't16', title: 'Amber Breath',              artist: 'Evelyn Gold',           album: 'Soft Rooms',        genre: 'Ambient Solitude', dur: 289, art: 'art-b' },
  { id: 't17', title: 'Fracture Étude',            artist: 'Cyril Rostand',         album: 'Avant Pieces',      genre: 'Chamber Devotion', dur: 247, art: 'art-f' },
  { id: 't18', title: 'Minimal Pulse',             artist: 'Lucian Thorne',         album: 'Grid Lines',        genre: 'Noir Electronic',  dur: 233, art: 'art-j' },
  { id: 't19', title: 'Candlelit Waltz',           artist: 'Aria Thorne',           album: 'Brass & Silk',      genre: 'Liquid Velvet',    dur: 201, art: 'art-d' }
];
 
const ARTISTS = [
  { name: 'Sasha Noir',    genre: 'Neo-Classical', art: 'art-h' },
  { name: 'Evelyn Gold',   genre: 'Ambient Soul',  art: 'art-b' },
  { name: 'Cyril Rostand', genre: 'Avant-Garde',   art: 'art-f' },
  { name: 'Aria Thorne',   genre: 'Vocal Jazz',    art: 'art-d' },
  { name: 'Lucian Thorne', genre: 'Minimalist Synth', art: 'art-j' }
];
 
const CURATED = [
  { name: 'Plum & Decanter', desc: 'Smoky ambient jazz for quiet reflection', art: 'art-d', tracks: ['t13', 't1', 't19', 't3', 't9'] },
  { name: 'Atelier Hour',    desc: 'Inspiring downtempo beats for creative work', art: 'art-h', tracks: ['t6', 't12', 't18', 't8'] },
  { name: 'Nocturne Seance', desc: 'Dark cinematic soundscapes to lose yourself', art: 'art-j', tracks: ['t2', 't5', 't16', 't11', 't7'] }
];
 
const GENRES = [
  { name: 'Liquid Velvet',    art: 'art-a' },
  { name: 'Dark Room Jazz',   art: 'art-c' },
  { name: 'Classical Silk',   art: 'art-h' },
  { name: 'Ambient Solitude', art: 'art-i' },
  { name: 'Noir Electronic',  art: 'art-j' },
  { name: 'Chamber Devotion', art: 'art-f' }
];
 
const TRENDING = ['t1', 't2', 't3', 't4'];
const RELEASES = ['t5', 't6', 't7', 't8'];
const LEADERBOARD = ['t11', 't12', 't13', 't14'];
const HERO_TRACKS = ['t9', 't14', 't3'];
 
/* ---------- 2. ESTADO ---------- */
const state = {
  queue: [...LEADERBOARD],   // cola de reproducción actual
  index: -1,                 // posición en la cola
  playing: false,
  elapsed: 0,                // segundos transcurridos
  shuffle: false,
  repeat: false,
  favorites: new Set(load('aura-fav', [])),
  playlist: load('aura-pl', []),
  genreFilter: null
};
 
// Guardado local (con try/catch por si el navegador lo bloquea)
function load(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
}
function save() {
  try {
    localStorage.setItem('aura-fav', JSON.stringify([...state.favorites]));
    localStorage.setItem('aura-pl', JSON.stringify(state.playlist));
  } catch { /* sin almacenamiento: la app sigue funcionando en memoria */ }
}
 
/* ---------- Utilidades ---------- */
const $ = (sel) => document.querySelector(sel);
const byId = (id) => TRACKS.find((t) => t.id === id);
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
const esc = (s) => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const initials = (n) => n.split(' ').map((w) => w[0]).join('');
 
function toast(msg) {
  const el = $('#toast');
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => el.classList.remove('show'), 2200);
}
 
function highlight(text, query) {
  const safe = esc(text);
  if (!query) return safe;
  const q = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return safe.replace(new RegExp(`(${esc(q)})`, 'gi'), '<mark>$1</mark>');
}
 
/* ---------- 3. RENDERIZADO ---------- */
function trendCard(t) {
  return `
  <article class="card trend" data-track="${t.id}" data-play="${t.id}">
    <div class="art ${t.art}"><span aria-hidden="true">♪</span></div>
    <div class="card-overlay">
      <h3>${esc(t.title)}</h3>
      <p>${esc(t.artist)}</p>
      <p>${t.streams} Streams</p>
    </div>
    <button class="play-hover" data-play="${t.id}" aria-label="Reproducir ${esc(t.title)} de ${esc(t.artist)}">▶</button>
    ${cardActions(t)}
  </article>`;
}
 
function releaseCard(t) {
  return `
  <article class="card release" data-track="${t.id}" data-play="${t.id}">
    <div class="art ${t.art}"><span aria-hidden="true">♫</span></div>
    <button class="play-hover" data-play="${t.id}" aria-label="Reproducir ${esc(t.title)} de ${esc(t.artist)}">▶</button>
    ${cardActions(t)}
    <div class="release-info">
      <div><h3>${esc(t.title)}</h3><p>${esc(t.artist)}</p></div>
      <p>${t.year}</p>
    </div>
  </article>`;
}
 
function cardActions(t) {
  const fav = state.favorites.has(t.id);
  return `<div class="card-actions">
    <button class="mini-btn" data-fav="${t.id}" aria-pressed="${fav}" aria-label="${fav ? 'Quitar de' : 'Agregar a'} favoritos">${fav ? '♥' : '♡'}</button>
    <button class="mini-btn" data-add="${t.id}" aria-label="Agregar a mi playlist">＋</button>
  </div>`;
}
 
/* Fila de canción reutilizable (leaderboard, búsqueda, favoritos, playlist) */
function trackRow(t, i, { query = '', editable = false, list = '' } = {}) {
  const fav = state.favorites.has(t.id);
  const current = currentTrack()?.id === t.id;
  const inPl = state.playlist.includes(t.id);
  const extra = editable
    ? `<button class="round-btn" data-up="${i}" aria-label="Subir">↑</button>
       <button class="round-btn" data-down="${i}" aria-label="Bajar">↓</button>
       <button class="round-btn" data-remove="${i}" aria-label="Quitar de la playlist">✕</button>`
    : `<button class="round-btn ${inPl ? 'on' : ''}" data-add="${t.id}" aria-label="Agregar a mi playlist">＋</button>`;
  return `
  <li class="track-row ${current ? 'playing' : ''}" data-track="${t.id}">
    <span class="t-num">${current && state.playing ? '<span class="eq" aria-label="Sonando"><i></i><i></i><i></i></span>' : String(i + 1).padStart(2, '0')}</span>
    <div>
      <p class="t-title">${highlight(t.title, query)}</p>
      <p class="t-artist">${highlight(t.artist, query)}</p>
    </div>
    <span class="t-album">${highlight(t.album, query)} · ${highlight(t.genre, query)}</span>
    <span class="t-dur">${fmt(t.dur)}</span>
    <div class="t-actions">
      <button class="round-btn ${fav ? 'on' : ''}" data-fav="${t.id}" aria-pressed="${fav}" aria-label="Favorito">${fav ? '♥' : '♡'}</button>
      ${extra}
      <button class="round-btn" data-play="${t.id}" data-list="${list}" aria-label="Reproducir ${esc(t.title)}">${current && state.playing ? '❚❚' : '▶'}</button>
    </div>
  </li>`;
}
 
function renderHome() {
  $('#trendingGrid').innerHTML = TRENDING.map((id) => trendCard(byId(id))).join('');
  $('#releasesGrid').innerHTML = RELEASES.map((id) => releaseCard(byId(id))).join('');
 
  $('#artistsList').innerHTML = ARTISTS.map((a) => `
    <li class="artist">
      <button data-artist="${esc(a.name)}" aria-label="Ver canciones de ${esc(a.name)}">
        <span class="avatar art ${a.art}">${initials(a.name)}</span>
      </button>
      <h3>${esc(a.name)}</h3><p>${a.genre}</p>
    </li>`).join('');
 
  $('#curatedGrid').innerHTML = CURATED.map((p, i) => `
    <article class="curated" data-curated="${i}" tabindex="0" aria-label="Reproducir playlist ${esc(p.name)}">
      <div class="art ${p.art}"><span aria-hidden="true">♪</span></div>
      <div style="min-width:0">
        <h3>${esc(p.name)}</h3><p>${esc(p.desc)}</p><small>${p.tracks.length} tracks</small>
      </div>
    </article>`).join('');
 
  $('#moodsGrid').innerHTML = GENRES.map((g) => `
    <button class="mood art ${g.art}" data-genre="${esc(g.name)}" style="place-items:end start">${esc(g.name)}</button>`).join('');
 
  $('#heroTracklist').innerHTML = HERO_TRACKS.map((id) => {
    const t = byId(id);
    return `<li tabindex="0" data-play="${id}" data-list="hero">${esc(t.title)} — <span class="muted">${fmt(t.dur)}</span></li>`;
  }).join('');
 
  renderLeaderboard();
  syncAlbumButton();
}
 
function renderLeaderboard() {
  $('#leaderboard').innerHTML = LEADERBOARD.map((id, i) => trackRow(byId(id), i, { list: 'leader' })).join('');
}
 
function renderFavorites() {
  const favs = [...state.favorites].map(byId).filter(Boolean);
  $('#favList').innerHTML = favs.length
    ? favs.map((t, i) => trackRow(t, i, { list: 'fav' })).join('')
    : '<li class="empty">You have no favorites yet. Tap ♡ on any track.</li>';
  $('#favCount').textContent = favs.length;
}
 
function renderPlaylist() {
  const items = state.playlist.map(byId).filter(Boolean);
  $('#playlistList').innerHTML = items.length
    ? items.map((t, i) => trackRow(t, i, { editable: true, list: 'pl' })).join('')
    : '<li class="empty">Your playlist is empty. Add tracks with ＋ from Home or Search.</li>';
  $('#plCount').textContent = items.length;
}
 
function syncAlbumButton() {
  const btn = $('#saveAlbumBtn');
  const on = state.favorites.has('t10');
  btn.textContent = on ? '★ Saved in Library' : '☆ Save to Library';
  btn.classList.toggle('saved', on);
}
 
/* Vuelve a pintar todo lo que depende del estado */
function refreshAll() {
  renderHome();
  renderFavorites();
  renderPlaylist();
  renderSearch();
  updatePlayerUI();
}
 
/* ---------- 4. BÚSQUEDA ---------- */
function renderSearch() {
  const query = $('#searchInput').value.trim();
  const q = query.toLowerCase();
  const results = TRACKS.filter((t) => {
    const matchText = !q || [t.title, t.artist, t.album, t.genre].some((f) => f.toLowerCase().includes(q));
    const matchGenre = !state.genreFilter || t.genre === state.genreFilter;
    return matchText && matchGenre;
  });
 
  $('#genreFilters').innerHTML = ['All', ...GENRES.map((g) => g.name)].map((g) => {
    const pressed = (g === 'All' && !state.genreFilter) || g === state.genreFilter;
    return `<button class="chip" data-filter="${esc(g)}" aria-pressed="${pressed}">${esc(g)}</button>`;
  }).join('');
 
  $('#searchSummary').textContent = query || state.genreFilter
    ? `${results.length} result${results.length === 1 ? '' : 's'}${query ? ` for “${query}”` : ''}${state.genreFilter ? ` in ${state.genreFilter}` : ''}`
    : 'Type to find tracks by title, artist or genre.';
 
  $('#searchResults').innerHTML = results.length
    ? results.map((t, i) => trackRow(t, i, { query, list: 'search' })).join('')
    : '<li class="empty">No tracks match your search. Try another word or genre.</li>';
  $('#clearSearch').hidden = !query;
  searchResultsIds = results.map((t) => t.id);
}
let searchResultsIds = [];
 
/* ---------- 5. REPRODUCTOR ---------- */
// Motor de sonido: genera una melodía suave distinta para cada canción
const synth = {
  ctx: null, master: null, timer: null, step: 0,
  init() {
    if (this.ctx) return;
    this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    this.master = this.ctx.createGain();
    this.master.gain.value = $('#volume').value * 0.35;
    this.master.connect(this.ctx.destination);
  },
  note(freq, len, type = 'sine', vol = 0.3) {
    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.001, t + len);
    osc.connect(g).connect(this.master);
    osc.start(t);
    osc.stop(t + len);
  },
  start(track) {
    this.init();
    this.ctx.resume();
    this.stop();
    const seed = parseInt(track.id.slice(1), 10);
    const root = 196 * Math.pow(2, (seed % 7) / 12);   // tono base según la canción
    const scale = [0, 3, 5, 7, 10, 12, 15];            // pentatónica menor
    const tempo = 420 - (seed % 4) * 40;
    this.timer = setInterval(() => {
      const deg = scale[(this.step * (seed % 3 + 2) + Math.floor(this.step / 4)) % scale.length];
      this.note(root * Math.pow(2, deg / 12), 1.2, 'triangle', 0.22);
      if (this.step % 4 === 0) this.note(root / 2, 2, 'sine', 0.35);
      this.step++;
    }, tempo);
  },
  stop() { clearInterval(this.timer); this.timer = null; },
  volume(v) { if (this.master) this.master.gain.value = v * 0.35; }
};
 
let ticker = null;
const currentTrack = () => byId(state.queue[state.index]);
 
// Reproduce una canción; "list" indica de qué lista viene (para la cola)
function playTrack(id, list) {
  const lists = {
    leader: LEADERBOARD, fav: [...state.favorites], pl: state.playlist,
    search: searchResultsIds, hero: HERO_TRACKS
  };
  if (currentTrack()?.id === id) { togglePlay(); return; }   // misma canción = pausa/continúa
  const source = lists[list];
  state.queue = source && source.includes(id) ? [...source] : [id, ...TRACKS.map((t) => t.id).filter((x) => x !== id)];
  state.index = state.queue.indexOf(id);
  state.elapsed = 0;
  startPlayback();
}
 
function startPlayback() {
  const t = currentTrack();
  if (!t) return;
  state.playing = true;
  synth.start(t);
  clearInterval(ticker);
  ticker = setInterval(() => {
    state.elapsed += 1;
    if (state.elapsed >= t.dur) { next(true); return; }
    updateProgress();
  }, 1000);
  refreshAll();
}
 
function pause() {
  state.playing = false;
  synth.stop();
  clearInterval(ticker);
  refreshAll();
}
 
function togglePlay() {
  if (state.index < 0) { state.index = 0; state.elapsed = 0; startPlayback(); return; }
  state.playing ? pause() : startPlayback();
}
 
function next(auto = false) {
  if (!state.queue.length) return;
  if (auto && state.repeat) { state.elapsed = 0; startPlayback(); return; }
  if (state.shuffle && state.queue.length > 1) {
    let r;
    do { r = Math.floor(Math.random() * state.queue.length); } while (r === state.index);
    state.index = r;
  } else {
    state.index = (state.index + 1) % state.queue.length;
  }
  state.elapsed = 0;
  startPlayback();
}
 
function prev() {
  if (state.elapsed > 3) { state.elapsed = 0; updateProgress(); return; }  // como en Spotify
  state.index = (state.index - 1 + state.queue.length) % state.queue.length;
  state.elapsed = 0;
  startPlayback();
}
 
function updateProgress() {
  const t = currentTrack();
  const pct = t ? (state.elapsed / t.dur) * 100 : 0;
  const bar = $('#progress');
  bar.value = pct;
  bar.style.setProperty('--fill', `${pct}%`);
  $('#curTime').textContent = fmt(state.elapsed);
}
 
function updatePlayerUI() {
  const t = currentTrack();
  $('#playBtn').textContent = state.playing ? '❚❚' : '▶';
  $('#playBtn').setAttribute('aria-label', state.playing ? 'Pausar' : 'Reproducir');
  if (t) {
    $('#playerTitle').textContent = t.title;
    $('#playerArtist').textContent = t.artist;
    $('#playerArt').className = `player-art art ${t.art}`;
    $('#durTime').textContent = fmt(t.dur);
    const fav = state.favorites.has(t.id);
    $('#playerFav').textContent = fav ? '♥' : '♡';
    $('#playerFav').setAttribute('aria-pressed', fav);
    $('#playerFav').style.color = fav ? 'var(--gold)' : '';
    document.title = `${state.playing ? '▶ ' : ''}${t.title} · AURA`;
  }
  updateProgress();
  // Marca la tarjeta que está sonando
  document.querySelectorAll('.card').forEach((c) => c.classList.toggle('playing', state.playing && c.dataset.track === t?.id));
}
 
/* ---------- Favoritos y playlist ---------- */
function toggleFav(id) {
  const t = byId(id);
  if (state.favorites.has(id)) { state.favorites.delete(id); toast(`Removed “${t.title}” from Favorites`); }
  else { state.favorites.add(id); toast(`♥ “${t.title}” added to Favorites`); }
  save();
  refreshAll();
}
 
function addToPlaylist(id) {
  const t = byId(id);
  if (state.playlist.includes(id)) { toast(`“${t.title}” is already in your playlist`); return; }
  state.playlist.push(id);
  save();
  refreshAll();
  toast(`＋ “${t.title}” added to Velvet Playlists`);
}
 
function moveInPlaylist(i, dir) {
  const j = i + dir;
  if (j < 0 || j >= state.playlist.length) return;
  [state.playlist[i], state.playlist[j]] = [state.playlist[j], state.playlist[i]];
  save();
  refreshAll();
}
 
/* ---------- 6. NAVEGACIÓN ENTRE VISTAS ---------- */
const VIEWS = { home: 'view-home', search: 'view-search', favorites: 'view-favorites', playlist: 'view-playlist' };
 
function showView(name) {
  if (name === 'charts') { showView('home'); $('#charts').scrollIntoView(); setActive('charts'); return; }
  const target = VIEWS[name] || 'view-soon';
  document.querySelectorAll('.view').forEach((v) => { v.hidden = v.id !== target; });
  setActive(name);
  if (name === 'search') $('#searchInput').focus();
  else window.scrollTo({ top: 0 });
}
 
function setActive(name) {
  document.querySelectorAll('.nav-link').forEach((l) => {
    const on = l.dataset.view === name;
    l.classList.toggle('active', on);
    on ? l.setAttribute('aria-current', 'page') : l.removeAttribute('aria-current');
  });
}
 
/* ---------- EVENTOS (delegación: un solo listener para todo) ---------- */
document.addEventListener('click', (e) => {
  const el = e.target.closest('[data-play],[data-fav],[data-add],[data-remove],[data-up],[data-down],[data-view],[data-genre],[data-filter],[data-curated],[data-artist],[data-plan]');
  if (!el) return;
  const d = el.dataset;
 
  if (d.view) { e.preventDefault(); showView(d.view); }
  else if (d.play) playTrack(d.play, d.list);
  else if (d.fav) toggleFav(d.fav);
  else if (d.add) addToPlaylist(d.add);
  else if (d.remove) { state.playlist.splice(+d.remove, 1); save(); refreshAll(); toast('Track removed from playlist'); }
  else if (d.up) moveInPlaylist(+d.up, -1);
  else if (d.down) moveInPlaylist(+d.down, 1);
  else if (d.genre) { state.genreFilter = d.genre; $('#searchInput').value = ''; renderSearch(); showView('search'); }
  else if (d.filter) { state.genreFilter = d.filter === 'All' ? null : d.filter; renderSearch(); }
  else if (d.artist) { $('#searchInput').value = d.artist; state.genreFilter = null; renderSearch(); showView('search'); }
  else if (d.curated) {
    const p = CURATED[+d.curated];
    state.queue = [...p.tracks]; state.index = 0; state.elapsed = 0;
    startPlayback();
    toast(`Playing “${p.name}”`);
  }
  else if (d.plan) toast(`Welcome to the ${d.plan} tier ✦`);
});
 
// Teclado en la lista del hero (elementos <li> con tabindex)
document.addEventListener('keydown', (e) => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('li[data-play], article[data-curated]')) {
    e.preventDefault(); e.target.click();
  }
  // Barra espaciadora = play/pausa (si no se está escribiendo)
  if (e.code === 'Space' && !e.target.matches('input, button, li, a, article')) {
    e.preventDefault(); togglePlay();
  }
});
 
// Búsqueda en tiempo real
$('#searchInput').addEventListener('input', () => {
  renderSearch();
  if ($('#view-search').hidden) showView('search');
});
$('#searchForm').addEventListener('submit', (e) => e.preventDefault());
$('#clearSearch').addEventListener('click', () => { $('#searchInput').value = ''; renderSearch(); $('#searchInput').focus(); });
 
// Controles del reproductor
$('#playBtn').addEventListener('click', togglePlay);
$('#nextBtn').addEventListener('click', () => next());
$('#prevBtn').addEventListener('click', prev);
$('#shuffleBtn').addEventListener('click', (e) => {
  state.shuffle = !state.shuffle;
  e.currentTarget.setAttribute('aria-pressed', state.shuffle);
  toast(`Shuffle ${state.shuffle ? 'on' : 'off'}`);
});
$('#repeatBtn').addEventListener('click', (e) => {
  state.repeat = !state.repeat;
  e.currentTarget.setAttribute('aria-pressed', state.repeat);
  toast(`Repeat ${state.repeat ? 'on' : 'off'}`);
});
$('#playerFav').addEventListener('click', () => { const t = currentTrack(); if (t) toggleFav(t.id); });
$('#progress').addEventListener('input', (e) => {
  const t = currentTrack();
  if (!t) return;
  state.elapsed = (e.target.value / 100) * t.dur;
  updateProgress();
});
$('#volume').addEventListener('input', (e) => {
  synth.volume(+e.target.value);
  e.target.style.setProperty('--fill', `${e.target.value * 100}%`);
});
$('#volume').style.setProperty('--fill', '50%');
 
// Botones de la sección de playlist
$('#playAllBtn').addEventListener('click', () => {
  if (!state.playlist.length) { toast('Add some tracks first'); return; }
  state.queue = [...state.playlist]; state.index = 0; state.elapsed = 0;
  startPlayback();
});
$('#clearPlaylistBtn').addEventListener('click', () => {
  state.playlist = []; save(); refreshAll(); toast('Playlist cleared');
});
 
// Mostrar / ocultar tracklist del hero
$('#tracklistBtn').addEventListener('click', (e) => {
  const list = $('#heroTracklist');
  list.hidden = !list.hidden;
  e.currentTarget.setAttribute('aria-expanded', !list.hidden);
});
 
/* ---------- INICIO ---------- */
refreshAll();
 