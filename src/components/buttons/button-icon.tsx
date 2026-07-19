import { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonIconProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  "aria-label": string;
}

export default function ButtonIcon({
  children,
  className = "",
  type = "button",
  ...props
}: ButtonIconProps) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center rounded-md p-1 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
