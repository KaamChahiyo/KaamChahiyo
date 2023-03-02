import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { TabPanel, useTabs } from "react-headless-tabs";
import { TabSelector } from "../components/TabSelector";
import {
  AppliedJobIcon,
  PasswordIcon,
  PostedJobIcon,
  ProfileIcon,
} from "../icons";
import { authOptions } from "./api/auth/[...nextauth]";
import Button from "../components/Button";
import { formatDistance } from "date-fns";

export default function Profile() {
  const [selectedTab, setSelectedTab] = useTabs([
    "profile-tab",
    "security-tab",
    "posted-job",
    "applied-job",
  ]);

  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session]);

  const { data: userData } = useSession();
  const user = userData?.user;

  const [userEmail, setUserEmail] = useState("");
  const emailChange = (e) => {
    setUserEmail(e.target.value);
  };

  const [userName, setUserName] = useState("");
  const nameChange = (e) => {
    setUserName(e.target.value);
  };

  const [userDOB, setUserDOB] = useState("");
  const DOBChange = (e) => {
    setUserDOB(e.target.value);
  };

  const [userPermAddress, setUserPermAddress] = useState("");
  const permAddressChange = (e) => {
    setUserPermAddress(e.target.value);
  };
  const [userTempAddress, setUserTempAddress] = useState("");
  const tempAddressChange = (e) => {
    setUserTempAddress(e.target.value);
  };
  const [userPhone, setUserPhone] = useState("");
  const PhoneChange = (e) => {
    setUserPhone(e.target.value);
  };

  const [userBio, setUserBio] = useState("");
  const bioChange = (e) => {
    setUserBio(e.target.value);
  };

  const [userImage, setUserImage] = useState("");
  const imageChange = (e) => {
    setUserImage(e.target.value);
  };

  const [userPassword, setUserPassword] = useState("");
  const passwordChange = (e) => {
    setUserPassword(e.target.value);
  };

  useEffect(() => {
    fetch("/api/userProfile", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        setUserEmail(data.email);
        setUserName(data.name);
        setUserDOB(data.dob.substring(0, 10));
        setUserPermAddress(data.permananetAddress);
        setUserTempAddress(data.temporaryAddress);
        setUserPhone(data.phoneNumber);
        setUserBio(data.bio);
        setUserImage(data.image);
      });
  }, []);

  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`/api/jobs/`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.jobs);
        setJobs(data.jobs);
        // data.jobs.postedBy.id;
      });
  });

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
          {user?.["role"] === "employer" && (
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
            <div className="p-10">
              <div className="flex flex-col gap-3 p-10 bg-white shadow-md rounded-3xl">
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-4xl text-center p-4">
                    Update your profile
                  </p>
                </div>
                <div className="flex flex-col">
                  <div className="w-20 h-20">
                    <Image
                      src={userImage}
                      alt={userName}
                      width={100}
                      height={100}
                      quality={100}
                    />
                  </div>
                  <div>{userName}</div>
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label className="text-grey">Name:</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={userName}
                    onChange={nameChange}
                    className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label>Email:</label>
                  <input
                    type="text"
                    placeholder="Email"
                    value={userEmail}
                    onChange={emailChange}
                    className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label className="text-grey">Phone:</label>
                  <input
                    type="text"
                    placeholder="981234567"
                    value={userPhone}
                    onChange={PhoneChange}
                    className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label className="text-grey">DOB:</label>
                  <input
                    type="text"
                    placeholder="e.g. 1999-01-01"
                    value={userDOB}
                    onChange={DOBChange}
                    className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label className="text-grey">Permanent Address:</label>
                  <input
                    type="text"
                    placeholder="Buddha-Chowk, Bharatpur-7"
                    value={userPermAddress}
                    onChange={permAddressChange}
                    className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label className="text-grey">Temporary Address:</label>
                  <input
                    type="text"
                    placeholder="Buddha-Chowk, Bharatpur-7"
                    value={userTempAddress}
                    onChange={tempAddressChange}
                    className="border-2 focus:outline-none focus:shadow-outline border-gray-300 text-gray-700 p-3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label>Bio:</label>
                  <textarea
                    rows={3}
                    value={userBio}
                    placeholder={userBio}
                    onChange={bioChange}
                    className="border-2 focus:outline-none focus:shadow-outline px-3 py-3 border-gray-300 text-gray-700 leading-tight w-full rounded-md"
                  />
                </div>
                <Link passHref href="#">
                  <Button value="Update" onClick={null} />
                </Link>
              </div>
            </div>
          </TabPanel>
          <TabPanel hidden={selectedTab !== "security-tab"}>
            <div className="p-10">
              <div className="flex flex-col gap-3 p-10 bg-white shadow-md rounded-3xl h-[672px]">
                <div className="flex flex-col gap-3">
                  <p className="font-bold text-4xl text-center p-4">
                    Change your password
                  </p>
                </div>

                <div className="flex flex-col gap-1 text-gray-500">
                  <label>Current Password:</label>
                  <input
                    type="password"
                    placeholder="Enter current Password"
                    value={userPassword}
                    onChange={passwordChange}
                    className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label>New password:</label>
                  <input
                    type="password"
                    placeholder="Type new password"
                    className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 text-gray-500">
                  <label>Retype new password:</label>
                  <input
                    type="password"
                    placeholder="Re-type password"
                    className="border-2 focus:outline-none border-gray-300 p-3 rounded-md"
                  />
                </div>
                <div className="flex gap-5 flex-col">
                  <div className=" hover:cursor-text">
                    <Link passHref href="/forget-password">
                      Forgot Password?
                    </Link>
                  </div>
                  <Link passHref href="#">
                    <Button value="Update"></Button>
                  </Link>
                </div>
              </div>
            </div>
          </TabPanel>

          <TabPanel hidden={selectedTab !== "applied-job"}>
            {jobs
              ?.filter((job) => job.assignedToId?.id === user?.["id"])
              .map((job) => (
                <div key={job?.id} className="p-1">
                  <div className="shadow border border-gray-200  hover:border-cyan-600  rounded-lg overflow-hidden p-3">
                    <div className="font-bold text-xl p-2">{job?.title}</div>
                    <div className="flex gap-4 italic p-3 m-auto items-center">
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
                      <Link href={`jobs/${job.id}`}>
                        <Button value="View Job" onClick={null} />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
          </TabPanel>

          {user?.["role"] === "employer" && (
            <TabPanel hidden={selectedTab !== "posted-job"}>
              {jobs
                ?.filter((job) => job.postedBy?.id === user?.["id"])
                .map((job) => (
                  <div key={job?.id} className="p-1">
                    <div className="shadow border border-gray-200  hover:border-cyan-600  rounded-lg overflow-hidden p-3">
                      <div className="font-bold text-xl p-2">{job?.title}</div>
                      <div className="flex gap-4 italic p-3 m-auto items-center">
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
                        <Link href={`jobs/${job.id}`}>
                          <Button value="View Job" onClick={null} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </TabPanel>
          )}
        </div>
      </div>
    </div>
  );
}
