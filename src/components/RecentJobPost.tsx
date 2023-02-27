import Image from "next/image";
import React, { useEffect, useState } from "react";
import { formatDistance } from "date-fns";
import Link from "next/link";
import Button from "./Button";

export default function RecentJobPost() {
  const [job, setJob] = useState([]);

  useEffect(() => {
    fetch(`/api/jobs/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.jobs.sort((a, b) =>
          b.postedOn.localeCompare(a.postedOn)
        );
        setJob(sortedData);
        // console.log(data);
      });
  }, []);
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex font-bold text-2xl py-4">Recent Jobs</div>
      <div className="flex flex-col items-center gap-4">
        {job?.slice(0, 2).map((job) => {
          return (
            <div key={job?.id} className="w-full sm:w-3/5 p-1">
              <div className="shadow border border-gray-200  hover:border-cyan-600  rounded-lg overflow-hidden p-3">
                <div className="font-bold text-xl p-2">{job?.title}</div>
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
                  <div>{job?.postedBy?.name}</div>
                  <div className="bg-blue-50 rounded-full px-3 ">
                    {formatDistance(new Date(job.postedOn), new Date(), {
                      addSuffix: true,
                    })}
                  </div>
                  <div className="bg-blue-50 rounded-full px-3 ">
                    {job.Category.displayName}
                  </div>
                </div>
                <div className="jobDetail text-lg px-3 w-full">
                  {job.description}
                </div>
                <div className="flex flex-col gap-3 pt-5">
                  <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                    {job.Location.displayName}
                  </div>
                  <Link href={`jobs/${job.id}`}>
                    <Button value="View Job" onClick={null} />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <Link href="/jobs">
        <Button value="Show More Jobs" onClick={null} />
      </Link>
    </div>
  );
}
