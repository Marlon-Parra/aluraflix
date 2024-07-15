const express = require('express');
const fs = require('fs/promises');
const cors = require('cors');
const path = require('path');
const { fileURLToPath } = require('url');

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

const dataFilePath = path.join(__dirname, '..', 'data.json');

let videos = [];

// Carga el archivo JSON utilizando fs/promises
const loadVideos = async () => {
  try {
    const data = await fs.readFile(dataFilePath, 'utf8');
    videos = JSON.parse(data);
  } catch (err) {
    console.error('Error al leer el archivo data.json:', err);
    process.exit(1);
  }
};

loadVideos();

// Ruta para obtener todos los videos
app.get('/api/videos', (req, res) => {
  res.json(videos);
});

// Ruta para agregar un nuevo video
app.post('/api/videos', async (req, res) => {
  const newVideo = { ...req.body, id: Date.now() };
  videos.push(newVideo);
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(videos, null, 2));
    res.json(newVideo);
  } catch (err) {
    res.status(500).json({ error: 'Error al escribir en el archivo' });
  }
});

// Ruta para eliminar un video
app.delete('/api/videos/:id', async (req, res) => {
  const videoId = parseInt(req.params.id, 10);
  console.log(`Deleting video with id: ${videoId}`);
  videos = videos.filter(video => video.id !== videoId);
  console.log('Updated videos list:', videos);
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(videos, null, 2));
    res.status(204).end();
  } catch (err) {
    console.error('Error al escribir en el archivo:', err);
    res.status(500).json({ error: 'Error al escribir en el archivo' });
  }
});

// Ruta para actualizar un video
app.put('/api/videos/:id', async (req, res) => {
  const videoId = parseInt(req.params.id, 10);
  const updatedVideo = { ...req.body, id: videoId };
  videos = videos.map(video => video.id === videoId ? updatedVideo : video);
  try {
    await fs.writeFile(dataFilePath, JSON.stringify(videos, null, 2));
    res.json(updatedVideo);
  } catch (err) {
    res.status(500).json({ error: 'Error al escribir en el archivo' });
  }
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});