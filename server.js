const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Enregistrer l'image envoyée depuis le frontend
app.post('/upload-image', (req, res) => {
    const imageData = req.body.image;  // Image en base64
    const base64Data = imageData.replace(/^data:image\/png;base64,/, '');  // Enlever le préfixe data

    const filePath = path.join(__dirname, 'uploads', `${Date.now()}.png`);
    fs.writeFile(filePath, base64Data, 'base64', (err) => {
        if (err) {
            return res.status(500).send('Erreur lors de l\'enregistrement de l\'image');
        }
        res.json({ imageUrl: `http://localhost:${port}/${filePath}` });  // Retourner l'URL de l'image
    });
});

app.use(express.static('uploads')); // Permet d'accéder aux images dans le dossier "uploads"

// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
