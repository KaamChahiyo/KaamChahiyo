import { formatDistance } from "date-fns";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import Button from "../components/Button";
import { TabSelector } from "../components/TabSelector";
import {
  AppliedJobIcon,
  PasswordIcon,
  PostedJobIcon,
  ProfileIcon,
} from "../icons";
import Security from "../components/Security";
import UserProfile from "../components/UserProfile";

export default function Profile() {
  const { data: session } = useSession();

  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session]);

  const [selectedTab, setSelectedTab] = useTabs([
    "profile-tab",
    "security-tab",
    "posted-job",
    "applied-job",
  ]);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`/api/jobs/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data.jobs);
        setJobs(data.jobs);
        // data.jobs.postedBy.id;
      });
  }, []);

  return (
    <div className="container mt-20 flex flex-col gap-12 z-10">
      <div className="container flex lg:flex-row flex-col-reverse">
        <div className="flex flex-row lg:flex-col w-1/4 gap-3 m-10">
          <TabSelector
            isActive={selectedTab === "profile-tab"}
            onClick={() => setSelectedTab("profile-tab")}
          >
            <div className="hidden lg:flex bg-[#0064f1] justify-center items-center p-3 w-14 h-14 text-red rounded-full">
              <div className=" w-6 text-white">{ProfileIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl flex items-center">
              Profile
            </div>
          </TabSelector>
          <TabSelector
            isActive={selectedTab === "security-tab"}
            onClick={() => setSelectedTab("security-tab")}
          >
            <div className=" hidden lg:flex bg-[#0064f1] justify-center items-center p-3 w-14 h-14   text-red   rounded-full">
              <div className=" w-6 text-white">{PasswordIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl flex items-center">
              Security
            </div>
          </TabSelector>
          {/* applied job for both employer and employee */}
          <TabSelector
            isActive={selectedTab === "applied-job"}
            onClick={() => setSelectedTab("applied-job")}
          >
            <div className=" hidden lg:flex bg-[#0064f1] justify-center items-center p-3 w-14 h-14   text-red   rounded-full">
              <div className=" w-6 text-white">{AppliedJobIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl flex items-center">
              Applied Job
            </div>
          </TabSelector>
          {/* posted Job only for employer */}
          {session?.user?.["role"] === "employer" && (
            <TabSelector
              isActive={selectedTab === "posted-job"}
              onClick={() => setSelectedTab("posted-job")}
            >
              <div className=" hidden lg:flex bg-[#0064f1] justify-center items-center p-3 w-14 h-14   text-red   rounded-full">
                <div className=" w-6 text-white">{PostedJobIcon}</div>
              </div>
              <div className="font-medium text-lg lg:text-2xl flex items-center">
                Posted Job
              </div>
            </TabSelector>
          )}
        </div>
        <div className="w-3/4 ">
          <TabPanel hidden={selectedTab !== "profile-tab"}>
            <UserProfile />
          </TabPanel>
          <TabPanel hidden={selectedTab !== "security-tab"}>
            <Security />
          </TabPanel>

          <TabPanel hidden={selectedTab !== "applied-job"}>
            <div className="text-4xl font-bold text-center m-20">
              Jobs you Applied
            </div>
            {jobs?.filter((job) => job?.assignedTo?.id === session.user?.["id"])
              .length === 0 ? (
              <div className="text-center text-4xl text-orange-600">
                No jobs found
              </div>
            ) : (
              jobs
                ?.filter((job) => job?.assignedTo?.id === session.user?.["id"])
                .sort((a, b) => b?.postedOn?.localeCompare(a.postedOn))
                .map((job) => (
                  <div key={job?.id} className="p-1">
                    {/* {JSON.stringify(job)} */}
                    <div className="shadow border border-gray-200  hover:border-cyan-600  rounded-lg overflow-hidden p-3">
                      <div className="font-bold text-xl p-2">{job?.title}</div>
                      <div className="flex gap-4 italic p-3 m-auto items-center">
                        {job?.postedBy?.image && (
                          <div>
                            {/* {user?.["id"]} */}
                            <Image
                              src={job?.postedBy?.image}
                              alt={job?.postedBy?.name}
                              width={20}
                              height={20}
                              className="rounded-full"
                            />
                          </div>
                        )}
                        <div>{job?.postedBy?.name}</div>
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
                        Rs. {job.price}
                        {/* <Button value="Cancel" onClick={null} /> */}
                      </div>
                    </div>
                  </div>
                ))
            )}
          </TabPanel>

          {session?.user?.["role"] === "employer" && (
            <TabPanel hidden={selectedTab !== "posted-job"}>
              <div className="text-4xl font-bold text-center m-20">
                Jobs you Posted
              </div>
              {jobs?.filter((job) => job?.postedBy?.id === session.user?.["id"])
                .length === 0 ? (
                <div className="text-center text-4xl text-orange-600">
                  No jobs found
                </div>
              ) : (
                jobs
                  ?.filter((job) => job.postedBy?.id === session.user?.["id"])
                  .sort((a, b) => b.postedOn.localeCompare(a.postedOn))
                  .map((job) => (
                    <div className="flex justify-center items-center">
                      <div key={job.id} className="w-full p-1">
                        {/* {JSON.stringify(job)} */}
                        <div className=" shadow border border-gray-200  hover:border-cyan-600  rounded-lg overflow-hidden p-3">
                          <div className="font-bold text-xl p-2">
                            {job.title}
                          </div>
                          <div className="flex gap-4 italic p-3 m-auto items-center">
                            {job?.postedBy?.image && (
                              <div>
                                <Image
                                  src={job?.postedBy?.image}
                                  alt={job?.postedBy?.name}
                                  width={20}
                                  height={20}
                                  className="rounded-full"
                                />
                              </div>
                            )}
                            <div>{job.postedBy.name}</div>
                            <div className="bg-blue-50 rounded-full px-3 ">
                              {formatDistance(
                                new Date(job.postedOn),
                                new Date(),
                                {
                                  addSuffix: true,
                                }
                              )}{" "}
                            </div>
                            <div className="bg-blue-50 rounded-full px-3 ">
                              {job.Category.displayName}
                            </div>
                            <div className="bg-blue-50 rounded-full px-3 ">
                              {job.status}
                            </div>
                          </div>
                          <div className="jobDetail text-lg px-3 w-full">
                            {job.description}
                          </div>
                          <div className="flex flex-col gap-3 pl-3">
                            <div className="flex pt-5">
                              <span className="font-semibold">Price:</span>{" "}
                              &#160;
                              {job.price}
                            </div>
                            <div className="bg-blue-50 rounded-full px-3 py-1 flex w-fit ">
                              {job.Location.displayName}
                            </div>
                            <Button value="Delete" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </TabPanel>
          )}
        </div>
      </div>
    </div>
  );
}
