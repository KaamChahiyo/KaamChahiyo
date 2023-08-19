import { formatDistance } from "date-fns";
import { now } from "lodash";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Apply({ job }) {
  const [apply, setApply] = useState(false);

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      assignedToId: "",
    },
  });

  const [userEmail, setUserEmail] = useState("");

  const [userName, setUserName] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");

  const [userAddress, setUserAddress] = useState("");

  const [userId, setUserId] = useState("");

  const router = useRouter();

  useEffect(() => {
    fetch("/api/userProfile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserEmail(data.email);
        setUserName(data.name);
        setPhoneNumber(data.phoneNumber);
        setUserAddress(data.temporaryAddress);
        setUserId(data.id);
      });
  }, []);

  async function onSubmit(data, _e) {
    try {
      console.log(data);
      await fetch(`/api/jobs/${job.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          assignedToId: userId,
          status: "inProgress",
          assignedOn: new Date(now()),
        }),
      });
      router.push(`/jobs/`);
    } catch (error) {
      null;
    }
  }

  return (
    <div className="flex justify-center items-center">
      <div key={job.id} className="w-full sm:w-3/5 p-1">
        <div
          onSubmit={handleSubmit(onSubmit)}
          className=" shadow border border-gray-200  hover:border-cyan-600  rounded-lg overflow-hidden p-3"
        >
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
              })}
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
                    <form className=" flex flex-col gap-5 ">
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
                            value={phoneNumber}
                            className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                            readOnly={true}
                          />
                        </div>

                        <div className="flex flex-col gap-1.5">
                          <label className=" text-gray-500 font-semibold text-sm uppercase  tracking-[2.78px] ">
                            Local Address
                          </label>
                          <input
                            type="text"
                            value={userAddress}
                            placeholder="Enter Your Local Address"
                            className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                            readOnly={true}
                          />
                        </div>
                        {phoneNumber === null || userAddress === null ? (
                          <div className="flex bg-red-100 px-4 py-2 text-red-500 rounded">
                            Update your
                            <Link href="/user-profile">
                              <span className="px-1 underline">
                                User Profile
                              </span>
                            </Link>
                            first to continue
                          </div>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="flex gap-5">
                        <button className="px-5 py-4 w-fit border-2 border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 rounded-lg text-white text-xl font-bold focus:outline-none focus:shadow-outline">
                          {isSubmitting ? <>Submitting</> : <>Submit</>}
                        </button>
                        {(apply ||
                          phoneNumber !== null ||
                          userAddress !== null) && (
                          <button
                            className="px-5 py-4 w-fit border-2 border-blue-600 bg-blue-600 hover:bg-white hover:text-blue-600 rounded-lg text-white text-xl font-bold focus:outline-none focus:shadow-outline"
                            onClick={() => setApply(false)}
                          >
                            Cancel
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
              ) : (
                ""
              )}

              {!apply
                ? job.status === "approved" && (
                    <button
                      className="px-5 py-4 w-fit border-2 border-[#0063F1] bg-[#0063F1] hover:bg-white hover:text-[#0063F1] rounded-lg text-white text-xl font-bold focus:outline-none focus:shadow-outline"
                      onClick={() => setApply(true)}
                    >
                      Apply
                    </button>
                  )
                : null}
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
