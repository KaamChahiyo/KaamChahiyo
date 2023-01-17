import React from "react";
import ItemsContainer from "./ItemsContainer";

export default function Footer() {
  return (
    <div className="bg-[#19134def] text-gray-300 w-full h-full">
      <ItemsContainer />
      <div className=" grid grid-cols-1 text-center  text-gray-50 ">
        <span>Copyright © 2023 Apply. All rights reserved.</span>
      </div>
    </div>
  );
}
