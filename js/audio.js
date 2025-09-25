// Preload click sound
const clickSound = new Audio('/assets/audio/click.mp3');
clickSound.preload = 'auto';

// Auto-apply .click to all anchors + buttons
document.querySelectorAll('a, button').forEach(el => {
    el.classList.add('click');
});

document.addEventListener('click', (e) => {
    // Find the closest clickable element
    const clickable = e.target.closest('.click');
    if (!clickable) return;

    // Play click sound
    clickSound.currentTime = 0;
    const playPromise = clickSound.play();
    if (playPromise !== undefined) {
        playPromise.catch(err => console.warn('Click sound failed:', err));
    }

    // Let the browser handle navigation normally
});
