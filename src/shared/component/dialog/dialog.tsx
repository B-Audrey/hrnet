import React, { useEffect, useState } from 'react';
import './dialog.scss';
import { DialogProps } from '../../interface/props.interface.ts';

export default function Dialog({
  isCancelButton,
  isConfirmButton,
  modalContent,
  setFnState,
  setIsModalOpen,
}: DialogProps) {
  const [showClass, setShowClass] = useState('');

  /**
   * Set the show class to trigger the modal animation
   */
  useEffect(() => {
    setShowClass('show');
  }, []);

  /**
   * Handle the close button click
   * Set the show class to hide the modal
   */
  const handleCloseClick = () => {
    setShowClass('hide');
    setTimeout(() => {
      setFnState(false);
      setIsModalOpen(false);
    }, 500); // Match the transition duration
  };

  /**
   * Handle the confirm button click
   * Set the function state to true to call by the parent component
   * and close the modal
   */
  const handleConfirmFn = () => {
    setFnState(true);
    setIsModalOpen(false);
  };

  return (
    <aside id="modalBackground" className={showClass} onClick={handleCloseClick}>
      <div className="modal__foreground" onClick={e => e.stopPropagation()}>
        <div className="modal__container">
          <div className="modal__content">
            <h3 className="modalTitle">{modalContent.title}</h3>
            <div>{modalContent.content}</div>
          </div>
          <div className="modal__actions">
            {isCancelButton ? (
              <button id="cancelModal" onClick={handleCloseClick}>
                Cancel
              </button>
            ) : null}
            {isConfirmButton ? (
              <button id="confirmModal" onClick={handleConfirmFn}>
                Confirm
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}
