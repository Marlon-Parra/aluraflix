import React, { useState, useEffect } from 'react';
import InputField from '../InputField';
import './style-global.css';

const EditForm = ({ video, onSave, onCancel }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    setTitle(video.title);
    setCategory(video.categoria);
    setImage(video.src);
    setVideoUrl(video.videoUrl);
    setDescription(video.description);
  }, [video]);

  const handleSave = () => {
    const updatedVideo = {
      ...video,
      title,
      categoria: category,
      src: image,
      videoUrl: convertToEmbedUrl(videoUrl), // Convert videoUrl to embed URL
      description,
    };
    onSave(updatedVideo);
  };

  const clearForm = () => {
    setTitle('');
    setCategory('');
    setImage('');
    setVideoUrl('');
    setDescription('');
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
    <div className="edit-form-container">
      <div className="edit-form">
        <button className="close-btn" onClick={onCancel}>X</button>
        <h2>EDITAR VIDEO</h2>
        <InputField
          id="title"
          label="Título"
          placeholder="¿Qué es JavaScript?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="innovacion">Innovación y gestión</option>
          </select>
        </div>
        <InputField
          id="image"
          label="Imagen"
          placeholder="URL de la imagen"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <InputField
          id="video"
          label="URL del video"
          placeholder="URL del video"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
        />
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            placeholder="Descripción del video"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="description-input"
            required
          />
        </div>
        <div className="form-buttons">
          <button className="clear-btn" onClick={clearForm}>Limpiar</button>
          <button className="submit-btn" type="button" onClick={handleSave}>Guardar</button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
