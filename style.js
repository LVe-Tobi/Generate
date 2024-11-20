const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const imageUpload = document.getElementById('imageUpload');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const downloadButton = document.getElementById('downloadMeme');
const shareFacebook = document.getElementById('share-facebook');
const shareTwitter = document.getElementById('share-twitter');
let uploadedImage;

// Fonction pour dessiner le mème sur le canvas
function drawMeme() {
    if (!uploadedImage) return;

    canvas.width = uploadedImage.width;
    canvas.height = uploadedImage.height;

    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

    const fontSize = Math.floor(canvas.width / 10);
    ctx.font = `${fontSize}px Impact`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.lineWidth = fontSize / 10;
    ctx.strokeStyle = 'black';

    ctx.fillText(topTextInput.value.toUpperCase(), canvas.width / 2, 50);
    ctx.strokeText(topTextInput.value.toUpperCase(), canvas.width / 2, 50);

    ctx.fillText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 50);
    ctx.strokeText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 50);
}

// Fonction pour obtenir l'URL du mème
function getMemeImageUrl() {
    return canvas.toDataURL('image/png');  // Retourne l'URL de l'image du canvas
}

// Fonction pour mettre à jour les liens de partage
function updateShareLinks() {
    const memeImageUrl = getMemeImageUrl();

    // Partage sur Facebook
    shareFacebook.href = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(memeImageUrl)}`;

    // Partage sur Twitter
    shareTwitter.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(memeImageUrl)}&text=${encodeURIComponent('Voici mon mème !')} `;
}

// Écouteur pour charger l'image
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            uploadedImage = img;
            drawMeme();
            updateShareLinks();  // Met à jour les liens de partage après avoir chargé l'image
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

// Redessiner le mème lorsque le texte est modifié
topTextInput.addEventListener('input', () => {
    drawMeme();
    updateShareLinks();  // Met à jour les liens de partage lorsque le texte est modifié
});
bottomTextInput.addEventListener('input', () => {
    drawMeme();
    updateShareLinks();  // Met à jour les liens de partage lorsque le texte est modifié
});

// Fonction pour télécharger le mème
downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = getMemeImageUrl();
    link.click();
});
