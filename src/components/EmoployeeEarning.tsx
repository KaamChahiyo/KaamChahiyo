import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EmoployeeEarning() {
  const { data: session } = useSession();

  const currentUser = session?.user?.["id"];
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`/api/jobs/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setJobs(data.jobs);
        // console.log(data.jobs);
      });
  }, []);

  const CompletedJob = jobs?.filter(
    (job) => job.assignedTo?.id === currentUser && job.status === "completed"
  );

  const OnGoingJob = jobs?.filter(
    (job) => job.assignedTo?.id === currentUser && job.status === "inProgress"
  );

  const totalCompletedJobs = CompletedJob.length;

  const [availableFunds, setAvailableFunds] = useState("0.00");
  const [loadedFunds, setLoadedFunds] = useState("0.00");
  const [remainingTime, setRemainingTime] = useState(null);

  let paymentsBeingCleared = 0;

  for (let job of CompletedJob) {
    paymentsBeingCleared += job?.price;
  }

  let paymentOfOngoingJob = 0;

  for (let job of OnGoingJob) {
    paymentOfOngoingJob += job?.price;
  }

  return (
    <div className="py-16">
      <h1 className="text-3xl font-semibold pb-8">Employee Earning</h1>
      <div className="flex flex-col lg:flex-row gap-20 h-full">
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-xl font-semibold">Available Funds</h3>
          <div className="flex flex-col border border-blue-600 rounded-lg p-5 gap-5">
            <div>
              <h5 className="text-lg">Balance available for use:</h5>
              <p className="text-5xl font-bold text-blue-600">
                NPR {availableFunds}
              </p>
              <p>
                Withdrawn till the date:{" "}
                <span className="font-semibold">NPR {loadedFunds}</span>
              </p>
            </div>
            <div>
              <button
                onClick={null}
                className="bg-blue-600 w-48 rounded-lg text-white p-4"
              >
                Request Withdrawal
              </button>
              <Link href="#">
                <p className="text-lg underline">Manage payout methods</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-xl font-semibold">Future payments</h3>
          <div className="flex flex-col border border-blue-600 rounded-lg p-5 gap-5">
            <div>
              <h5 className="text-lg">Payments being cleared:</h5>
              <p className="text-5xl font-bold text-blue-600">
                NPR {paymentsBeingCleared}
              </p>
              <p>{totalCompletedJobs} payment</p>
            </div>
            <hr className="bg-gray-300 h-0.5" />
            <div>
              <h5 className="text-lg">Payments of ongoing task:</h5>
              <p className="text-2xl font-bold text-blue-600">
                NPR {paymentOfOngoingJob}
              </p>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-xl font-semibold py-10">Earning History</h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-md text-white uppercase bg-blue-600">
            <tr>
              <th scope="col" className="px-6 py-4">
                Date
              </th>
              <th scope="col" className="px-6 py-4">
                Activity
              </th>
              <th scope="col" className="px-6 py-4">
                Description
              </th>
              <th scope="col" className="px-6 py-4">
                From
              </th>
              <th scope="col" className="px-6 py-4">
                Order
              </th>
              <th scope="col" className="px-6 py-4">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs
              ?.filter(
                (job) =>
                  job.assignedTo?.id === session?.user?.["id"] &&
                  job.status === "completed"
              )
              .map((job) => {
                const assignedDate = new Date(job.assignedOn);
                const currentDate = new Date();
                const timeDiff = Math.abs(
                  currentDate.getTime() - assignedDate.getTime()
                );
                const hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));
                const remainingTime = 72 - hoursDiff;
                let remainingDays = Math.floor(remainingTime / 24);
                let remainingHours = remainingTime % 24;

                return (
                  <tr key={job.id} className="bg-white hover:bg-blue-50">
                    <th className="px-6 py-4">{job.assignedOn.slice(0, 10)}</th>
                    <td className="px-6 py-4">
                      {remainingTime <= 0 ? "Cleared" : `Clearing`}
                    </td>
                    <td className="px-6 py-4">
                      {remainingTime <= 0
                        ? "Cleared"
                        : "Clearing in " +
                          `${remainingDays}` +
                          " days " +
                          `${remainingHours}` +
                          " hours"}
                    </td>
                    <td className="px-6 py-4">{job.postedBy.name}</td>
                    <td className="px-6 py-4">
                      <Link href={`${process.env.NEXTAUTH_URL}/jobs/${job.id}`}>
                        {job.title.slice(0, 12)}...
                      </Link>
                    </td>
                    <td className="px-6 py-4">NPR. {job.price}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
