import { useEffect, useRef } from "react";
import "@/styles/Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // useEffect : Bloquer le scroll du body quand le modal est ouvert
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Focus sur le modal pour l'accessibilité
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup : restaure le scroll quand le composant se démonte
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // useEffect : Fermer avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalRef}
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Empêche la fermeture en cliquant dans le modal
        tabIndex={-1}
      >
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="modal-close" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}
