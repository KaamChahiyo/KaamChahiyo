import React from "react";

export default function Footer() {
  return (
    <div className="bg-[#19134def] text-gray-300 w-full">
      <div className="flex">
        <div className="py-5 px-10 ">
          <span className="text-base hover:text-red-500 ">About</span>
          <div className="text-grey-300 py-2 hover:text-green-400">logo</div>
          <div className=" w-auto h-auto text-grey-300 hover:text-green-400  ">
            About Text
          </div>
        </div>
        <div className=" text-base hover:text-red-500 px-20 py-5">
          Categories
        </div>
        <div className=" text-base hover:text-red-500 px-20 py-5">
          Quick links
        </div>
        <div className="text-base hover:text-red-500  px-20 py-5">Location</div>
      </div>
      <div className="text-center  text-gray-50 ">
        <span>Copyright © 2023 Apply. All rights reserved.</span>
      </div>
    </div>
  );
}
