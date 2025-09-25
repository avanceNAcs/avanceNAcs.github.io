// musicPlayer.js
let songs = [];
let currentIndex = 0;

const cover = document.getElementById('cover');
const titleEl = document.getElementById('title');
const audio = document.getElementById('audio');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progressContainer');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

// Utility: format seconds to M:SS
function formatTime(s){
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60).toString().padStart(2, '0');
    return `${m}:${sec}`;
}

// Fetch playlist
fetch('../data/music.json')
    .then(async res => {
        const ct = res.headers.get('content-type') || '';
        if (!res.ok) throw new Error(`Failed to fetch music.json: ${res.status} ${res.statusText}`);
        if (!ct.includes('application/json')) {
            const text = await res.text();
            const preview = text.slice(0,200).replace(/\s+/g,' ');
            throw new Error(`music.json did not return JSON. Content-type: ${ct}. Response starts: ${preview}`);
        }
        return res.json();
    })
    .then(data => {
        if (!Array.isArray(data) || data.length === 0) throw new Error('music.json is empty or not an array.');
        songs = data;
        loadSong(currentIndex);
    })
    .catch(err => {
        console.error(err);
        titleEl.textContent = 'Failed to load playlist (check console)';
    });

// Load a song by index
function loadSong(i){
    const song = songs[i];
    if (!song) return;

    cover.src = song.cover;
    cover.alt = song.title;
    titleEl.textContent = song.title;
    audio.src = song.file;

    // Reset UI
    progress.style.width = '0%';
    currentTimeEl.textContent = '0:00';
    durationEl.textContent = '0:00';

    audio.pause();
    audio.load();
    playBtn.textContent = '▶'; // start with play icon
}

// Play/pause toggle
playBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().then(()=> playBtn.textContent = '⏸').catch(()=> playBtn.textContent = '▶');
    } else {
        audio.pause();
        playBtn.textContent = '▶';
    }
});

// Previous song
prevBtn.addEventListener('click', () => {
    if (!songs.length) return;
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
});

// Next song
nextBtn.addEventListener('click', () => {
    if (!songs.length) return;
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
});

// Auto-next when song ends
audio.addEventListener('ended', () => {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);

    // Autoplay only on tuneIn.html
    if (window.location.pathname.endsWith('tuneIn.html')) {
        audio.play().then(() => playBtn.textContent = '⏸').catch(() => playBtn.textContent = '▶');
    }
});

// Update progress bar and time
audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    progress.style.width = pct + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
    durationEl.textContent = formatTime(audio.duration);
});

// Update duration when metadata loads
audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
});

// Click on progress bar to seek
progressContainer.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = progressContainer.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    audio.currentTime = pct * audio.duration;
});

// Handle audio load errors
audio.addEventListener('error', (e) => {
    console.error('Audio error for', audio.src, e);
    titleEl.textContent = 'Track load error — skipping...';
    setTimeout(() => nextBtn.click(), 900);
});
