import React from "react";

export default function JobListing() {
  return (
    <div>
      <div className="p-10 text-center font-bold text-2xl">Job Lists</div>
      <div className=" ">
        <JobList
          postBy="Ramesh"
          postByPic=""
          dateTimeOfPost="5 hours ago"
          catetegoryOfPost="Plumber"
          locationOfPost="Bharatpur"
          jobDescriptionOfPost="Description of the job is wirtten here. We should write what
        problem or solutions we need on this section. Employer posts a job
        and this is description from that post."
          jobTitleOfPost="Job Title"
        />
        <JobList
          postBy="Suresh"
          postByPic=""
          dateTimeOfPost="3 hours ago"
          catetegoryOfPost="Carpenter"
          locationOfPost="Bharatpur"
          jobDescriptionOfPost="Description of the job is wirtten here. We should write what
        problem or solutions we need on this section. Employer posts a job
        and this is description from that post."
          jobTitleOfPost="Job Title"
        />
        <JobList
          postBy="Sandesh"
          postByPic=""
          dateTimeOfPost="9 hours ago"
          catetegoryOfPost="Painter"
          locationOfPost="Kathmandu"
          jobDescriptionOfPost="Description of the job is wirtten here. We should write what
        problem or solutions we need on this section. Employer posts a job
        and this is description from that post."
          jobTitleOfPost="Job Title"
        />
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
  postByPic,
  jobTitleOfPost,
}: {
  dateTimeOfPost: string;
  catetegoryOfPost: string;
  locationOfPost: string;
  jobDescriptionOfPost: string;
  postBy: string;
  postByPic: string;
  jobTitleOfPost: string;
}) => {
  return (
    <div>
      <div className="m-auto container ">
        <div className="flex gap-5">
          <div className="w-1/3 shadow-lg hover:shadow-sm">
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
        </div>
      </div>
    </div>
  );
};
