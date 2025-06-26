import { useEffect } from 'react'
import { createPortal } from 'react-dom'

export function Modal({ children, onClose }) {
  // Close on ESC
  useEffect(() => {
    const onKey = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  // Close on backdrop click
  const handleBackdrop = e => {
    if (e.target.classList.contains('modal-backdrop')) onClose()
  }

  return createPortal(
    <div className="modal-backdrop" onClick={handleBackdrop}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}
