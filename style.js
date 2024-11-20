const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');

const imageUpload = document.getElementById('imageUpload');
const topTextInput = document.getElementById('topText');
const bottomTextInput = document.getElementById('bottomText');
const downloadButton = document.getElementById('downloadMeme');
const facebookShareButton = document.getElementById('share-facebook');
const twitterShareButton = document.getElementById('share-twitter');

let uploadedImage = null;

// Fonction pour dessiner le mème sur le canvas
function drawMeme() {
    if (!uploadedImage) return;

    // Ajuste la taille du canvas en fonction de l'image
    canvas.width = uploadedImage.width;
    canvas.height = uploadedImage.height;

    // Dessine l'image sur le canvas
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

    // Calculer la taille du texte
    const fontSize = Math.floor(canvas.width / 10);
    ctx.font = `${fontSize}px Impact`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.lineWidth = fontSize / 10;
    ctx.strokeStyle = 'black';

    // Texte du haut
    ctx.fillText(topTextInput.value.toUpperCase(), canvas.width / 2, fontSize);
    ctx.strokeText(topTextInput.value.toUpperCase(), canvas.width / 2, fontSize);

    // Texte du bas
    ctx.fillText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 10);
    ctx.strokeText(bottomTextInput.value.toUpperCase(), canvas.width / 2, canvas.height - 10);
}

// Charge l'image sur le canvas lorsqu'un fichier est sélectionné
imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
        const img = new Image();
        img.onload = () => {
            uploadedImage = img;
            drawMeme();
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(file);
});

// Redessine le mème chaque fois que le texte change
topTextInput.addEventListener('input', drawMeme);
bottomTextInput.addEventListener('input', drawMeme);

// Télécharge le mème
downloadButton.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'meme.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
});

// Fonction de partage sur Facebook
facebookShareButton.addEventListener('click', (e) => {
    e.preventDefault();
    const memeUrl = canvas.toDataURL('image/png');
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(memeUrl)}`;
    window.open(shareUrl, '_blank');
});

// Fonction de partage sur Twitter
twitterShareButton.addEventListener('click', (e) => {
    e.preventDefault();
    const memeUrl = canvas.toDataURL('image/png');
    const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(memeUrl)}&text=Regardez ce mème génial!`;
    window.open(shareUrl, '_blank');
});
