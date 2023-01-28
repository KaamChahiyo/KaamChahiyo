import Link from "next/link";
import React from "react";

export default function RecentJobPost() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex font-bold text-2xl mb-8 py-4">Recent Jobs</div>
      <div className="flex justify-center items-center gap-4">
        <Recentjobs
          jobTitleOfPost="Job Title"
          postBy="Ramesh"
          postByPic=""
          dateTimeOfPost="5 hours ago"
          catetegoryOfPost="Plumber"
          locationOfPost="Bharatpur"
          link="#"
          jobDescriptionOfPost="Description of the job is wirtten here. We should write what
          problem or solutions we need on this section. Employer posts a job
          and this is description from that post."
        />

        <Recentjobs
          jobTitleOfPost="Job Title"
          postBy="Suresh"
          postByPic=""
          dateTimeOfPost="5 hours ago"
          catetegoryOfPost="Carpenter"
          locationOfPost="Bhaktapur"
          link="#"
          jobDescriptionOfPost="Description of the job is wirtten here. We should write what
          problem or solutions we need on this section. Employer posts a job
          and this is description from that post."
        />
      </div>
    </div>
  );
}

const Recentjobs = ({
  jobTitleOfPost,
  postBy,
  postByPic,
  dateTimeOfPost,
  catetegoryOfPost,
  jobDescriptionOfPost,
  locationOfPost,
  link,
}: {
  jobTitleOfPost: string;
  postBy: string;
  postByPic: string;
  dateTimeOfPost: string;
  catetegoryOfPost: string;
  jobDescriptionOfPost: string;
  locationOfPost: string;
  link: string;
}) => {
  return (
    <Link href={link} className="w-1/3">
      <div className="shadow-lg hover:shadow-sm p-5">
        <div className="font-bold text-xl">{jobTitleOfPost}</div>
        <div className="flex gap-4 italic p-3">
          <p>{postBy}</p>
          <p>{postByPic}</p>
          <p>{dateTimeOfPost}</p>
          <p>{catetegoryOfPost}</p>
        </div>
        <div className="jobDetail text-lg px-3">{jobDescriptionOfPost}</div>
        <div className="italic p-8">{locationOfPost}</div>
      </div>
    </Link>
  );
};
