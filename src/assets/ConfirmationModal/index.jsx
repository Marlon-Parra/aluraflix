import React from 'react';
import './style-global.css';

const ConfirmationModal = ({ isOpen, onCancel, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>¿Estás seguro de que quieres eliminar este producto?</p>
        <div className="modal-buttons">
          <button onClick={onCancel}>Cancelar</button>
          <button onClick={onConfirm}>Sí</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
