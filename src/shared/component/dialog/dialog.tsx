import React, { useEffect, useState } from 'react';
import './dialog.scss';

export default function Dialog({isCancelButton, isConfirmButton, modalContent, setFnState, setIsModalOpen}: ModalProps) {
    const [showClass, setShowClass] = useState('');

    useEffect(() => {
        setShowClass('show');
    }, []);

    const handleCloseClick = () => {
        setShowClass('hide');
        setTimeout(() => {
            setFnState(false);
            setIsModalOpen(false);
        }, 500); // Match the transition duration
    };

    const handleConfirmFn = () => {
        setFnState(true);
        setIsModalOpen(false);
    };

    return (
        <aside id="modalBackground" className={showClass} onClick={handleCloseClick}>
            <div className="modal__foreground" onClick={(e) => e.stopPropagation()}>
                <div className="modal__container">
                    <div className="modal__content">
                        <h3 className="modalTitle">{modalContent.title}</h3>
                        <p>{modalContent.content}</p>
                    </div>
                    <div className="modal__actions">
                        {isCancelButton ? <button id="cancelModal" onClick={handleCloseClick}>Annuler</button> : null}
                        {isConfirmButton ? <button id="confirmModal" onClick={handleConfirmFn}>Confirmer</button> : null}
                    </div>
                </div>
            </div>
        </aside>
    );
}

interface ModalProps {
    isCancelButton: boolean;
    isConfirmButton: boolean;
    modalContent: ModalContent;
    setFnState: any; // TODO : demander à Lucien comment on type le state et ses fn
    setIsModalOpen: any;
}

interface ModalContent {
    title: string;
    content: string;
}
