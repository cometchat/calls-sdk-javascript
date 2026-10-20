import { useEffect, useRef, type ReactNode } from 'react';
import { Icon } from './Icon';

/**
 * A modal sheet with a title and a close button: full screen on a phone, a centred panel on a
 * wider screen. Escape and the backdrop close it.
 */
export function Dialog({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-label={title}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === ref.current) onClose();
      }}
    >
      <div className="sheet__body">
        <header className="sheet__header">
          <button
            type="button"
            className="icon-button plain"
            aria-label="Close"
            onClick={onClose}
          >
            <Icon name="back" />
          </button>
          <h2 className="body-strong">{title}</h2>
        </header>
        <div className="sheet__content">{children}</div>
      </div>
    </dialog>
  );
}
