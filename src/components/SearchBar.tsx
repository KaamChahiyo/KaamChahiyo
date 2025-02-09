import Link from "next/link";
import React, { useState } from "react";
import Button from "../components/Button";
import { ChevronDownIcon } from "../icons/CheveronDownIcon";
import { ICategory, getCategories } from "../services/categoryService";
import { ILocation, getLocations } from "../services/locationService";

export default function Test({ locations, categories }) {
  const [Values, setValues] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const onChange = (e: { target: { value: string } }) => {
    setValues(e.target.value);
    setshowInputOptions(!showInputOptions);
  };

  const onSearch = (SearchTerm) => {
    setSearchTerm(SearchTerm?.name);
    setValues(SearchTerm?.displayName);
  };

  const [showInputOptions, setshowInputOptions] = useState(false);
  const handleInputClick = () => {
    setshowInputOptions(!showInputOptions);
  };

  const [click, setClick] = React.useState(false);

  const [selectedOption, setSelectedOption] = useState(categories);
  const [searchDomain, setSearchDomain] = useState("category");
  const [option, setOption] = React.useState("Catergories");
  const setType1 = () => {
    setOption("Catergories");
    setClick(!click);
    setSelectedOption(categories);
    setSearchDomain("category");
    setValues("");
  };
  const setType2 = () => {
    setOption("Locations");
    setClick(!click);
    setSelectedOption(locations);
    setSearchDomain("location");
    setValues("");
  };
  return (
    <div className="flex flex-wrap gap-5 justify-center">
      <div>
        <div className="flex items-center rounded-full ">
          <div
            onClick={() => setClick(!click)}
            className="flex rounded-l-full w-40 bg-white p-3 px-6 hover:cursor-pointer"
          >
            <div className="w-24">{option}</div>
            <div className="text-black h-5 w-5 pt-0.5">{ChevronDownIcon}</div>
          </div>

          <input
            className="pr-8 pl-5 w-72 py-3 rounded-l-none rounded-full focus:outline-none bg-white"
            type="text"
            value={Values}
            onChange={onChange}
            placeholder="Search by category or location"
            onClick={handleInputClick}
            // onBlur={() => setshowInputOptions(false)}
          ></input>
        </div>

        <div className="flex gap-10">
          <div
            className={`flex flex-col w-32 h-20 p-3 rounded-b-lg overflow-hidden ${
              click && "hover:cursor-pointer bg-white"
            }`}
          >
            {click && (
              <div className="flex flex-col gap-2">
                <div onClick={setType1}>{"Catergories"}</div>
                <div onClick={setType2}>{"Locations"}</div>
              </div>
            )}
          </div>
          <div className="">
            <div
              className={`rounded-b-lg flex flex-col h-60 overflow-auto ${
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
                    className="flex bg-white text-black border-b px-3 py-2 w-60"
                  >
                    {selectOption.displayName}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <Link href={Values ? `/jobs/?${searchDomain}=${searchTerm}` : "/"}>
          <Button varient="Search">
            <p className="">Search</p>
          </Button>
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
