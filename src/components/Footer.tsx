import React from "react";

export default function Footer() {
  return (
    <div className="bg-[#19134def] text-gray-400 w-full">
      <div className="flex">
        <div className=" px-10 ">
          About
          <div className="">logo</div>
          <div className="">About Text</div>
        </div>
        <div className=" px-20">Categories</div>
        <div className=" px-20">Quick links</div>
        <div className=" px-20">Location</div>
      </div>
      <div className="text-center  text-gray-50 ">
        <span>Copyright © 2023 Apply. All rights reserved.</span>
      </div>
    </div>
  );
}
