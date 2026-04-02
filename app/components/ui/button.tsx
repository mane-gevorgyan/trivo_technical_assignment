"use client";

import { forwardRef } from "react";
import { Button, type ButtonProps } from "@mui/material";
import Link from "next/link";

type ButtonComponentProps = ButtonProps<"button"> & {
  href?: string;
  children: React.ReactNode;
  onClick?: ButtonProps<"button">["onClick"];
};

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonComponentProps>(
  function ButtonComponent(
    {
      href,
      children,
      onClick,
      variant = "contained",
      color = "primary",
      ...props
    },
    ref,
  ) {
    if (href) {
      return (
        <Button
          component={Link}
          href={href}
          onClick={onClick}
          variant={variant}
          color={color}
          {...props}
        >
          {children}
        </Button>
      );
    }

    return (
      <Button
        ref={ref}
        onClick={onClick}
        variant={variant}
        color={color}
        {...props}
      >
        {children}
      </Button>
    );
  },
);

ButtonComponent.displayName = "ButtonComponent";

export default ButtonComponent;
