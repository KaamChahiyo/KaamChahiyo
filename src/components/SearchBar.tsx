import React, { useState } from "react";
import { ILocation, getLocations } from "../services/locationService";
import { ICategory, getCategories } from "../services/categoryService";
import Button from "../components/Button";

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

  const [selectedOption, setSelectedOption] = useState(categories);
  let val = "";
  const select = (e) => {
    setValues("");
    val = e.target.value;
    console.log(val);
    val == "categories"
      ? setSelectedOption(categories)
      : setSelectedOption(locations);
  };
  const chooseOptions = selectedOption;

  return (
    <div className="flex justify-center gap-5">
      <div>
        <div className="flex rounded-full border-2 focus:border-orange-400">
          <div className="flex">
            <select className="rounded-full rounded-r-none bg-white px-5">
              <option value="categories" onClick={select}>
                Categories
              </option>
              <option value="locations" onClick={select}>
                Locations
              </option>
            </select>
          </div>

          <input
            className="w-80 px-8 py-3 rounded-l-none rounded-full focus:outline-none "
            type="text"
            value={Values}
            onChange={onChange}
            placeholder="Search By Category or Location"
          ></input>
        </div>
        <div className="rounded-lg border-red-700 flex flex-col overflow-hidden">
          {chooseOptions
            .filter((chooseOption: ICategory | ILocation) => {
              const SearchTerm = Values.toLowerCase();
              const lowerCaseData = chooseOption.displayName.toLowerCase();

              return (
                SearchTerm &&
                lowerCaseData.startsWith(SearchTerm) &&
                lowerCaseData != SearchTerm
              );
            })
            .map((chooseOption: ICategory | ILocation) => (
              <div
                onClick={() => onSearch(chooseOption.displayName)}
                key={chooseOption.id}
                className="bg-white text-black mx-5 px-3 py-2 border-b flex"
              >
                {chooseOption.displayName}
              </div>
            ))}
        </div>
      </div>

      <div>
        <Button value="Search" onClick={() => onClickBtn(Values)} />
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const categories = await getCategories();
  const locations = await getLocations();
  return { props: { categories, locations } };
}