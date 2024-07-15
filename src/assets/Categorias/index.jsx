import React, { useState } from 'react';
import './style-global.css';
import EditForm from '../EditForm';
import ConfirmationModal from '../ConfirmationModal';

const Categorias = ({ title, colorClass, videos, handleEdit, handleDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [editFormPosition, setEditFormPosition] = useState({ top: 0, left: 0 });
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);

  const handleEditClick = (video, event) => {
    setCurrentVideo(video);
    setIsEditing(true);
    const buttonRect = event.target.getBoundingClientRect();
    setEditFormPosition({
      top: buttonRect.bottom + window.scrollY + 10,
      left: buttonRect.left + window.scrollX,
    });
  };

  const handleSave = (updatedVideo) => {
    handleEdit(updatedVideo);
    setIsEditing(false);
    setCurrentVideo(null);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setCurrentVideo(null);
  };

  const handlePlayVideo = (videoUrl) => {
    setCurrentVideo(videoUrl);
  };

  const handleDeleteClick = (video) => {
    setVideoToDelete(video);
    setShowConfirmationModal(true);
  };

  const confirmDelete = () => {
    handleDelete(videoToDelete.id);
    setVideoToDelete(null);
    setShowConfirmationModal(false);
  };

  const cancelDelete = () => {
    setVideoToDelete(null);
    setShowConfirmationModal(false);
  };

  const getCategoryClass = (categoria) => {
    switch (categoria.toLowerCase()) {
      case 'front end':
        return 'front-end';
      case 'back end':
        return 'back-end';
      case 'innovación y gestión':
        return 'innovacion';
      default:
        return '';
    }
  };

  return (
    <div className='contener-principal-categorias'>
      <div className={`spanCategorias ${colorClass}`}>
        <h1 className='nombreCategoria'>{title}</h1>
      </div>
      <div className='contenedor-principal'>
        {videos.map(video => (
          <div className={`cajaDeVideos ${getCategoryClass(video.categoria)}`} key={video.id}>
            {currentVideo === video.videoUrl ? (
              <div className='video-container'>
                <button className='close-video' onClick={() => setCurrentVideo(null)}>Cerrar</button>
                <iframe
                  title='Video Player'
                  width='429.19'
                  height='260.85'
                  src={video.videoUrl}
                  frameBorder='0'
                  allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                  allowFullScreen
                />
              </div>
            ) : (
              <img
                src={video.src}
                alt={video.title}
                className='imagenVideo'
                onClick={() => handlePlayVideo(video.videoUrl)}
              />
            )}
            <div className='container-buttons'>
              <button className='button borrar' onClick={() => handleDeleteClick(video)}>BORRAR</button>
              <button
                className='button editar'
                onClick={(event) => handleEditClick(video, event)}
              >
                EDITAR
              </button>
            </div>
          </div>
        ))}
      </div>
      {isEditing && currentVideo && (
        <EditForm
          video={currentVideo}
          onSave={handleSave}
          onCancel={handleCancel}
          position={editFormPosition}
        />
      )}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onCancel={cancelDelete}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default Categorias;
