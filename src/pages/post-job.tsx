import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import { useEffect } from "react";
import Link from "next/link";
import Button from "../components/Button";

export default function PostJob({ categories, locations }) {
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session]);

  return (
    <>
      <div className="flex justify-center items-center my-36">
        <div className="flex flex-col w-1/3 relative justify-center gap-6 p-10 bg-white rounded-3xl md:shadow-[0_3px_25px_-10px_rgba(0,0,0,0.3)] ">
          <form>
            <div className=" flex flex-col gap-5 ">
              <div className="flex flex-col gap-3">
                <p className=" font-bold text-4xl text-center "> Post a Job</p>
                <p className=" text-gray-400 text-center text-md ">
                  Enter your job specification here
                </p>
              </div>
              <div className="flex flex-col gap-3 ">
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Title
                  </label>
                  <input
                    type="text"
                    placeholder="Job Title"
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Description
                  </label>
                  <textarea
                    placeholder="Description of Job"
                    rows={4}
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Offering Price
                  </label>
                  <input
                    type="number"
                    placeholder="Price in NPR"
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Category
                  </label>
                  <select className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md">
                    <option value="select">Select</option>
                    {categories?.categories?.map((category) => (
                      <option value={category.displayName}>
                        {category.displayName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Location
                  </label>
                  <select className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md">
                    <option value="select">Select</option>
                    {locations?.locations?.map((location) => (
                      <option value={location.displayName}>
                        {location.displayName}
                      </option>
                    ))}
                  </select>
                </div>
                <Link href="#">
                  <Button value="Post Job" onClick={null}></Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const getCategories = await fetch("http://localhost:3000/api/categories");
  const getLocation = await fetch("http://localhost:3000/api/location");
  const categories = await getCategories.json();
  const locations = await getLocation.json();
  return {
    props: {
      categories,
      locations,
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
