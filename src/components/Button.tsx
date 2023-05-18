import classNames from "classnames";
import React, { ReactEventHandler, ReactNode } from "react";

interface ButtonProps {
  varient?: "Search" | "passwordUpdate";
  disabled?: boolean;
  children?: ReactNode;
  onClick?: ReactEventHandler;
}

const Button = ({
  varient,
  onClick,
  disabled = false,
  children,
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={classNames(
        "flex items-center justify-center w-fit bg-blue-600 text-white text-lg font-medium border-2 border-blue-600 hover:bg-white hover:font-medium hover:text-blue-600 ",
        {
          "rounded-full h-12 py-6 px-6 cursor-pointer": varient === "Search",

          "h-16 px-6 py-2 rounded-md cursor-not-allowed":
            varient == "passwordUpdate",
          "h-16 px-6 py-2 rounded-md cursor-pointer":
            varient == "passwordUpdate" && disabled === false,

          "h-16 px-6 py-2 cursor-pointer rounded-md":
            varient !== "Search" && varient !== "passwordUpdate",
        }
      )}
    >
      {children}
    </button>
  );
};

export default Button;
