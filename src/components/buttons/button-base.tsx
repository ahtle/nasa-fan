import { ButtonHTMLAttributes } from "react";

type ButtonBaseVariant = "default" | "destructive";

interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonBaseVariant;
}

const variantClasses: Record<ButtonBaseVariant, string> = {
  default:
    "border border-zinc-200 bg-white text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50",
  destructive:
    "bg-red-600 text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50",
};

export default function ButtonBase({
  variant = "default",
  className = "",
  type = "button",
  ...props
}: ButtonBaseProps) {
  return (
    <button
      type={type}
      className={`rounded-lg px-4 py-2 text-sm font-medium cursor-pointer
        ${variantClasses[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
