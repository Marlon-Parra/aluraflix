import React from 'react';
import './style-global.css';
import NuevoVideoForm from '../NuevoVideoForm';

const NuevoVideo = ({ onSave }) => {
  return (
    <div className="nuevo-video-container">
      <h1 className='titulo'>NUEVO VIDEO</h1>
      <p className='formulario-parrafo'>Complete el formulario para crear una nueva tarjeta de video.</p>
      <div className="crear-tarjeta">
        <NuevoVideoForm onVideoAdded={onSave} />
      </div>
    </div>
  );
};

export default NuevoVideo;
