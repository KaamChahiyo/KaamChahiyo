import { formatDistance } from "date-fns";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";

export default function apply({ job, params }) {
  const jobId = params?.jobId;

  const [apply, setApply] = useState(false);
  const toggleApply = () => {
    setApply(!apply);
  };
  const handleSubmit = () => {
    setApply(false);
  };
  const [userEmail, setUserEmail] = useState("");

  const [userName, setUserName] = useState("");

  useEffect(() => {
    fetch("/api/userProfile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserEmail(data.email);
        setUserName(data.name);
      });
  }, []);

  return (
    <div className="flex justify-center items-center">
      <div key={job.id} className="w-full sm:w-3/5 p-1">
        <div className=" shadow border border-gray-200  hover:border-cyan-600  rounded-lg overflow-hidden p-3">
          <div className="font-bold text-xl p-2">{job.title}</div>
          <div className="flex gap-4 italic p-3 m-auto items-center">
            <div>
              <Image
                src={job?.postedBy?.image}
                alt={job?.postedBy?.name}
                width={20}
                height={20}
                className="rounded-full"
              />
            </div>
            <div>{job.postedBy.name}</div>
            <div className="bg-blue-50 rounded-full px-3 ">
              {formatDistance(new Date(job.postedOn), new Date(), {
                addSuffix: true,
              })}{" "}
            </div>
            <div className="bg-blue-50 rounded-full px-3 ">
              {job.Category.displayName}
            </div>
          </div>
          <div className="jobDetail text-lg px-3 w-full">{job.description}</div>
          <div className="flex flex-col gap-3 pl-3">
            <div className="flex pt-5">
              <span className="font-semibold">Price:</span> &#160;
              {job.price}
            </div>
            <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
              {job.Location.displayName}
            </div>
            <div className="flex flex-col gap-5">
              {apply ? (
                <div className="flex justify-start">
                  <div className="flex flex-col  relative justify-center gap-6 w-2/3 ">
                    <form>
                      <div className=" flex flex-col gap-5 ">
                        <div className="flex flex-col gap-3">
                          <p className=" font-bold text-4xl text-center ">
                            Apply For a Job
                          </p>
                          <p className=" text-gray-400 text-center text-md ">
                            Enter your Details here
                          </p>
                        </div>
                        <div className="flex flex-col gap-3 ">
                          <div className="flex flex-col gap-1.5">
                            <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                              Your Name
                            </label>
                            <input
                              type="text"
                              readOnly={true}
                              value={userName}
                              placeholder="userName"
                              className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                              Your Email
                            </label>
                            <input
                              type="text"
                              readOnly={true}
                              value={userEmail}
                              placeholder="userEmail"
                              className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              placeholder="Enter your phone number"
                              className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                              required
                            />
                          </div>

                          <div className="flex flex-col gap-1.5">
                            <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                              Local Address
                            </label>
                            <input
                              type="text"
                              placeholder="Enter Your Local Address"
                              className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className="flex gap-5">
                <Button
                  value={apply ? "Submit" : "Apply"}
                  onClick={toggleApply}
                ></Button>
                {apply ? (
                  <Button value="Cancel" onClick={handleSubmit}></Button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const getJob = await fetch(
    `${process.env.NEXTAUTH_URL}/api/jobs/${params.jobId}`
  );
  const job = await getJob.json();
  return {
    props: {
      job,
      params,
    },
  };
}
