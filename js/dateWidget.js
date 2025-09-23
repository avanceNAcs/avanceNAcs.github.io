const now = new Date();
const weekday = now.toLocaleDateString('en-US', {weekday: 'long'});
const day = now.getDate();
const month = now.toLocaleDateString('en-US', {month: 'long'});

document.getElementById("weekday").textContent = weekday;
document.getElementById("month").textContent = month;
document.getElementById("day").textContent = day;
