import { ButtonHTMLAttributes } from "react";

type BaseButtonVariant = "default" | "destructive";

interface BaseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: BaseButtonVariant;
}

const variantClasses: Record<BaseButtonVariant, string> = {
  default:
    "rounded-lg border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50 disabled:cursor-not-allowed disabled:opacity-50",
  destructive:
    "rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50",
};

export default function BaseButton({
  variant = "default",
  className = "",
  type = "button",
  ...props
}: BaseButtonProps) {
  return (
    <button
      type={type}
      className={`${variantClasses[variant]} ${className}`.trim()}
      {...props}
    />
  );
}
