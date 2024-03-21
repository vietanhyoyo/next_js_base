import React from "react";
import Image from "next/image";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  icon?: any;
  className?: string;
  type?: "button" | "submit" | "reset";
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  icon,
  className = "",
  type = "button",
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`border-2 border-primary px-2 py-1 rounded-md text-white bg-primary hover:bg-primary800 focus:outline-none focus:bg-primary800 ${className}`}
    >
      <div className="flex items-center justify-center">
        {icon && (
            <span className="mr-2" style={{ marginLeft: "-6px" }}>
              <Image src={icon} alt="svg-icon" width={20} height={20} />
            </span>
        )}
        {children}
      </div>
    </button>
  );
};

export default Button;
