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
          <div className="absolute top-80 flex justify-center w-full ">
            <SearchBar
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

