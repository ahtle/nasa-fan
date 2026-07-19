type SvgStarSize = "sm" | "md" | "lg";

interface SvgStarProps {
  filled?: boolean;
  size?: SvgStarSize;
  className?: string;
}

const sizeClasses: Record<SvgStarSize, string> = {
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
};

export default function SvgStar({
  filled = false,
  size = "md",
  className = "",
}: SvgStarProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      aria-hidden
      className={`${sizeClasses[size]} ${className}`.trim()}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinejoin="round"
    >
      <path d="M12 2.5l2.83 5.73 6.32.92-4.57 4.46 1.08 6.29L12 16.9l-5.66 2.98 1.08-6.29-4.57-4.46 6.32-.92L12 2.5z" />
    </svg>
  );
}
