"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import ModalBody from "./modal-body";
import ModalHeader from "./modal-header";

interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export default function BaseModal({
  open,
  onClose,
  title,
  children,
}: BaseModalProps) {
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex md:items-center md:justify-center md:p-4">
      <button
        type="button"
        aria-label="Close modal"
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 flex h-full w-full flex-col bg-white md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-2xl md:shadow-xl"
      >
        <ModalHeader title={title} onClose={onClose} />
        <ModalBody>{children}</ModalBody>
      </div>
    </div>,
    document.body,
  );
}
