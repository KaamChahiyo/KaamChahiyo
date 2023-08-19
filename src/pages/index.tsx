import Image from "next/image";
import RecentJobPost from "../components/RecentJobPost";
import SearchBar from "../components/SearchBar";
import TopCategory from "../components/TopCategory";
import TopEmployees from "../components/TopEmployees";
import WorkingMethod from "../components/WorkingMethod";
import { getCategories } from "../services/categoryService";
import { getLocations } from "../services/locationService";

export default function Home({ locations, categories }) {
  return (
    <>
      <div className="flex flex-col w-full gap-10">
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
        <TopEmployees />
        <WorkingMethod />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const categories = (await getCategories()) || [];
  const locations = (await getLocations()) || [];
  return { props: { categories, locations } };
}
