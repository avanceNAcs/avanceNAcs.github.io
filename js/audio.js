document.addEventListener('DOMContentLoaded', () => {
    const clickSound = new Audio('../assets/audio/click.mp3');
    const iconLinks = document.querySelectorAll('.click');

    iconLinks.forEach(link => {
        link.addEventListener('click', () => {
            clickSound.currentTime = 0;
            clickSound.play();
        });
    });
});
