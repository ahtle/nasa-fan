"use client";

import { ButtonHTMLAttributes, useState } from "react";
import ButtonIcon from "@/components/buttons/button-icon";
import SvgStar from "@/components/svgs/svg-star";

interface ButtonStarProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "children"
> {
  filled?: boolean;
  defaultFilled?: boolean;
}

export default function ButtonStar({
  filled: filledProp,
  defaultFilled = false,
  className = "",
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
      {...props}
    >
      <SvgStar
        filled={filled}
        className={filled ? "text-yellow-400" : undefined}
      />
    </ButtonIcon>
  );
}
