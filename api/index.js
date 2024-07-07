import express from 'express';
import fs from 'fs/promises';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

let videos;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataFilePath = path.join(__dirname, '..', 'data.json');

// Carga el archivo JSON utilizando fs/promises
fs.readFile(dataFilePath, 'utf8')
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
      fs.writeFile(dataFilePath, JSON.stringify(videos, null, 2))
        .then(() => res.json(newVideo))
        .catch(err => res.status(500).json({ error: 'Error al escribir en el archivo' }));
    });

    // Ruta para eliminar un video
    app.delete('/api/videos/:id', (req, res) => {
      const videoId = parseInt(req.params.id, 10);
      videos = videos.filter(video => video.id !== videoId);
      fs.writeFile(dataFilePath, JSON.stringify(videos, null, 2))
        .then(() => res.status(204).end())
        .catch(err => res.status(500).json({ error: 'Error al escribir en el archivo' }));
    });

    // Ruta para actualizar un video
    app.put('/api/videos/:id', (req, res) => {
      const videoId = parseInt(req.params.id, 10);
      const updatedVideo = { ...req.body, id: videoId };
      videos = videos.map(video => video.id === videoId ? updatedVideo : video);
      fs.writeFile(dataFilePath, JSON.stringify(videos, null, 2))
        .then(() => res.json(updatedVideo))
        .catch(err => res.status(500).json({ error: 'Error al escribir en el archivo' }));
    });

    // Inicia el servidor
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch(err => {
    console.error('Error al leer el archivo data.json:', err);
    process.exit(1);
  });
