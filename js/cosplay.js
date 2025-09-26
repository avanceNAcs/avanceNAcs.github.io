document.addEventListener("DOMContentLoaded", () => {

    const carousel = document.getElementById("cosplay-carousel");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    // Character modal elements
    const charModal = document.getElementById("char-modal");
    const charClose = document.getElementById("char-close");
    const charModalImage = document.getElementById("char-modal-image");
    const charModalName = document.getElementById("char-modal-name");
    const charModalFranchise = document.getElementById("char-modal-franchise");
    const charModalDescription = document.getElementById("char-modal-description");

    // Cosplay modal elements
    const cosplayModal = document.getElementById("cosplay-modal");
    const cosplayClose = document.getElementById("cosplay-close");
    const cosplayModalImage = document.getElementById("cosplay-modal-image");
    const cosplayModalName = document.getElementById("cosplay-modal-name");
    const cosplayModalFranchise = document.getElementById("cosplay-modal-franchise");
    const cosplayModalDescription = document.getElementById("cosplay-modal-description");
    const cosplayModalDetails = document.getElementById("cosplay-modal-details");

    let scrollAmount = 0;

    // Load JSON
    fetch("/data/cosplay.json")
        .then(res => res.json())
        .then(cosplays => {
            cosplays.forEach(c => {
                const card = document.createElement("div");
                card.className = "card";

                if(c.card){ // regular flip card
                    const cardInner = document.createElement("div");
                    cardInner.className = "card-inner";

                    const front = document.createElement("div");
                    front.className = "front-page";
                    front.style.backgroundImage = `url('${c.image}')`;

                    const frontInfo = document.createElement("div");
                    frontInfo.className = "card-info";
                    frontInfo.innerHTML = `<h2 class="card-title">${c.name}</h2><p class="card-subtitle">${c.franchise}</p>`;
                    front.appendChild(frontInfo);

                    const back = document.createElement("div");
                    back.className = "back-page";
                    back.innerHTML = `
                        <div class="card-content">
                            <h3>${c.name}</h3>
                            <p class="card-desc">${c.traits.join(", ")}</p>
                            <button class="card-button char-info-btn">Character Info</button>
                            <button class="card-button cosplay-info-btn">Cosplay Details</button>
                        </div>`;

                    // Event listeners for modals
                    back.querySelector(".char-info-btn").addEventListener("click", () => {
                        charModalImage.src = c.image;
                        charModalName.textContent = c.name;
                        charModalFranchise.textContent = c.franchise;
                        charModalDescription.textContent = c.description;
                        charModal.style.display = "block";
                    });

                    back.querySelector(".cosplay-info-btn").addEventListener("click", () => {
                        cosplayModalImage.src = c.cosplayImage;
                        cosplayModalName.textContent = c.name;
                        cosplayModalFranchise.textContent = c.franchise;
                        cosplayModalDescription.textContent = c.cosplayNotes;
                        cosplayModalDetails.textContent = `Location: ${c.cosplayLocation} | Date: ${c.cosplayDate}`;
                        cosplayModal.style.display = "block";
                    });

                    cardInner.appendChild(front);
                    cardInner.appendChild(back);
                    card.appendChild(cardInner);
                } else { // OC button card
                    card.className = "card oc-card";
                    card.innerHTML = `<button class="cosplay-card">${c.name} (OC)</button>`;
                    const btn = card.querySelector(".cosplay-card");
                    btn.addEventListener("click", () => {
                        cosplayModalImage.src = c.cosplayImage;
                        cosplayModalName.textContent = c.name;
                        cosplayModalFranchise.textContent = c.franchise;
                        cosplayModalDescription.textContent = c.cosplayNotes;
                        cosplayModalDetails.textContent = `Location: ${c.cosplayLocation} | Date: ${c.cosplayDate}`;
                        cosplayModal.style.display = "block";
                    });
                }

                carousel.appendChild(card);
            });
        })
        .catch(err => console.error("Failed to load cosplay.json:", err));

    // Carousel scrolling
    function getCardWidth(){
        const card = carousel.querySelector(".card");
        if(!card) return 0;
        const style = window.getComputedStyle(card);
        return card.offsetWidth + parseInt(style.marginRight);
    }

    nextBtn.addEventListener("click", () => {
        const cardWidth = getCardWidth();
        scrollAmount += cardWidth;
        if(scrollAmount > carousel.scrollWidth - carousel.clientWidth) scrollAmount = carousel.scrollWidth - carousel.clientWidth;
        carousel.scrollTo({left: scrollAmount, behavior: "smooth"});
    });

    prevBtn.addEventListener("click", () => {
        const cardWidth = getCardWidth();
        scrollAmount -= cardWidth;
        if(scrollAmount < 0) scrollAmount = 0;
        carousel.scrollTo({left: scrollAmount, behavior: "smooth"});
    });

    // Close modals
    charClose.onclick = () => charModal.style.display = "none";
    cosplayClose.onclick = () => cosplayModal.style.display = "none";
    window.onclick = e => {
        if(e.target === charModal) charModal.style.display = "none";
        if(e.target === cosplayModal) cosplayModal.style.display = "none";
    };

});
