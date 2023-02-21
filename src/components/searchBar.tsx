import React, { useState } from "react";
import { ICategory, getCategories } from "../services/categoryService";
import { ILocation, getLocations } from "../services/locationService";
import Button from "./Button";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SearchBar({ locations, categories }) {
  const [Values, setValues] = useState("");

  const [searchDomain, setSearchDomain] = useState("category");

  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (e: { target: { value: string } }) => {
    setValues(e.target.value);
  };

  const onSearch = (SearchTerm) => {
    setSearchTerm(SearchTerm?.name);
    setValues(SearchTerm?.displayName);
  };

  let val = "";
  const [selectedOption, setSelectedOption] = useState(categories);

  const select = (e) => {
    e.target.value == "categories"
      ? setSelectedOption(categories)
      : setSelectedOption(locations);

    e.target.value == "categories"
      ? setSearchDomain("category")
      : setSearchDomain("location");

    setValues("");
  };

  const [showInputOptions, setshowInputOptions] = useState(false);
  const handleInputClick = () => {
    setshowInputOptions(!showInputOptions);
    if (Values == "") {
      !showInputOptions;
    } else {
      setshowInputOptions(true);
    }
  };

  return (
    <div className="flex justify-center gap-5">
      {/* {searchParams?.category} */}
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
            className="px-8 py-3 rounded-l-none rounded-full focus:outline-none "
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
              const lowerCaseData = selectOption.name;
              return SearchTerm == ""
                ? lowerCaseData
                : SearchTerm &&
                    lowerCaseData.startsWith(SearchTerm) &&
                    lowerCaseData != SearchTerm;
            })
            .map((selectOption: ICategory | ILocation) => (
              <div
                onClick={() => onSearch(selectOption)}
                key={selectOption.id}
                className="flex bg-white text-black ml-36 mr-5 px-3 py-2 border-b "
              >
                {selectOption.displayName}
              </div>
            ))}
        </div>
      </div>
      <div>
        <Link href={Values ? `/jobs/?${searchDomain}=${searchTerm}` : "/"}>
          <Button value="Search" onClick={null} />
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
