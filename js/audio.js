const clickSound = new Audio('/assets/audio/click.mp3');
clickSound.preload = 'auto';

document.addEventListener('click', async (e) => {
    // Find the closest .click element for both buttons and cards
    const clickable = e.target.closest('.click');
    if (!clickable) return;

    // Make sure the gesture counts for audio
    e.stopPropagation();

    // Get the target URL
    const href = clickable.dataset.href || (clickable.tagName === 'A' && clickable.href);
    if (!href) return;

    e.preventDefault();

    // Play sound immediately
    clickSound.currentTime = 0;
    const playPromise = clickSound.play();
    if (playPromise !== undefined) {
        playPromise.catch(err => console.warn('Click sound failed:', err));
    }

    const isSameOrigin = new URL(href, location.href).origin === location.origin;

    if (clickable.target === "_blank") {
        window.open(href, "_blank");
        return;
    }

    if (isSameOrigin) {
        try {
            const res = await fetch(href);
            const html = await res.text();
            const newMain = new DOMParser().parseFromString(html, 'text/html').querySelector('main');
            if (newMain) document.querySelector('main').innerHTML = newMain.innerHTML;
            history.pushState(null, '', href);
        } catch (err) {
            console.warn('SPA load failed, falling back to full navigation', err);
            window.location.href = href;
        }
    } else {
        setTimeout(() => (window.location.href = href), 150);
    }
});
