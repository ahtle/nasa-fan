"use client";

import { useAppSelector } from "@/stores/hooks";

interface SpinnerContentProps {
  label?: string;
  className?: string;
}

function SpinnerContent({
  label = "Loading…",
  className = "",
}: SpinnerContentProps) {
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

interface InlineLoadingSpinnerProps extends SpinnerContentProps {
  global?: false;
}

interface GlobalLoadingSpinnerProps {
  global: true;
  label?: string;
}

type LoadingSpinnerProps = InlineLoadingSpinnerProps | GlobalLoadingSpinnerProps;

function GlobalLoadingSpinner({ label }: { label?: string }) {
  const loading = useAppSelector((state) => state.main.loading);

  if (!loading) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">
      <SpinnerContent label={label} />
    </div>
  );
}

export default function LoadingSpinner({
  global,
  label,
  className,
}: LoadingSpinnerProps) {
  if (global) {
    return <GlobalLoadingSpinner label={label} />;
  }

  return <SpinnerContent label={label} className={className} />;
}
