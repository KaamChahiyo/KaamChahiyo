import React, { useState } from "react";
// import { categories } from "../lib/categories";

export default function SearchBar({
  placeHolder,
  data,
}: {
  placeHolder: string;
  data: any;
}) {
  const [value, setValue] = useState("");

  const onChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm: string) => {
    setValue(searchTerm);
    console.log("search ", searchTerm);
  };

  return (
    <div>
      <div>
        <input
          className="px-8 py-3 rounded-full w-[100%] focus:outline-none focus:shadow-outline focus:border-orange-400 border-2"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
        ></input>
      </div>
      <div className="rounded-lg border-red-700 flex flex-col">
        {data
          .filter((item: { filterItem: string }) => {
            const searchTerm = value.toLowerCase();
            const lowerCaseData = item.filterItem.toLowerCase();

            return (
              searchTerm &&
              lowerCaseData.startsWith(searchTerm) &&
              lowerCaseData != searchTerm
            );
          })
          .map((item: { filterItem: string }) => (
            <div
              onClick={() => onSearch(item.filterItem)}
              key={item.filterItem}
              className="bg-white text-black mx-5 px-3 py-2 border-b flex"
            >
              {item.filterItem}
            </div>
          ))}
      </div>
    </div>
  );
}
