import { formatDistance } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "./Button";

function PostedJob() {
  const [jobs, setJobs] = useState([]);

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session]);

  useEffect(() => {
    fetch(`/api/jobs/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs);
      });
  }, []);

  return (
    <div>
      {session?.user?.["role"] === "employer" && (
        <div>
          <div className="text-4xl font-bold text-center m-20">
            Jobs you Posted
          </div>
          {jobs?.filter((job) => job?.postedBy?.id === session.user?.["id"])
            .length === 0 ? (
            <div className="text-center text-4xl text-orange-600">
              No jobs found
            </div>
          ) : (
            jobs
              ?.filter((job) => job.postedBy?.id === session.user?.["id"])
              .sort((a, b) => b.postedOn.localeCompare(a.postedOn))
              .map((job) => (
                <div className="flex justify-center items-center">
                  <div key={job.id} className="w-full p-1">
                    {/* {JSON.stringify(job)} */}
                    <div className=" shadow border border-gray-200  hover:border-cyan-600  rounded-lg overflow-hidden p-3">
                      <div className="font-bold text-xl p-2">{job.title}</div>
                      <div className="flex gap-4 italic p-3 m-auto items-center">
                        {job?.postedBy?.image && (
                          <div>
                            <Image
                              src={job?.postedBy?.image}
                              alt={job?.postedBy?.name}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                          </div>
                        )}
                        <div>{job.postedBy.name}</div>
                        <div className="bg-blue-50 rounded-full px-3 ">
                          {formatDistance(new Date(job.postedOn), new Date(), {
                            addSuffix: true,
                          })}{" "}
                        </div>
                        <div className="bg-blue-50 rounded-full px-3 ">
                          {job.Category.displayName}
                        </div>
                        <div className="bg-blue-50 rounded-full px-3 ">
                          {job.status}
                        </div>
                      </div>
                      <div className="jobDetail text-lg px-3 w-full">
                        {job.description}
                      </div>
                      <div className="flex flex-col gap-3 pl-3">
                        <div className="flex pt-5">
                          <span className="font-semibold">Price:</span>
                          &#160;
                          {job.price}
                        </div>
                        <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                          {job.Location.displayName}
                        </div>
                        <Button value="Delete" />
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      )}
    </div>
  );
}

export default PostedJob;
