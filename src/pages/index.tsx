import Image from "next/image";
import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";
import TopCategory from "../components/TopCategory";
import TopServices from "../components/TopServices";
import SearchBar from "../components/SearchBar";
import { categories } from "../lib/categories";
import { locations } from "../lib/locations";
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
        <div>We have Served</div>
      </div>
    </>
  );
}
