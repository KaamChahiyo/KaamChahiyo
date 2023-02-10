import React, { useState } from "react";
import { ILocation, getLocations } from "../services/locationService";
import { ICategory, getCategories } from "../services/categoryService";

export default function SearchBar({ locations, categories }) {
  const [Values, setValues] = useState("");
  const onChange = (e: { target: { value: string } }) => {
    setValues(e.target.value);
  };

  const onSearch = (SearchTerm: string) => {
    setValues(SearchTerm);
  };

  const onClickBtn = (SearchTerm: string) => {
    console.log(SearchTerm);
  };

  const [selectedOption, setSelectedOption] = useState("categories");
  const select = (e) => {
    setSelectedOption(e.target.value);
    console.log(e.target.value);
  };

  return (
    <div className="flex justify-center gap-5">
      <div>
        <div className="flex">
          <div className="flex">
            <select className="rounded-full rounded-r-none bg-white px-8">
              <option value="categories" onClick={select}>
                Categories
              </option>
              <option value="location" onClick={select}>
                Locations
              </option>
            </select>
          </div>

          <input
            className="w-96 px-8 py-3 rounded-l-none rounded-full focus:outline-none focus:shadow-outline focus:border-orange-400 "
            type="text"
            value={Values}
            onChange={onChange}
            placeholder="Search By Category or Location"
          ></input>
        </div>
        <div className="rounded-lg border-red-700 flex flex-col overflow-hidden">
          {selectedOption === "categories"
            ? categories
              .filter((category: ICategory) => {
                const SearchTerm = Values.toLowerCase();
                const lowerCaseData = category.displayName.toLowerCase();

                return (
                  SearchTerm &&
                  lowerCaseData.startsWith(SearchTerm) &&
                  lowerCaseData != SearchTerm
                );
              })
              .map((category: ICategory) => (
                <div
                  onClick={() => onSearch(category.displayName)}
                  key={category.id}
                  className="bg-white text-black mx-5 px-3 py-2 border-b flex"
                >
                  {category.displayName}
                </div>
              ))
            : locations
              .filter((location: ILocation) => {
                const SearchTerm = Values.toLowerCase();
                const lowerCaseData = location.displayName.toLowerCase();
                return (
                  SearchTerm &&
                  lowerCaseData.startsWith(SearchTerm) &&
                  lowerCaseData !== SearchTerm
                );
              })
              .map((location: ILocation) => (
                <div
                  onClick={() => onSearch(location.displayName)}
                  key={location.id}
                  className="bg-white text-black mx-5 px-3 py-2 border-b flex"
                >
                  {location.displayName}
                </div>
              ))}
        </div>
      </div>

      <div>
        <input
          type="button"
          value="Search"
          className="flex rounded-full bg-[#0063F1] text-white text-lg hover:bg-[#113d7a] px-8 py-2.5"
          onClick={() => onClickBtn(Values)}
        />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const categories = await getCategories();
  const locations = await getLocations();
  return { props: { categories, locations } };
}
