import { useEffect, useRef, type ReactNode } from 'react';

/**
 * A full-screen modal in the browser's top layer, so it shows above anything already open
 * (the profile, call details). The ringing screens and the call use it: a call must never ring
 * behind another dialog. Escape calls `onEscape`, or does nothing without it.
 */
export function TopLayer({
  className,
  label,
  labelledBy,
  describedBy,
  role,
  onEscape,
  children,
}: {
  className: string;
  label?: string;
  labelledBy?: string;
  describedBy?: string;
  role?: 'alertdialog';
  onEscape?: () => void;
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
      className={`top-layer ${className}`}
      role={role}
      aria-label={label}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      onCancel={(e) => {
        e.preventDefault();
        onEscape?.();
      }}
    >
      {children}
    </dialog>
  );
}
