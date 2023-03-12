import { formatDistance } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQueryParams } from "use-query-params";
import Button from "../../components/Button";

export default function jobApply() {
  const [{ category, location }] = useQueryParams({
    category: "",
    location: "",
  });
  const [job, setJob] = useState([]);
  const [activeTab, setActiveTab] = useState("date");

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

  const searchResult = category ? category : location;

  const handleDateFilter = () => {
    setActiveTab("date");
    const sortedData = job.sort((a, b) => b.postedOn.localeCompare(a.postedOn));
    setJob(sortedData);
  };

  const handlePriceFilter = () => {
    setActiveTab("price");
    const sortedData = job.sort((a, b) => b.price - a.price);
    setJob(sortedData);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full">
        <div className="flex font-bold text-2xl p-3">Jobs you might like</div>
        <div className="flex gap-4">
          <Button
            value="Sort by date"
            onClick={handleDateFilter}
            className={activeTab === "date" ? "bg-gray-200" : ""}
          />
          <Button
            value="Sort by price"
            onClick={handlePriceFilter}
            className={activeTab === "price" ? "bg-gray-200" : ""}
          />
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
                  <div className="flex flex-col gap-3">
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
                  <div className="flex flex-col gap-3 pt-5 pl-3">
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
