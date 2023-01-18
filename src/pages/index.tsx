import Image from "next/image";
import AppHeader from "../components/AppHeader";
import Footer from "../components/Footer";
import TopCategory from "../components/TopCategory";
import TopServices from "../components/TopServices";

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
            quality={100} />
          <div className="absolute top-80 left-44 w-full flex gap-10 m-auto container">
            <input className="px-8 py-3 rounded-full w-[50%] overflow-hidden focus:outline-none focus:shadow-outline focus:border-orange-400 border-2" type="text" placeholder="Search for a job by catagory" />
            <input className="px-8 py-3 rounded-full w-[50%] overflow-hidden focus:outline-none focus:shadow-outline focus:border-orange-400 border-2 " type="text" placeholder="Search for a job by location" />
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