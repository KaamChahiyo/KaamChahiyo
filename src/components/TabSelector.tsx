import React from "react";

export const TabSelector = ({
  isActive,
  children,
  onClick,
}: {
  isActive: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <div className="container">
    <div
      className={`hidden group lg:flex w-5/6 p-2 gap-0 lg:gap-5 rounded-md cursor-pointer ${isActive
        ? "lg:text-white lg:bg-blue-300"
        : "lg:bg-gray-100 text-gray-600"
        }`}
      onClick={onClick}
    >
      {children}
    </div>
    <button
      className={`mr-8 lg:hidden group inline-flex items-center px-2 py-4 border-b-2 font-medium text-sm leading-5 cursor-pointer whitespace-nowrap ${isActive
        ? "border-blue-500 text-blue-500 focus:outline-none focus:text-blue-500 focus:border-blue-500"
        : "border-transparent text-gray-500 hover:text-gray-600 hover:border-gray-300 focus:text-gray-600 focus:border-gray-300"
        }`}
      onClick={onClick}
    >
      {children}
    </button>
  </div>
);
