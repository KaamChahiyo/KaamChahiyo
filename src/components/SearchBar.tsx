import React, { useState } from "react";
import { ILocation, getLocations } from "../services/locationService";
import { ICategory, getCategories } from "../services/categoryService";

export default function SearchBar({ locations, categories }) {
  const [locValue, setLocValue] = useState("");
  console.log("Locationb from prop", categories)
  const onChangeLocation = (locEvent: { target: { value: any } }) => {
    setLocValue(locEvent.target.value);
  };

  const onSearchLoc = (searchLocationTerm: string) => {
    setLocValue(searchLocationTerm);
  };

  const [catValue, setCatValue] = useState("");

  const onChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCatValue(event.target.value);
  };

  const onSearch = (cSearchTerm: string) => {
    setCatValue(cSearchTerm);
  };

  const onClickBtn = (searchLocationTerm: string, cSearchTerm: string) => {
    console.log("category: " + cSearchTerm + " location: " + searchLocationTerm);
  };

  const [selectedOption, setSelectedOption] = useState("categories");
  const select = (e) => { console.log(e.target.value); setSelectedOption(e.target.value); }

  return (
    <div className="flex justify-center gap-10">
      <div>
        <div className="flex">
          <div className="flex">
            <select className="rounded-full rounded-r-none bg-white px-3">
              <option value="categories" onClick={select}>Categories</option>
              <option value="location" onClick={select}>Locations</option>
            </select>
          </div>
          {selectedOption === "categories" ?
            <input
              className="w-96 px-8 py-3 rounded-l-none rounded-full focus:outline-none focus:shadow-outline focus:border-orange-400 "
              type="text"
              value={catValue}
              onChange={onChange}
              placeholder="Search By Category"
            ></input>
            :
            <input
              className="flex w-96 px-8 py-3 rounded-l-none rounded-full focus:outline-none focus:shadow-outline focus:border-orange-400 "
              type="text"
              value={locValue}
              onChange={onChangeLocation}
              placeholder="Search By Location"
            ></input>
          }
        </div>
        <div className="rounded-lg border-red-700 flex flex-col overflow-hidden">
          {selectedOption === "categories" ?
            categories
              .filter((category: ICategory) => {
                const cSearchTerm = catValue.toLowerCase();
                //console.log(catValue);
                const lowerCaseData = category.displayName.toLowerCase();

                return (
                  cSearchTerm &&
                  lowerCaseData.startsWith(cSearchTerm) &&
                  lowerCaseData != cSearchTerm
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

            :
            locations
              .filter((location: ILocation) => {
                const searchLocationTerm = locValue.toLowerCase();
                //console.log("locVal= "+locValue);
                const lowerCaseData = location.displayName.toLowerCase();
                return (
                  searchLocationTerm &&
                  lowerCaseData.startsWith(searchLocationTerm) &&
                  lowerCaseData !== searchLocationTerm
                );
              })
              .map((location: ILocation) => (
                <div
                  onClick={() => onSearchLoc(location.displayName)}
                  key={location.id}
                  className="bg-white text-black mx-5 px-3 py-2 border-b flex"
                >
                  {location.displayName}
                </div>
              ))
          }
        </div>
      </div>

      {/* <div>
        <div>
          <input
            className=" w-96 px-8 py-3 rounded-full focus:outline-none focus:shadow-outline focus:border-orange-400 border-2"
            type="text"
            value={catValue}
            onChange={onChange}
            placeholder="Search By Category"
          ></input>
        </div>
        <div className="rounded-lg border-red-700 flex flex-col overflow-hidden">
          {categories
            .filter((category: ICategory) => {
              const cSearchTerm = catValue.toLowerCase();
              //console.log(catValue);
              const lowerCaseData = category.displayName.toLowerCase();

              return (
                cSearchTerm &&
                lowerCaseData.startsWith(cSearchTerm) &&
                lowerCaseData != cSearchTerm
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
            ))}
        </div>
      </div> */}

      <div>
        <input type='button' value="Search"
          className="flex rounded-lg bg-[#2D9515] text-white text-lg hover:bg-teal-700 px-3 py-2.5"
          onClick={() => onClickBtn(catValue, locValue)}
        />
      </div>
    </div>
  );
}

// export const staticLocations = [
//   { placeName: "Bharatpur" },
//   { placeName: "Kathmandu" },
//   { placeName: "Lalitpur" },
//   { placeName: "Birgunj" },
//   { placeName: "Bharatpur" },
//   { placeName: "Lamjung" },
//   { placeName: "Pokhara" },
//   { placeName: "Hetuda" },
//   { placeName: "Banepa" },
//   { placeName: "Basgadi" },
// ]

// export const categories = [
//   { filterItem: "Painter" },
//   { filterItem: "Household" },
//   { filterItem: "IT services" },
//   { filterItem: "Plumber" },
//   { filterItem: "Electrician" },
//   { filterItem: "Carpentry" },
// ]


export async function getServerSideProps() {
  const categories = await getCategories();
  const locations = await getLocations();
  return { props: { categories, locations } };
}
