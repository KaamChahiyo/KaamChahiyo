import React from "react";
import ItemsContainer from "./ItemsContainer";
import SocialIcons from "./SocialIcons";

export default function Footer() {
  return (
    <>
      <div className=" bg-[#0063F1] text-white w-full h-full">
        <div className="flex flex-col justify-center items-center ">
          <ItemsContainer />
        </div>
        <div
          className="  grid grid-cols-1 sm:grid-cols-2 gap-5 
      text-center pt-2 text-white text-sm pb-8"
        >
          <span>Copyright &#169; 2023 Apply. All rights reserved.</span>
          <SocialIcons />
        </div>
      </div>
    </>
  );
}
