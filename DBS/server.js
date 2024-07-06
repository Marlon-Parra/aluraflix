import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000; // Puerto predeterminado o desde las variables de entorno

app.use(express.json());
app.use(cors());

let videos = [];

// Cargar el archivo JSON usando fs/promises
fs.readFile('./dbs.json', 'utf8')
  .then(data => {
    videos = JSON.parse(data);

    // Rutas para manejar videos
    app.get('/api/videos', (req, res) => {
      res.json(videos);
    });

    app.post('/api/videos', (req, res) => {
      const newVideo = { ...req.body, id: Date.now() };
      videos.push(newVideo);
      fs.writeFile('./dbs.json', JSON.stringify(videos, null, 2))
        .then(() => res.json(newVideo))
        .catch(err => res.status(500).json({ error: 'Error al escribir en el archivo' }));
    });

    app.delete('/api/videos/:id', (req, res) => {
      const videoId = parseInt(req.params.id, 10);
      videos = videos.filter(video => video.id !== videoId);
      fs.writeFile('./dbs.json', JSON.stringify(videos, null, 2))
        .then(() => res.status(204).end())
        .catch(err => res.status(500).json({ error: 'Error al escribir en el archivo' }));
    });

    app.put('/api/videos/:id', (req, res) => {
      const videoId = parseInt(req.params.id, 10);
      const updatedVideo = { ...req.body, id: videoId };
      videos = videos.map(video => (video.id === videoId ? updatedVideo : video));
      fs.writeFile('./dbs.json', JSON.stringify(videos, null, 2))
        .then(() => res.json(updatedVideo))
        .catch(err => res.status(500).json({ error: 'Error al escribir en el archivo' }));
    });

    // Inicia el servidor
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error al leer el archivo dbs.json:', err);
    process.exit(1);
  });
