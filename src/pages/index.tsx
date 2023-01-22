import Image from "next/image";
import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";
import TopCategory from "../components/TopCategory";
import TopServices from "../components/TopServices";
import SearchBar from "../components/SearchBar";
import { categories } from "../lib/categories";
import { locations } from "../lib/locations";

export default function Home() {
  return (
    <>
      <AppHeader />
      <div className="flex flex-col w-full">
        <div className="h-[720px] w-full relative top-0 ">
          <Image
            src="/assets/img/snow-mountain.jpg"
            alt="Hero Section"
            fill
            className="object-cover"
            quality={100}
          />
          <div className="absolute top-80 left-44 w-full flex gap-10 m-auto container">
            <form className="rounded-full w-[50%] overflow-hidden focus:outline-none ">
              <SearchBar
                placeHolder="Search job by Category"
                data={categories}
              />
            </form>

            <form className="rounded-full w-[50%] overflow-hidden focus:outline-none ">
              <SearchBar
                placeHolder="Search for a job by location"
                data={locations}
              />
            </form>
          </div>
        </div>
        <div>Recent Job posting</div>
        <TopCategory />
        <TopServices />
        <div>Top Employees</div>
        <div>Working procedure</div>
        <div>We have Served</div>
      </div>
      <Footer />
    </>
  );
}
