import { formatDistance } from "date-fns";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import Button from "../../components/Button";
import { TabSelector } from "../../components/TabSelector";
import {
  CompletedIcon,
  CrossIcon,
  ExclamationIcon,
  InProgressIcon,
  TickIcon,
} from "../../icons";
import { authOptions } from "../api/auth/[...nextauth]";

export default function jobs() {
  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session]);

  const [job, setJob] = useState([]);

  const updateJobStatusById = async (id: string, status: string) => {
    try {
      await fetch(`/api/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({ status: status }),
      });
    } catch (error) {
      null;
    }
  };

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
  }, [updateJobStatusById]);

  const [selectedTab, setSelectedTab] = useTabs([
    "Approved",
    "PendingApproval",
    "Rejected",
    "Completed",
    "Cancelled",
    "inProgress",
  ]);

  return (
    <div className="flex flex-col justify-center">
      <div className="flex ">
        <div className="flex flex-col md:flex-row lg:flex-col w-1/5 gap-3 m-10">
          <TabSelector
            isActive={selectedTab === "Approved"}
            onClick={() => setSelectedTab("Approved")}
          >
            <div className="hidden lg:flex justify-center items-center bg-[#0064f1] p-3 w-14 h-14 text-red rounded-full">
              <div className="w-12 text-white">{TickIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl flex items-center">
              Approved
            </div>
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "PendingApproval"}
            onClick={() => setSelectedTab("PendingApproval")}
          >
            <div className="hidden lg:flex justify-center bg-[#0064f1] items-center p-3 w-14 h-14 text-red rounded-full">
              <div className="w-12 text-white">{ExclamationIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl flex items-center">
              Pending Approval
            </div>
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "Rejected"}
            onClick={() => setSelectedTab("Rejected")}
          >
            <div className="hidden lg:flex justify-center items-center bg-[#0064f1] p-3 w-14 h-14 text-red rounded-full">
              <div className="w-12 text-white">{CrossIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl flex items-center">
              Rejected
            </div>
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "Completed"}
            onClick={() => setSelectedTab("Completed")}
          >
            <div className="hidden lg:flex justify-center items-center bg-[#0064f1] p-3 w-14 h-14 text-red rounded-full">
              <div className="w-12 text-white">{CompletedIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl flex items-center">
              Completed
            </div>
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "Cancelled"}
            onClick={() => setSelectedTab("Cancelled")}
          >
            <div className="hidden lg:flex justify-center items-center bg-[#0064f1] p-3 w-14 h-14 text-red rounded-full">
              <div className="w-12 text-white">{CrossIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl flex items-center">
              Cancelled
            </div>
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "inProgress"}
            onClick={() => setSelectedTab("inProgress")}
          >
            <div className="hidden lg:flex justify-center bg-[#0064f1] items-center p-3 w-14 h-14 text-red rounded-full">
              <div className="w-12 text-white">{InProgressIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl  flex items-center">
              InProgress
            </div>
          </TabSelector>
        </div>
        <div className="w-3/4 mt-10">
          <TabPanel hidden={selectedTab !== "Approved"}>
            <div className="flex flex-col gap-4 w-3/4">
              {job
                .filter((job) => job.status === "approved")
                .map((job) => {
                  return (
                    <div key={job.id} className="p-1">
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
                            {formatDistance(
                              new Date(job.postedOn),
                              new Date(),
                              {
                                addSuffix: true,
                              }
                            )}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 ">
                            {job.Category.displayName}
                          </div>
                        </div>
                        <div className="jobDetail text-lg px-3 w-full">
                          {job.description}
                        </div>
                        <div className="flex flex-col gap-3 pt-5 px-3">
                          <div>
                            <span className="font-semibold">Price:</span> &#160;{" "}
                            {job.price}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                            {job.Location.displayName}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </TabPanel>
          <TabPanel hidden={selectedTab !== "PendingApproval"}>
            <div className="flex flex-col gap-4 w-3/4">
              {job
                .filter((job) => job.status === "pendingApproval")
                .map((job) => {
                  return (
                    <div key={job.id} className="p-1 gap-3">
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
                            {formatDistance(
                              new Date(job.postedOn),
                              new Date(),
                              {
                                addSuffix: true,
                              }
                            )}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 ">
                            {job.Category.displayName}
                          </div>
                        </div>
                        <div className="jobDetail text-lg px-3 w-full">
                          {job.description}
                        </div>
                        <div className="flex flex-col gap-3 pt-5 px-3 ">
                          <div>
                            <span className="font-semibold">Price:</span> &#160;{" "}
                            {job.price}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                            {job.Location.displayName}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() =>
                                updateJobStatusById(job.id, "approved")
                              }
                              className="px-5 py-3 border-2 border-[#0063F1] bg-[#0063F1] hover:bg-white hover:text-[#0063F1] rounded-lg text-white text-lg font-bold  focus:outline-none focus:shadow-outline"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() =>
                                updateJobStatusById(job.id, "rejected")
                              }
                              className="px-5 py-3 border-2 border-[#0063F1] bg-[#0063F1] hover:bg-white hover:text-[#0063F1] rounded-lg text-white text-lg font-bold  focus:outline-none focus:shadow-outline"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </TabPanel>
          <TabPanel hidden={selectedTab !== "Rejected"}>
            <div className="flex flex-col gap-4 w-3/4">
              {job
                .filter((job) => job.status === "rejected")
                .map((job) => {
                  return (
                    <div key={job.id} className="p-1">
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
                            {formatDistance(
                              new Date(job.postedOn),
                              new Date(),
                              {
                                addSuffix: true,
                              }
                            )}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 ">
                            {job.Category.displayName}
                          </div>
                        </div>
                        <div className="jobDetail text-lg px-3 w-full">
                          {job.description}
                        </div>
                        <div className="flex flex-col gap-3 pt-5 px-3">
                          <div>
                            <span className="font-semibold">Price:</span> &#160;{" "}
                            {job.price}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                            {job.Location.displayName}
                          </div>
                          <button
                            onClick={() =>
                              updateJobStatusById(job.id, "approved")
                            }
                            className="w-fit px-5 py-3 border-2 border-[#0063F1] bg-[#0063F1] hover:bg-white hover:text-[#0063F1] rounded-lg text-white text-lg font-bold  focus:outline-none focus:shadow-outline"
                          >
                            Approve
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </TabPanel>
          <TabPanel hidden={selectedTab !== "Completed"}>
            <div className="flex flex-col gap-4 w-3/4">
              {job
                .filter((job) => job.status === "completed")
                .map((job) => {
                  return (
                    <div key={job.id} className="p-1 gap-3">
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
                            {formatDistance(
                              new Date(job.postedOn),
                              new Date(),
                              {
                                addSuffix: true,
                              }
                            )}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 ">
                            {job.Category.displayName}
                          </div>
                        </div>
                        <div className="jobDetail text-lg px-3 w-full">
                          {job.description}
                        </div>
                        <div className="flex flex-col gap-3 pt-5 px-3">
                          <div>
                            <span className="font-semibold">Price:</span> &#160;{" "}
                            {job.price}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                            {job.Location.displayName}
                          </div>
                          {/* <Button value="Approve" onClick={null} /> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </TabPanel>
          <TabPanel hidden={selectedTab !== "Cancelled"}>
            <div className="flex flex-col gap-4 w-3/4">
              {job
                .filter((job) => job.status === "cancelled")
                .map((job) => {
                  return (
                    <div key={job.id} className="p-1 gap-3">
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
                            {formatDistance(
                              new Date(job.postedOn),
                              new Date(),
                              {
                                addSuffix: true,
                              }
                            )}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 ">
                            {job.Category.displayName}
                          </div>
                        </div>
                        <div className="jobDetail text-lg px-3 w-full">
                          {job.description}
                        </div>
                        <div className="flex flex-col gap-3 pt-5 px-3 ">
                          <div>
                            <span className="font-semibold">Price:</span> &#160;{" "}
                            {job.price}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                            {job.Location.displayName}
                          </div>
                          <Button
                            value="Approve"
                            onClick={() =>
                              updateJobStatusById(job.id, "approved")
                            }
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </TabPanel>
          <TabPanel hidden={selectedTab !== "inProgress"}>
            <div className="flex flex-col gap-4 w-3/4">
              {job
                .filter((job) => job.status === "inProgress")
                .map((job) => {
                  return (
                    <div key={job.id} className="p-1 gap-3">
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
                            {formatDistance(
                              new Date(job.postedOn),
                              new Date(),
                              {
                                addSuffix: true,
                              }
                            )}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 ">
                            {job.Category.displayName}
                          </div>
                        </div>
                        <div className="jobDetail text-lg px-3 w-full">
                          {job.description}
                        </div>
                        <div className="flex flex-col gap-3 pt-5 px-3">
                          <div>
                            <span className="font-semibold">Price:</span> &#160;{" "}
                            {job.price}
                          </div>
                          <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                            {job.Location.displayName}
                          </div>
                          {/* <Button value="Approve" onClick={null} /> */}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </TabPanel>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  return {
    props: {
      session: await getServerSession(context.req, context.res, authOptions),
    },
  };
}
