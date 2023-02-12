import React from "react";

export default function Button({value, onClick}:any) {
  // let className ="flex rounded-md bg-[#0063F1] text-white text-lg font-medium px-6 py-2.5 border-2 border-[#0063F1] hover:bg-white hover:font-medium hover:text-[#0063F1] hover:border-2";
  // if(value == "Search") {
  //   className="flex rounded-full bg-[#0063F1] text-white text-lg font-medium px-6 py-2.5 border-2 border-[#0063F1] hover:bg-white hover:font-medium hover:text-[#0063F1] hover:border-2"
  // }
  return (
    <div>
        <input
          type="button"
          value={value}          
          //className={className}
          className={value !== "Search" ? 
            "flex rounded-md bg-[#0063F1] text-white text-lg font-medium px-6 py-2.5 border-2 border-[#0063F1] hover:bg-white hover:font-medium hover:text-[#0063F1] hover:border-2" :
            "flex rounded-full bg-[#0063F1] text-white text-lg font-medium px-6 py-2.5 border-2 border-[#0063F1] hover:bg-white hover:font-medium hover:text-[#0063F1] hover:border-2"}
          onClick={onClick}
        />
    </div>
  );
}
