import React, { useState } from "react";

export default function SearchBar() {
  const [locValue, setLocValue] = useState("");

  const onChangeLocation = (locEvent: {target:{value:any}}) => {
    setLocValue(locEvent.target.value);
    console.log(locEvent.target.value);
  };

  const onSearchLoc = (searchLocationTerm:string) => {
    setLocValue(searchLocationTerm);
    // console.log("search location", searchLocationTerm);
  };

  const [catValue, setCatValue] = useState("");

  const onChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setCatValue(event.target.value);
  };

  const onSearch = (searchTerm:string ) => {
    setCatValue(searchTerm);
    // console.log("search category ", searchTerm);
  };

  return (
    <div className="flex justify-center gap-10">
    <div>
      <div>
        <input
          className=" w-96 px-8 py-3 rounded-full focus:outline-none focus:shadow-outline focus:border-orange-400 border-2"
          type="text"
          value={locValue}
          onChange={onChangeLocation}
          placeholder="Search By Location"
        ></input>
      </div>
      <div className="rounded-lg border-red-700 flex flex-col overflow-hidden">
        {locations
          .filter((item: { placeName: string }) => {
            const searchLocationTerm = locValue.toLowerCase(); 
            //console.log("locVal= "+locValue);
            const lowerCaseData = item.placeName.toLowerCase();
            return (
              searchLocationTerm &&
              lowerCaseData.startsWith(searchLocationTerm) &&
              lowerCaseData !== searchLocationTerm
            );
          })
          .map((item: { placeName: any }) => (
            <div
              onClick={() => onSearchLoc(item.placeName)}
              key={item.placeName}
              className="bg-white text-black mx-5 px-3 py-2 border-b flex"
            >
              {item.placeName}
            </div>
          ))}
      </div>
      </div>

      <div>
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
          .filter((item: { filterItem: any }) => {
            const searchTerm = catValue.toLowerCase(); 
            //console.log(catValue);
            const lowerCaseData = item.filterItem.toLowerCase();

            return (
              searchTerm &&
              lowerCaseData.startsWith(searchTerm) &&
              lowerCaseData != searchTerm
            );
          })
          .map((item: { filterItem: any }) => (
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
      <div>
        <input type='button' value="Search" 
        className="flex rounded-lg bg-[#2D9515] text-white text-lg hover:bg-teal-700 px-3 py-2.5" />
        </div>
    </div>
  );
}

export const locations = [
  { placeName: "Bharatpur" },
  { placeName: "Kathmandu" },
  { placeName: "Lalitpur" },
  { placeName: "Birgunj" },
  { placeName: "Bharatpur" },
  { placeName: "Lamjung" },
  { placeName: "Pokhara" },
  { placeName: "Hetuda" },
  { placeName: "Banepa" },
  { placeName: "Basgadi" },
]

export const categories = [
  { filterItem: "Painter" },
  { filterItem: "Household" },
  { filterItem: "IT services" },
  { filterItem: "Plumber" },
  { filterItem: "Electrician" },
  { filterItem: "Carpentry" },
]