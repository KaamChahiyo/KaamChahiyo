import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "../../components/TabSelector";
import Button from "../../components/Button";
import { authOptions } from "../api/auth/[...nextauth]";
import { formatDistance } from "date-fns";
import { ExclamationIcon, TickIcon } from "../../icons";

export default function approveJob() {
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

  const [selectedTab, setSelectedTab] = useTabs([
    "Approved",
    "PendingApproval",
  ]);

  const { data: session } = useSession();

  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session]);

  return (
    <div className="flex flex-col justify-center ">
      <div className="flex ">
        <div className="flex flex-row lg:flex-col w-1/5 gap-3 m-10">
          <TabSelector
            isActive={selectedTab === "Approved"}
            onClick={() => setSelectedTab("Approved")}
          >
            <div className="hidden lg:flex justify-center items-center bg-[#0064f1] p-3 w-14 h-14 text-red rounded-full">
              <div className="w-12 text-white">{TickIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl text-gray-600 flex items-center">
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
            <div className="font-medium text-lg lg:text-2xl text-gray-600 flex items-center">
              Pending Approval
            </div>
          </TabSelector>
        </div>
        <div className="w-3/4">
          <TabPanel hidden={selectedTab !== "Approved"}>
            <div className="flex flex-col gap-4 w-3/4">
              {job
                .filter((job) => job.status === "Approved")
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
                        <div className="flex flex-col gap-3 pt-5">
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
                        <div className="flex flex-col gap-3 pt-5 ">
                          <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                            {job.Location.displayName}
                          </div>
                          <Button value="Approve" onClick={null} />
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
