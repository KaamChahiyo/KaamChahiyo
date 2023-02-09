import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { TabSelector } from "../components/TabSelector";
import { TabPanel, useTabs } from "react-headless-tabs";

export default function JobListing() {
  const [selectedTab, setSelectedTab] = useTabs(["recent-jobs", "all-jobs"]);
  let jobTags;
  return (
    <div>
      <div>
        <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-b from-white to-blue-50">
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex font-bold text-2xl p-3">Jobs you might like</div>
            <div className="flex items-center justify-center">
              <TabSelector
                isActive={selectedTab === "recent-jobs"}
                onClick={() => setSelectedTab("recent-jobs")}>
                <div className={`w-44 text-center bg-blue-50 rounded-lg py-2 font-semibold text-lg`}>
                  Recent jobs
                </div>
              </TabSelector>
              <TabSelector
                isActive={selectedTab === "all-jobs"}
                onClick={() => setSelectedTab("all-jobs")}>
                <div className="w-44 text-center bg-blue-50 rounded-lg py-2 font-semibold text-lg }">
                  All jobs
                </div>
              </TabSelector>
            </div>
          </div>

          <div>
            <TabPanel hidden={selectedTab !== "recent-jobs"}>
              <div className="flex flex-col items-center justify-center gap-4">
                <JobList
                  postBy="Ramesh"
                  postByPicURL="/assets/img/profile-image.png"
                  dateTimeOfPost="5 hours ago"
                  catetegoryOfPost="Plumber"
                  locationOfPost="Bharatpur"
                  jobTitleOfPost="Water Leakage & Tap Installation"
                  link="#"
                  jobTagsOfPost={
                    (jobTags = [
                      { tag: "Leakage" },
                      { tag: "Tap Installation" },
                      { tag: "Plumbing" },
                    ])
                  }
                  jobDescriptionOfPost="Description of the job is wirtten here. We should write what
        problem or solutions we need on this section. Employer posts a job
        and this is description from that post. Description of the job is wirtten here. We should write what
        problem or solutions we need on this section. Employer posts a job
        and this is description from that post.Description of the job is wirtten here. We should write what
        problem or solutions we need on this section. Employer posts a job
        and this is description from that post.Description of the job is wirtten here. We should write what
        problem or solutions we need on this section. Employer posts a job
        and this is description from that post."
                />
              </div>
            </TabPanel>
            <TabPanel hidden={selectedTab !== "all-jobs"}>
              <div className="flex flex-col items-center justify-center gap-4">
                <JobList
                  postBy="Ramesh"
                  postByPicURL="/assets/img/profile-image.png"
                  dateTimeOfPost="5 hours ago"
                  catetegoryOfPost="Plumber"
                  locationOfPost="Bharatpur"
                  jobTitleOfPost="Water Leakage & Tap Installation"
                  link="#"
                  jobTagsOfPost={
                    (jobTags = [
                      { tag: "Leakage" },
                      { tag: "Tap Installation" },
                      { tag: "Plumbing" },
                    ])
                  }
                  jobDescriptionOfPost="Description of the job is wirtten here. We should write what
        problem or solutions we need on this section. Employer posts a job
        and this is description from that post. Description of the job is wirtten here. We should write what
        problem or solutions we need on this section. Employer posts a job
        and this is description from that post.Description of the job is wirtten here. We should write what
        problem or solutions we need on this section. Employer posts a job
        and this is description from that post.Description of the job is wirtten here. We should write what
        problem or solutions we need on this section. Employer posts a job
        and this is description from that post."
                />
              </div>
              <div className="flex flex-col items-center justify-center gap-4">
                <JobList
                  postBy="Suresh"
                  postByPicURL="/assets/img/profile-image.png"
                  dateTimeOfPost="2 days ago"
                  catetegoryOfPost="Plumber"
                  locationOfPost="Rampur"
                  jobTitleOfPost="Dhara Halni"
                  link="#"
                  jobTagsOfPost={
                    (jobTags = [
                      { tag: "Leakage" },
                      { tag: "Tap Installation" },
                      { tag: "Plumbing" },
                    ])
                  }
                  jobDescriptionOfPost="Description of the job is wirtten here. We should write what
        problem or solutions we need on this section. Employer posts a job
        and this is description from that post. Description of the job is wirtten here. We should write what
        problem or solutions we need on this section. Employer posts a job
        and this is description from that post."
                />
              </div>
            </TabPanel>
          </div>

        </div>
      </div>
    </div>
  );
}

const JobList = ({
  dateTimeOfPost,
  catetegoryOfPost,
  locationOfPost,
  jobDescriptionOfPost,
  postBy,
  postByPicURL,
  jobTitleOfPost,
  jobTagsOfPost,
  link,
}: {
  dateTimeOfPost: string;
  catetegoryOfPost: string;
  locationOfPost: string;
  jobDescriptionOfPost: string;
  postBy: string;
  postByPicURL: string;
  jobTitleOfPost: string;
  jobTagsOfPost: any;
  link: string;
}) => {
  return (
    <div className="w-3/5 shadow-md shadow-200 hover:shadow-sm p-3">
      <div className="font-bold text-xl p-2">{jobTitleOfPost}</div>
      <div className="flex gap-4 italic p-3">
        <div className="h-7 w-7 relative rounded-full overflow-hidden ">
          <Image src={postByPicURL} alt="Profile Image" fill />
        </div>
        <p>{postBy}</p>
        <p>{dateTimeOfPost}</p>
        <p>{catetegoryOfPost}</p>
      </div>
      <div className="jobDetail text-lg px-3">
        <ReadMoreBtn>{jobDescriptionOfPost}</ReadMoreBtn>
      </div>
      <div className="flex mx-10 ">
        <div className="flex gap-2 ">
          {jobTagsOfPost.map((item: { tag: string }) => (
            <div className="rounded-2xl bg-slate-100 p-2">{item.tag}</div>
          ))}
        </div>
      </div>
      <div className="flex justify-between items-center p-5">
        <div className="italic  p-2">{locationOfPost}</div>
        <Link href={link}>
          <div className="p-2 bg-emerald-500 hover:bg-emerald-400 text-lg font-bold">
            Apply
          </div>
        </Link>
      </div>
    </div>
  );
};

const ReadMoreBtn = ({ children }: { children: any }) => {
  const [isReadMoreShown, setReadMoreShown] = useState(false);

  const toggleBtn = () => {
    setReadMoreShown((prevState) => !prevState);
  };
  return (
    <div>
      {isReadMoreShown ? children : children.substring(0, 200)}
      <button onClick={toggleBtn} className="font-bold text-teal-600 px-2">
        {isReadMoreShown ? " Show less " : " ...Show more "}
      </button>
    </div>
  );
};
