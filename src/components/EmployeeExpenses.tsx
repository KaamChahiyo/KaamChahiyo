import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EmployeeExpenses() {
  const { data: session } = useSession();

  const currentUser = session?.user?.["id"];

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`/api/jobs/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setJobs(data.jobs);
      });
  }, []);

  const filteredJob = jobs
    ?.filter(
      (job) => job.postedBy?.id === currentUser && !!job.assignedTo?.id === true
    )
    .sort((a, b) => b.postedOn.localeCompare(a.postedOn));

  const OnGoingJob = jobs?.filter(
    (job) => job.postedBy?.id === currentUser && job.status === "inProgress"
  );

  const [availableFunds, setAvailableFunds] = useState("400.00");
  const [loadedFunds, setLoadedFunds] = useState("900.00");

  const [userId, setUserId] = useState("");
  const [balance, setBalance] = useState("");



  useEffect(() => {
    fetch(`/api/users/${session.user["id"]}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserId(data.id);
        setBalance(data.balance);
      });
  }, [session.user]);


  const [paymentsBeingCleared, setPaymentsBeingCleared] = useState(0);

  let paymentOfOngoingJob = 0;

  for (let job of OnGoingJob) {
    paymentOfOngoingJob += job?.price;
  }
  useEffect(() => {
    var pf = 0;
    jobs
      ?.filter(
        (job) => job.postedBy?.id === currentUser && job.status === "completed"
      )
      ?.map((job) => {
        const assignedDate = new Date(job.assignedOn);
        const currentDate = new Date();
        const timeDiff = Math.abs(
          currentDate.getTime() - assignedDate.getTime()
        );
        const hoursDiff = Math.ceil(timeDiff / (1000 * 60 * 60));
        const remainingTime = 72 - hoursDiff;

        if (remainingTime > 0) setPaymentsBeingCleared((pf += job.price));
      });
  }, [jobs]);

  return (
    <div className="py-16">
      <h1 className="text-3xl font-semibold pb-8">Employeer Expenses</h1>
      <div className="flex flex-col lg:flex-row gap-20 h-full">
        <div className="flex flex-col gap-3 w-full">
          <h3 className="text-xl font-semibold">Available Funds</h3>
          <div className="flex flex-col border border-blue-600 rounded-lg p-5 gap-5">
            <div>
              <h5 className="text-lg">Balance available for use:</h5>
              <p className="text-5xl font-bold text-blue-600">
                NPR {balance}
              </p>
              <p>
                Loaded till the date:{" "}
                <span className="font-semibold">NPR {loadedFunds}</span>
              </p>
            </div>
            <div>
              <Link href="/load-balance">
                <button
                  className="bg-blue-600 w-48 rounded-lg text-white p-4"
                >
                  Load Money
                </button>
              </Link>
              <Link href="/manage-payment">
                <p className="text-lg underline">Manage payment methods</p>
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
      <h1 className="text-xl font-semibold py-10">Expense History</h1>
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
          {filteredJob.map((job) => {
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
              <tbody key={job.id}>
                <tr className="bg-white hover:bg-blue-50">
                  <th className="px-6 py-4">{job.postedOn.slice(0, 10)}</th>
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
                  <td className="px-6 py-4">{job?.assignedTo?.name}</td>
                  <td className="px-6 py-4">
                    <Link href={`/jobs/${job.id}`}>
                      {job.title.slice(0, 12)}...
                    </Link>
                  </td>
                  <td className="px-6 py-4">NPR. {job?.price}</td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
}
