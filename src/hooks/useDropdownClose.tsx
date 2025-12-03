import { useEffect, useRef } from 'react';

type UseDropdownClosePropsType = {
  isOpen: boolean;
  onClose: () => void;
  ignoredElement: string;
};

export default function useDropdownClose({
  isOpen,
  onClose,
  ignoredElement,
}: UseDropdownClosePropsType) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    function handleClose(e: MouseEvent | TouchEvent) {
      const target = e.target as Node;

      if (
        target instanceof Element &&
        ignoredElement &&
        target.closest(ignoredElement)
      ) {
        return;
      }

      if (ref.current && !ref.current.contains(target)) {
        onClose();
      }
    }

    function handleEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }

    document.addEventListener('mousedown', handleClose);
    document.addEventListener('touchstart', handleClose);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('mousedown', handleClose);
      document.removeEventListener('touchstart', handleClose);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, onClose, ignoredElement]);

  return ref;
}
