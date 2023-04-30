import { toInteger } from "lodash";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

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

  const filteredJob = jobs?.filter(
    (job) => job.postedBy?.id === currentUser && !!job.assignedTo?.id === true
  );

  const totalFilteredJobs = toInteger(filteredJob.length);

  const [availableFunds, setAvailableFunds] = useState("400.00");
  const [loadedFunds, setLoadedFunds] = useState("900.00");
  const [paymentsBeingCleared, setPaymentsBeingCleared] = useState("");

  useEffect(() => {
    let price = 0;

    for (let job of filteredJob) {
      price += job?.price;
    }
    setPaymentsBeingCleared(price.toString());
  }, [setPaymentsBeingCleared]);
  console.log(paymentsBeingCleared);
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
                NPR {availableFunds}
              </p>
              <p>
                Loaded till the date:{" "}
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
              <p>{totalFilteredJobs} payment</p>
            </div>
            <hr className="bg-gray-300 h-0.5" />
            <div>
              <h5 className="text-lg">Payments being cleared:</h5>
              <p className="text-2xl font-bold text-blue-600">
                NPR {paymentsBeingCleared}
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
            return (
              <tbody key={job.id}>
                <tr className="bg-white hover:bg-blue-50">
                  <th className="px-6 py-4">5/5/2023</th>
                  <td className="px-6 py-4">Clearing</td>
                  <td className="px-6 py-4">Order will clear in 12 days</td>
                  <td className="px-6 py-4">{job?.assignedTo?.name}</td>
                  <td className="px-6 py-4">{job?.title}</td>
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
