async function loadWorkExperience() {
try {
const response = await fetch('../data/workExperience.json'); // adjust path
const jobs = await response.json();

const container = document.getElementById('experience-container');

jobs.forEach(job => {
const jobDiv = document.createElement('div');
jobDiv.classList.add('job-card');

// Job header
let html = `
    <h4>${job.role} @ ${job.company}</h4>
    <p><em>${job.years}</em></p>
    <ul>
      ${job.description.map(point => `<li>${point}</li>`).join('')}
    </ul>
  `;

// Add link if it exists
if (job.link) {
html += `<p><a href="${job.link}" target="_blank" class="click job-link">Visit Website →</a></p>`;
}

jobDiv.innerHTML = html;
container.appendChild(jobDiv);
});
} catch (error) {
console.error("Error loading work experience:", error);
}
}

document.addEventListener("DOMContentLoaded", loadWorkExperience);
