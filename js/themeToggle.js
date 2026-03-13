const btn = document.querySelector('.switchTheme');
let isProTheme = false;

btn.addEventListener("click", changeTheme);

function changeTheme() {
    const themeLink = document.getElementById('theme-stylesheet');

    if (isProTheme) {
        themeLink.setAttribute('href', '../css/styles.css');
        isProTheme = false;
    } else {
        themeLink.setAttribute('href', '../css/professional.css');
        isProTheme = true;
    }
}
