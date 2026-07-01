interface LoadingSpinnerProps {
  label?: string;
  className?: string;
}

export default function LoadingSpinner({
  label = "Loading…",
  className = "",
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      className={`flex items-center gap-3 ${className}`.trim()}
    >
      <span
        className="inline-block size-5 animate-spin rounded-full border-2 border-zinc-200 border-t-nasa-blue"
        aria-hidden
      />
      <span className="text-sm text-zinc-600">{label}</span>
    </div>
  );
}
