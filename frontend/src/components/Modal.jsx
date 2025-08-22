import React from 'react';
import { modalStyles as styles } from '../assets/dummystyle';
import {X} from 'lucide-react';

const Modal = ({ children, isOpen, onClose, title, hideheader,showActionBtn,actionBtnIcon=null,showActionBtnText,onActionClick=()=>{}, }) => {
  if (!isOpen) return null; // Don't render if not open

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        {!hideheader && (
          <div className={styles.header}>
            <h3 className={styles.title}>{title}</h3>
            {showActionBtn && (
              <button className={styles.actionButton} onClick={onActionClick}>{actionBtnIcon}
              {showActionBtnText}</button>
            )}
          </div>
        )}
        <button type='button' className={styles.closeButton} onClick={onClose}>
          <X size={24}/>
        </button>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
