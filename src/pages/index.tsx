import Image from "next/image";
import TopCategory from "../components/TopCategory";
import TopServices from "../components/TopServices";
import RecentJobPost from "../components/RecentJobPost";
import TopEmployees from "../components/TopEmployees";
import WorkingMethod from "../components/WorkingMethod";
import { getLocations } from "../services/locationService";
import { getCategories } from "../services/categoryService";
import SearchBar from "./searchBar";

export default function Home({ locations, categories }) {
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
            <SearchBar locations={locations} categories={categories} />
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

export async function getServerSideProps() {
  const categories = await getCategories();
  const locations = await getLocations();
  return { props: { categories, locations } };
}
