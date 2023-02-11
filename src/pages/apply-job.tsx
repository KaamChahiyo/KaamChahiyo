import React from "react";

export default function jobApply({ jobs }) {
  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {jobs?.jobs?.map((job) => {
          return (
            <div key={job.id} className="p-3 w-3/5">
              <div className="shadow-md shadow-green-200 rounded-lg hover:shadow-sm p-3">
                <div className="font-bold text-xl p-2">{job.title}</div>
                <div className="flex gap-4 italic p-3">
                  <p>{job.image}</p>
                  <p>{job.postedBy.name}</p>
                  <p>{job.postedOn}</p>
                  <p>{job.category}</p>
                </div>
                <div className="jobDetail text-lg px-3 w-full">
                  {job.description}
                </div>

                <div className="flex flex-col  p-5">
                  <div className="italic p-2">{job.Location.displayName}</div>

                  <div className="p-2 bg-emerald-500 hover:bg-emerald-400 text-lg font-bold w-fit rounded-md">
                    <button className="px-2 py-1 rounded-2xl text-white">
                      Apply
                    </button>
                  </div>
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
  const getJobs = await fetch("http://localhost:3000/api/jobs");
  const jobs = await getJobs.json();
  return { props: { jobs } };
}