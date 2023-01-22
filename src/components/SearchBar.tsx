import React, { useState } from "react";
// import { categories } from "../lib/categories";

export default function SearchBar({ placeHolder, data }) {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (searchTerm) => {
    setValue(searchTerm);
    console.log("search ", searchTerm);
  };

  return (
    <div className="SearchBar">
      <div>
        <input
          className="px-8 py-3 rounded-full w-[100%] focus:outline-none focus:shadow-outline focus:border-orange-400 border-2"
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeHolder}
          // onKeyUp={() => onSearch(value)}
        ></input>
      </div>
      <div>
        {data
          .filter((item) => {
            const searchTerm = value.toLowerCase();
            const lowerCaseData = item.fname.toLowerCase();

            return (
              searchTerm &&
              lowerCaseData.startsWith(searchTerm) &&
              lowerCaseData != searchTerm
            );
          })
          .map((item) => (
            <div onClick={() => onSearch(item.fname)} key={item.fname}>
              {item.fname}
            </div>
          ))}
      </div>
    </div>
  );
}
