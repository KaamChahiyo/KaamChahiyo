import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../../components/Button";
import { useQueryParams } from "use-query-params";

export default function jobApply() {
  const [{ category, location }] = useQueryParams({
    category: "",
    location: "",
  });

  let searchResult = "";
  // console.log(category, location);
  category !== "" ? (searchResult = category) : (searchResult = location);
  console.log("search result", searchResult);

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
      });
  }, []);
  return (
    <div>
      {JSON.stringify(category)}
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center w-full">
          <div className="flex font-bold text-2xl p-3">Jobs you might like</div>
        </div>

        <div className="flex flex-col w-4/5">
          {searchResult !== "" ? (
            job
              .filter((job) => job.Location.name === searchResult)
              .map((job) => (
                <div className="flex flex-row gap-7 pb-5">
                  <div> {job.title}</div>
                  <div> {job.Location.name}</div>
                  <div> {job.Category.displayName}</div>
                </div>
              ))
          ) : (
            <div className="flex flex-col items-center justify-center gap-4">
              {job.map((job) => {
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
          )}
        </div>
      </div>
    </div>
  );
}
