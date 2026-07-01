import { ReactNode } from "react";

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export default function ModalBody({ children, className = "" }: ModalBodyProps) {
  return (
    <div
      className={`flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6 ${className}`.trim()}
    >
      {children}
    </div>
  );
}
