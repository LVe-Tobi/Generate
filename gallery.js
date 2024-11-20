window.onload = async function() {
    try {
        const response = await fetch('http://localhost:3000/get-memes');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des mèmes');
        }
        const memes = await response.json();
        
        const gallery = document.getElementById('gallery');

        memes.forEach(meme => {
            const memeElement = document.createElement('div');
            memeElement.classList.add('meme');
            
            const img = document.createElement('img');
            img.src = meme.image_url;
            memeElement.appendChild(img);

            const topText = document.createElement('p');
            topText.textContent = meme.top_text;
            memeElement.appendChild(topText);

            const bottomText = document.createElement('p');
            bottomText.textContent = meme.bottom_text;
            memeElement.appendChild(bottomText);

            gallery.appendChild(memeElement);
        });
    } catch (error) {
        console.error('Erreur:', error);
    }
};
