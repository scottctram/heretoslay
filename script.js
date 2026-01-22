async function generateImages() {
    const sourceDeck = document.getElementById('source-deck');
    const displayGrid = document.getElementById('display-grid');
    const cards = sourceDeck.querySelectorAll('.card');
    
    // Clear previous render
    displayGrid.innerHTML = ""; 
    document.getElementById('status').innerText = "Generating high-res images...";

    for (const card of cards) {
        try {
            const canvas = await html2canvas(card, { 
                scale: 3, // High quality for printing
                logging: false,
                useCORS: true 
            });
            
            const img = new Image();
            img.src = canvas.toDataURL("image/png");
            img.className = "rendered-img";
            
            // Preview sizing
            if (card.classList.contains('monster-size')) {
                img.style.width = "450px";
            } else {
                img.style.width = "240px";
            }

            displayGrid.appendChild(img);
        } catch (error) {
            console.error("Error generating image for card:", card, error);
        }
    }
    
    document.getElementById('status').innerHTML = "✅ <b>Ready!</b> Right-click any card to save it.";
}