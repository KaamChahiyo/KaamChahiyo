import React from "react";

export default function Button({ value, onClick }: any) {
  let className =
    "flex rounded-md bg-[#0063F1] text-white text-lg font-medium px-6 py-2.5 border-2 border-[#0063F1] hover:bg-white hover:font-medium hover:text-[#0063F1] cursor-pointer";
  if (value == "Search") {
    className =
      "flex rounded-full bg-[#0063F1] text-white text-lg font-medium px-6 py-2.5 border-2 border-[#0063F1] hover:bg-white hover:font-medium hover:text-[#0063F1] cursor-pointer";
  } else if (value == "Post Job") {
    className =
      "flex rounded-md bg-[#0063F1] text-white text-lg font-medium px-9 py-4 sm:w-full border-2 border-[#0063F1] hover:bg-white hover:text-[#0063F1] cursor-pointer";
  }
  return (
    <div>
      <input
        type="button"
        value={value}
        className={className}
        onClick={onClick}

      />
    </div>
  );
}
