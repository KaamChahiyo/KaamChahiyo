import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <div className=" bg-gradient-to-r from-emerald-700 to-emerald-800 text-gray-300 w-full h-full">
      <div className="flex flex-col justify-center items-center ">
        <ItemsContainer />
      </div>
      <div
        className="  grid grid-cols-1 sm:grid-cols-2 gap-5 
      text-center pt-2 text-gray-50 text-sm pb-8"
      >
        <span>Copyright &#169; 2023 Apply. All rights reserved.</span>
        <SocialIcons />
      </div>
    </div>
  );
}
