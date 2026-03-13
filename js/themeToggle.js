let isProTheme = false;

function changeTheme() {
    const themeLink = document.getElementById('theme-stylesheet');
    
    if (isProTheme) {
        // Revert to original theme
        themeLink.setAttribute('href', '../css/styles.css');
        isProTheme = false;
    } else {
        // Switch to professional theme
        themeLink.setAttribute('href', '../css/professional.css');
        isProTheme = true;
    }
}