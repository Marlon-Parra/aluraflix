import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 5000; // Utiliza el puerto proporcionado por Vercel o 5000 por defecto

app.use(express.json());
app.use(cors());

let videos = [];

// Cargar el archivo JSON usando fs/promises
fs.readFile('./dbs.json', 'utf8')
  .then(data => {
    videos = JSON.parse(data);

    // Ruta para obtener todos los videos
    app.get('/api/videos', (req, res) => {
      res.json(videos);
    });

    // Ruta para agregar un nuevo video
    app.post('/api/videos', (req, res) => {
      const newVideo = { ...req.body, id: Date.now() };
      videos.push(newVideo);
      fs.writeFile('./dbs.json', JSON.stringify(videos, null, 2))
        .then(() => res.json(newVideo))
        .catch(err => res.status(500).json({ error: 'Error al escribir en el archivo' }));
    });

    // Ruta para eliminar un video
    app.delete('/api/videos/:id', (req, res) => {
      const videoId = parseInt(req.params.id, 10);
      videos = videos.filter(video => video.id !== videoId);
      fs.writeFile('./dbs.json', JSON.stringify(videos, null, 2))
        .then(() => res.status(204).end())
        .catch(err => res.status(500).json({ error: 'Error al escribir en el archivo' }));
    });

    // Ruta para actualizar un video
    app.put('/api/videos/:id', (req, res) => {
      const videoId = parseInt(req.params.id, 10);
      const updatedVideo = { ...req.body, id: videoId };
      videos = videos.map(video => (video.id === videoId ? updatedVideo : video));
      fs.writeFile('./dbs.json', JSON.stringify(videos, null, 2))
        .then(() => res.json(updatedVideo))
        .catch(err => res.status(500).json({ error: 'Error al escribir en el archivo' }));
    });

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error al leer el archivo dbs.json:', err);
    process.exit(1);
  });
