import Image from "next/image";
import TopCategory from "../components/TopCategory";
import TopServices from "../components/TopServices";
import SearchBar from "../components/SearchBar";
import RecentJobPost from "../components/RecentJobPost";
import TopEmployees from "../components/TopEmployees";
import WorkingMethod from "../components/WorkingMethod";

export default function Home() {
  return (
    <>
      <div className="flex flex-col w-full">
        <div className="h-[720px] w-full relative top-0 ">
          <Image
            src="/assets/img/snow-mountain.jpg"
            alt="Hero Section"
            fill
            className="object-cover"
            quality={100}
          />
          <div className="absolute top-80 flex justify-center w-full gap-10">
            <SearchBar
              placeHolder="Search job by job Category"
              data={categories}
            />
            <SearchBar
              placeHolder="Search for a job by location"
              data={locations}
            />
          </div>
        </div>
        <RecentJobPost />
        <TopCategory />
        <TopServices />
        <TopEmployees />
        <WorkingMethod />
      </div>
    </>
  );
}

export const locations = [
  { filterItem: "Bharatpur" },
  { filterItem: "Kathmandu" },
  { filterItem: "Lalitpur" },
  { filterItem: "Birgunj" },
  { filterItem: "Bharatpur" },
  { filterItem: "Lamjung" },
  { filterItem: "Pokhara" },
  { filterItem: "Hetuda" },
  { filterItem: "Banepa" },
  { filterItem: "Basgadi" },
]

export const categories = [
  { filterItem: "Painter" },
  { filterItem: "Household" },
  { filterItem: "IT services" },
  { filterItem: "Plumber" },
  { filterItem: "Electrician" },
]