import Link from "next/link";
import React from "react";
import Image from "next/image";

export default function RecentJobPost() {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex font-bold text-2xl py-4">Recent Jobs</div>
      <div className="flex flex-col justify-center items-center gap-4">
        <JobList
          postBy="Ramesh"
          postByPicURL="/assets/img/profile-image.png"
          dateTimeOfPost="5 hours ago"
          catetegoryOfPost="Plumber"
          locationOfPost="Bharatpur"
          jobTitleOfPost="Water Leakage & Tap Installation"
          link="#"
          jobDescriptionOfPost="Description of the job is wirtten here. We should write what
                    problem or solutions we need on this section. Employer posts a job
                    and this is description from that post. Description of the job is wirtten here. We should write what
                    problem or solutions we need on this section."
        />
      </div>
      <div className="bg-[#4ed131] rounded-lg font-bold p-3">
        <Link passHref href="/job-listing">Show More Jobs</Link>
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
  link,
}: {
  dateTimeOfPost: string;
  catetegoryOfPost: string;
  locationOfPost: string;
  jobDescriptionOfPost: string;
  postBy: string;
  postByPicURL: string;
  jobTitleOfPost: string;
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
        {jobDescriptionOfPost.substring(0, 200)}
      </div>
      <div className="flex mx-10 "></div>
      <div className="flex justify-between items-center p-5">
        <div className="italic  p-2">{locationOfPost}</div>
        <Link passHref href={link}>
          <div className="p-2 bg-[#5ddd40] hover:bg-[#77e95d] text-lg font-bold">
            Show More
          </div>
        </Link>
      </div>
    </div>
  );
};
