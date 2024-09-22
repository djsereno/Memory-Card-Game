import React from 'react';
import '../styles/Modal.css';

interface ModalProps {
  heading: string;
  description: string;
  // onClose: () => void;
  onAction: () => void;
}

const Modal: React.FC<ModalProps> = ({ heading, description, onAction }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        {/* <span className="close-button" onClick={onClose}>
          &times;
        </span> */}
        <h2>{heading}</h2>
        <p>{description}</p>
        <button onClick={onAction}>Start New Game</button>
      </div>
    </div>
  );
};

export default Modal;
