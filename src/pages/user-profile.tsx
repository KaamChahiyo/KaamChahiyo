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
  MoneyInIcon,
  MoneyOutIcon,
  PasswordIcon,
  PostedJobIcon,
  ProfileIcon,
} from "../icons";
import Security from "../components/Security";
import UserProfile from "../components/UserProfile";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import AppliedJob from "../components/AppliedJob";
import PostedJob from "../components/PostedJob";

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
    "earnings-tab",
    "expenses-tab",
  ]);

  return (
    <div className="container mt-20 m-auto flex flex-col gap-12 z-10">
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
          {/*expenses for  employer */}
          {session?.user?.["role"] === "employer" && (
            <TabSelector
              isActive={selectedTab === "earnings-tab"}
              onClick={() => setSelectedTab("earnings-tab")}
            >
              <div className=" hidden lg:flex bg-[#0064f1] justify-center items-center p-3 w-14 h-14   text-red   rounded-full">
                <div className=" w-6 text-white">{MoneyInIcon}</div>
              </div>
              <div className="font-medium text-lg lg:text-2xl flex items-center">
                Earnings
              </div>
            </TabSelector>
          )}
          {/* income for employee */}
          <TabSelector
            isActive={selectedTab === "expenses-tab"}
            onClick={() => setSelectedTab("expenses-tab")}
          >
            <div className=" hidden lg:flex bg-[#0064f1] justify-center items-center p-3 w-14 h-14   text-red   rounded-full">
              <div className=" w-6 text-white">{MoneyOutIcon}</div>
            </div>
            <div className="font-medium text-lg lg:text-2xl flex items-center">
              Expenses
            </div>
          </TabSelector>
        </div>
        <div className="w-3/4 ">
          <TabPanel hidden={selectedTab !== "profile-tab"}>
            <UserProfile />
          </TabPanel>
          <TabPanel hidden={selectedTab !== "security-tab"}>
            <Security />
          </TabPanel>

          <TabPanel hidden={selectedTab !== "applied-job"}>
            <AppliedJob />
          </TabPanel>

          <TabPanel hidden={selectedTab !== "posted-job"}>
            <PostedJob />
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
