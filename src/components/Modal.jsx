import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import './Modal.css';

export function Modal({ isOpen, onClose, title, children, size = 'md' }) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    return createPortal(
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={`modal-sheet modal-${size}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-handle" />
                <div className="modal-nav">
                    <button className="modal-nav-btn" onClick={onClose}>Hủy</button>
                    <h3 className="modal-title">{title}</h3>
                    <div style={{ width: 44 }} />
                </div>
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
}
