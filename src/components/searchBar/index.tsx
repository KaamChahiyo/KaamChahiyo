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

  const onClickBtn = (SearchTerm: string) => {
    console.log("SearchTerm: ", SearchTerm);
    // console.log("selectedOption: ", selectedOption);
    setValues("");
  };

  const [selectedOption, setSelectedOption] = useState(categories);
  let val = "";
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
            .filter((chooseOption: ICategory | ILocation) => {
              const SearchTerm = Values.toLowerCase();
              const lowerCaseData = chooseOption.displayName.toLowerCase();
              return SearchTerm == ""
                ? lowerCaseData
                : SearchTerm &&
                    lowerCaseData.startsWith(SearchTerm) &&
                    lowerCaseData != SearchTerm;
            })
            .map((chooseOption: ICategory | ILocation) => (
              <div
                onClick={() => onSearch(chooseOption.displayName)}
                key={chooseOption.id}
                className="flex bg-white text-black ml-36 mr-5 px-3 py-2 border-b "
              >
                {chooseOption.displayName}
              </div>
            ))}
        </div>
      </div>
      <div>
        <Link href={"#"}>
          <Button value="Search" onClick={() => onClickBtn(Values)} />
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
