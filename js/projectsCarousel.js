const cards = document.querySelectorAll('.project-card');
let current = 0;

function showProject(index) {
cards.forEach((card, i) => {
    card.classList.toggle('active', i === index);
});
}

document.getElementById('prevProject').addEventListener('click', () => {
current = (current - 1 + cards.length) % cards.length;
showProject(current);
});

document.getElementById('nextProject').addEventListener('click', () => {
current = (current + 1) % cards.length;
showProject(current);
});

// initialize first project
showProject(current);


document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
    const href = card.getAttribute('data-href');
    if(href) window.location.href = href;
    });
});
