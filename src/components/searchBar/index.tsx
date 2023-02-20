import React, { useState } from "react";
import { ICategory, getCategories } from "../../services/categoryService";
import { ILocation, getLocations } from "../../services/locationService";
import Button from "../Button";
import Link from "next/link";

export default function SearchBar({ locations, categories }) {
  const [Values, setValues] = useState("");
  const onChange = (e: { target: { value: string } }) => {
    setValues(e.target.value);
  };

  const onSearch = (SearchTerm: string) => {
    window.location.href = `/search/${SearchTerm}`;
    setValues(SearchTerm);
  };

  const onClickBtn = (ClickTerm: string) => {
    console.log("ClickTerm: ", ClickTerm);
    setValues("");
  };
  let val = "";
  const [selectedOption, setSelectedOption] = useState(categories);

  const select = (e) => {
    setValues("");
    val = e.target.value;
    val == "categories"
      ? setSelectedOption(categories)
      : setSelectedOption(locations);
  };

  const [showInputOptions, setshowInputOptions] = useState(false);
  const handleInputClick = () => {
    setshowInputOptions(!showInputOptions);
  };

  return (
    <div className="flex justify-center gap-5">
      <div>
        <div className="flex rounded-full border-2 focus:border-orange-400">
          <div className="flex">
            <select className="rounded-full rounded-r-none bg-white px-5 ">
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
            onClick={handleInputClick}
          ></input>
        </div>
        <div
          className={`rounded-lg border-red-700 flex flex-col ${
            showInputOptions ? "block" : "hidden"
          }`}
        >
          {selectedOption
            .filter((selectOption: ICategory | ILocation) => {
              const SearchTerm = Values.toLowerCase();
              const lowerCaseData = selectOption.displayName.toLowerCase();
              return SearchTerm == ""
                ? lowerCaseData
                : SearchTerm &&
                    lowerCaseData.startsWith(SearchTerm) &&
                    lowerCaseData != SearchTerm;
            })
            .map((selectOption: ICategory | ILocation) => (
              <div
                onClick={() => onSearch(selectOption.displayName)}
                key={selectOption.id}
                className="flex bg-white text-black ml-36 mr-5 px-3 py-2 border-b "
              >
                {selectOption.displayName}
              </div>
            ))}
        </div>
      </div>
      <div>
        <Link href={"#"}>
          <Button value="Search" onClick={() => onClickBtn(selectedOption)} />
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const categories = await getCategories();
  const locations = await getLocations();
  return { props: { categories, locations } };
}
