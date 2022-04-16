import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, onToggle }) => {
  // custom add/remove event listener for keydown:
  useEffect(function setUpListener() {
    window.addEventListener('keydown', handleKeyDown);
    function handleKeyDown(event) {
      if (event.code === 'Escape') {
        onToggle();
      }
    }

    return function cleanUpKeyDown() {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onToggle();
    }
  };

  return createPortal(
    <div className={s.modal_backdrop} onClick={handleBackdropClick}>
      <div className={s.modal_content}>{children}</div>
    </div>,
    modalRoot,
  );
};

export default Modal;
