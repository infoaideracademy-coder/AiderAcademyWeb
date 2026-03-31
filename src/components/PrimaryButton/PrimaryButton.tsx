import React from "react";
import "./style.scss";

type PrimaryButtonProps = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  className?: string;
  variant?: "primary" | "light" | "dark" | "white";
};

const PrimaryButton = ({
  children,
  type = "button",
  className = "",
  variant = "primary",
}: PrimaryButtonProps) => {
  return (
    <button
      className={`primary-button primary-button--${variant} ${className}`.trim()}
      type={type}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;
