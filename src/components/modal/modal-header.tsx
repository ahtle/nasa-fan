interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

export default function ModalHeader({ title, onClose }: ModalHeaderProps) {
  return (
    <div className="flex shrink-0 items-start justify-between gap-4 border-b border-zinc-200 px-4 py-3 md:px-6 md:py-4">
      <h2 id="modal-title" className="min-w-0 text-lg font-semibold text-zinc-900">
        {title}
      </h2>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="shrink-0 rounded-md p-1 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700"
      >
        <span aria-hidden className="text-2xl leading-none">
          &times;
        </span>
      </button>
    </div>
  );
}
