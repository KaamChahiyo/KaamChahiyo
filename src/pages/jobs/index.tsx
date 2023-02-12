import React from "react";
import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";

export default function jobApply({ jobs }) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {jobs?.jobs?.map((job) => {
          return (
            <div key={job.id} className="p-3 w-3/5">
              <div className="shadow border border-gray-200  hover:border-cyan-600  rounded-lg overflow-hidden p-3">
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
                <div className="jobDetail text-lg px-3 w-full">
                  {job.description}
                </div>
                <div className="flex flex-col gap-3">
                  <div className="flex pt-5 px-3">
                    <span className="font-semibold">Price:</span> &#160;
                    {job.price}
                  </div>
                  <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                    {job.Location.displayName}
                  </div>
                  <Link href={`jobs/${job.id}`}>
                    <div className="p-2 bg-[#0063F1] hover:bg-[#0554c4] text-lg font-bold w-fit rounded-md">
                      <button className="px-2 py-1 rounded-2xl text-white">
                        Apply
                      </button>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export async function getServerSideProps() {
  const getJobs = await fetch(`${process.env.NEXTAUTH_URL}/api/jobs/`);
  const jobs = await getJobs.json();
  return { props: { jobs } };
}
