import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './assets/Header';
import Home from './assets/Home';
import Footer from './assets/Footer';
import NuevoVideo from './assets/NuevoVideo';

const backendUrl = 'https://aluraflix-git-main-marlon-prs-projects.vercel.app';

function App() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = () => {
    fetch(`${backendUrl}/api/videos`)
      .then(response => response.json())
      .then(data => setVideos(data))
      .catch(error => console.error('Error fetching videos:', error));
  };

  const handleSaveVideo = (nuevoVideo) => {
    fetch(`${backendUrl}/api/videos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevoVideo)
    })
      .then(response => response.json())
      .then(data => setVideos([...videos, data]))
      .catch(error => console.error('Error adding video:', error));
  };

  const handleDeleteVideo = (id) => {
    fetch(`${backendUrl}/api/videos/${id}`, {
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
      })
      .catch(error => console.error('Error deleting video:', error));
  };

  const handleEditVideo = (editedVideo) => {
    fetch(`${backendUrl}/api/videos/${editedVideo.id}`, {
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
