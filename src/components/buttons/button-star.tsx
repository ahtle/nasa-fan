"use client";

import { ButtonHTMLAttributes, useState } from "react";
import ButtonIcon from "@/components/buttons/button-icon";
import SvgStar from "@/components/svgs/svg-star";

interface ButtonStarProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  filled?: boolean;
  defaultFilled?: boolean;
  onFilledChange?: (filled: boolean) => void;
}

export default function ButtonStar({
  filled: filledProp,
  defaultFilled = false,
  onFilledChange,
  className = "",
  onClick,
  ...props
}: ButtonStarProps) {
  const [uncontrolledFilled, setUncontrolledFilled] = useState(defaultFilled);
  const isControlled = filledProp !== undefined;
  const filled = isControlled ? filledProp : uncontrolledFilled;

  return (
    <ButtonIcon
      aria-label={filled ? "Unfavorite" : "Favorite"}
      aria-pressed={filled}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) {
          return;
        }

        const next = !filled;
        if (!isControlled) {
          setUncontrolledFilled(next);
        }
        onFilledChange?.(next);
      }}
      {...props}
    >
      <SvgStar
        filled={filled}
        className={filled ? "text-yellow-400" : undefined}
      />
    </ButtonIcon>
  );
}
