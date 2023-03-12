import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQueryParams } from "use-query-params";
import Button from "../../components/Button";

export default function JobApply() {
  const [{ category, location }] = useQueryParams({
    category: "",
    location: "",
  });
  let [job, setJob] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);

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

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  const searchResult = category ? category : location;

  if (selectedFilter === "oldest") {
    job = job.sort((a, b) => a.postedOn.localeCompare(b.postedOn));
  } else if (selectedFilter === "latest") {
    job = job.sort((a, b) => b.postedOn.localeCompare(a.postedOn));
  } else if (selectedFilter === "high-low") {
    job = job.sort((a, b) => b.price - a.price);
  } else if (selectedFilter === "low-high") {
    job = job.sort((a, b) => a.price - b.price);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center  w-full">
        <div className="flex font-bold text-2xl p-3">Jobs you might like</div>
        <div className="flex w-3/5 gap-2 justify-end">
          <div className="bg-gray-100 rounded-lg p-1 px-5 text-lg justify-end ">
            Sort By:
          </div>
          <select
            className="bg-gray-100 rounded-lg p-1 px-3 text-lg"
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option value="latest">Date: Newest</option>
            <option value="oldest">Date: Oldest </option>
            <option value="high-low">Price: High to Low</option>
            <option value="low-high">Price: Low to High</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-4">
        {searchResult &&
          job
            .filter(
              (job) =>
                job.status === "approved" &&
                job[searchResult === category ? "Category" : "Location"]
                  .name === searchResult
            )
            .map((job) => (
              <div key={job.id} className="w-full sm:w-3/5 p-1">
                <div className="shadow border border-gray-200 hover:border-cyan-600 rounded-lg overflow-hidden p-3">
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
                  <div className="flex flex-col gap-3 pl-3">
                    <div className="flex pt-5">
                      <span className="font-semibold">Price:</span> &#160;
                      {job.price}
                    </div>
                    <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                      {job.Location.displayName}
                    </div>
                    <Link href={`jobs/${job.id}`}>
                      <Button value="View Job" onClick={null} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        {!searchResult &&
          job
            .filter((job) => job.status === "approved")
            .map((job) => (
              <div key={job.id} className="w-full sm:w-3/5 p-1">
                <div className="shadow border border-gray-200 hover:border-cyan-600 rounded-lg overflow-hidden p-3">
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
                  <div className="flex flex-col gap-3 pl-3">
                    <div className="flex pt-5">
                      <span className="font-semibold">Price:</span> &#160;
                      {job.price}
                    </div>
                    <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                      {job.Location.displayName}
                    </div>
                    <Link href={`jobs/${job.id}`}>
                      <Button value="View Job" onClick={null} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
