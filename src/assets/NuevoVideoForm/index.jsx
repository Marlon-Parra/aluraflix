import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './style-global.css';

const NuevoVideoForm = ({ onVideoAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [src, setSrc] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [categoria, setCategoria] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar campos del formulario
    if (!title || !description || !src || !videoUrl || !categoria) {
      setError('Por favor, completa todos los campos antes de enviar.');
      return;
    }

    const embedUrl = convertToEmbedUrl(videoUrl);

    const newVideo = {
      title,
      description,
      src,
      videoUrl: embedUrl,
      categoria
    };

    console.log('Datos del nuevo video:', newVideo);

    fetch('http://dkdingenieriassas.com.co:5000/api/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newVideo)
    })
      .then(response => response.json())
      .then(data => {
        onVideoAdded(data);
        handleClear(); // Clear the form after adding the video   
        navigate("/"); 
        window.location.reload(); 
      })
      .catch(error => console.error('Error adding video:', error));
  };

  const handleClear = () => {
    setTitle('');
    setDescription('');
    setSrc('');
    setVideoUrl('');
    setCategoria('');
    setError('');
  };

  const convertToEmbedUrl = (url) => {
    const urlObj = new URL(url);
    if (urlObj.hostname === 'www.youtube.com' || urlObj.hostname === 'youtube.com') {
      if (urlObj.pathname === '/watch') {
        const videoId = urlObj.searchParams.get('v');
        return `https://www.youtube.com/embed/${videoId}`;
      } else if (urlObj.pathname.startsWith('/embed/')) {
        return url;
      } else if (urlObj.pathname.startsWith('/v/')) {
        const videoId = urlObj.pathname.split('/')[2];
        return `https://www.youtube.com/embed/${videoId}`;
      }
    } else if (urlObj.hostname === 'youtu.be') {
      const videoId = urlObj.pathname.split('/')[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <form onSubmit={handleSubmit} className="nuevo-video-form">
      <h2>Agregar Nuevo Video</h2>
      {error && <p className="error">{error}</p>}
      <label>
        Título:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Categoría:
        <select value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="" disabled>Selecciona una categoría</option>
          <option value="frontend">Front End</option>
          <option value="backend">Back End</option>
          <option value="innovacion">Innovación y Gestión</option>
        </select>
      </label>
      <label>
        URL de Imagen:
        <input type="text" value={src} onChange={(e) => setSrc(e.target.value)} />
      </label>
      <label>
        URL del Video:
        <input type="text" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
      </label>
      <label>
        Descripción:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </label>
      <button type="submit" className='agregar'>Agregar</button>
      <button type="button" onClick={handleClear} className='limpiar'>Limpiar</button>
    </form>
  );
};

export default NuevoVideoForm;
