import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './assets/Header';
import Start from './assets/Start';
import Categorias from './assets/Categorias';
import Footer from './assets/Footer';
import NuevoVideo from './assets/NuevoVideo';

function Home({ videos, handleEdit, handleDelete }) {
  const frontendVideos = videos.filter(video => video.categoria.toLowerCase() === 'frontend');
  const backendVideos = videos.filter(video => video.categoria.toLowerCase() === 'backend');
  const innovacionVideos = videos.filter(video => video.categoria.toLowerCase() === 'innovacion');

  return (
    <>
      <Start />
      <Categorias title="FRONT END" colorClass="blue" videos={frontendVideos} handleEdit={handleEdit} handleDelete={handleDelete} />
      <Categorias title="BACK END" colorClass="green" videos={backendVideos} handleEdit={handleEdit} handleDelete={handleDelete} />
      <Categorias title="INNOVACIÓN Y GESTIÓN" colorClass="yellow" videos={innovacionVideos} handleEdit={handleEdit} handleDelete={handleDelete} />
    </>
  );
}

function App() {
  const [videos, setVideos] = useState([]);
  const API_URL = 'http://localhost:5000/api/videos';

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching videos:', error));
  };

  const handleSaveVideo = (nuevoVideo) => {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoVideo)
    })
      .then(response => response.json())
      .then(data => setVideos(prevVideos => {
        // Evita duplicados verificando si el ID ya existe
        const videoExists = prevVideos.some(video => video.id === data.id);
        if (videoExists) {
          return prevVideos;
        } else {
          return [...prevVideos, data];
        }
      }))
      .catch(error => console.error('Error adding video:', error));
  };

  const handleDeleteVideo = (id) => {
    console.log(`Deleting video with id: ${id}`);
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        setVideos(videos.filter(video => video.id !== id));
        console.log('Updated videos list in state:', videos.filter(video => video.id !== id));
      })
      .catch(error => console.error('Error deleting video:', error));
  };

  const handleEditVideo = (editedVideo) => {
    fetch(`${API_URL}/${editedVideo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(editedVideo)
    })
      .then(response => response.json())
      .then(data => {
        setVideos(prevVideos => prevVideos.map(video => (video.id === data.id ? data : video)));
      })
      .catch(error => console.error('Error updating video:', error));
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home videos={videos} handleEdit={handleEditVideo} handleDelete={handleDeleteVideo} />} />
        <Route path="/nuevo-video" element={<NuevoVideo onSave={handleSaveVideo} />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;