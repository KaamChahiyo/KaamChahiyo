import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { authOptions } from "./api/auth/[...nextauth]";
import { useEffect, useState } from "react";
import Link from "next/link";
import Button from "../components/Button";
import { useSnackbar } from "notistack";
import { useForm } from "react-hook-form";

export default function PostJob() {
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);

  const {
    handleSubmit,
    register,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();


  let defaultBody = {
    title: "",
    description: "",
    price: "",
    category: "",
  };


  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session]);

  useEffect(() => {
    fetch(`/api/location/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((location) => {
        setLocations(location.locations);
      });
  }, []);


  async function onSubmit(values) {
    try {
      const body = { ...defaultBody, ...values };
      await fetch(
        `/api/jobs`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            accept: "application/json",
          },
          body: Object.entries(body)
            .map((e) => e.join("="))
            .join("&"),
        },
      )
        .then(async (res) => {
          if (!res.ok) {
            const errorResp = await res.json();
            throw Error(errorResp.message);
          }
          res.json();
          enqueueSnackbar("Job Posted Successfully.", {
            variant: "success",
          });
          router.replace("/");
        })
        .catch((err) => {
          enqueueSnackbar("Failed to post a job.", {
            variant: "error",
          });
          setError("submit", {
            type: "server",
            message: err.message,
          });
          return null;
        });
    }
    catch (error) {
      setError('submit', {
        type: "server",
        message: 'Unable to connect to the server properly!!',
      });
    }
  }
  useEffect(() => {
    fetch(`/api/categories/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((category) => {
        setCategories(category.categories);
      });
  }, []);

  return (
    <>
      <div className="flex justify-center items-center my-36">
        <div className="flex flex-col w-1/3 relative justify-center gap-6 p-10 bg-white rounded-3xl md:shadow-[0_3px_25px_-10px_rgba(0,0,0,0.3)] ">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    {...register("title")}
                    placeholder="Job Title"
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Description
                  </label>
                  <textarea
                    {...register("description")}
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
                    {...register("price")}
                    placeholder="Price in NPR"
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Category
                  </label>
                  <select
                    {...register("Category")}
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md">
                    <option value="select">Select</option>
                    {categories?.map((category) => (
                      <option value={category.displayName} key={category.id}>
                        {category.displayName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                    Location
                  </label>
                  <select
                    {...register("Location")}
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md">
                    <option value="select">Select</option>

                    {locations?.map((location) => (
                      <option value={location.displayName} key={location.id}>
                        {location.displayName}
                      </option>
                    ))}
                  </select>
                </div>
                <Button value={isSubmitting ? " Posting..." : "Post"} onClick={null}>
                </Button>
              </div>
            </div>
          </form>
        </div >
      </div >
    </>
  );
}
export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
