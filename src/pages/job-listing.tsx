import React, { useState } from "react";

export default function JobListing() {
  return (
    <div className="flex flex-col items-center justify-center p-10 bg-gradient-to-b from-emerald-50 to-emerald-100">
      <div className="flex font-bold text-2xl p-3">Jobs you might like</div>
      <div className="flex flex-col items-center justify-center gap-4">
        <JobList
          postBy="Ramesh"
          postByPic=""
          dateTimeOfPost="5 hours ago"
          catetegoryOfPost="Plumber"
          locationOfPost="Bharatpur"
          jobTitleOfPost="Job Title"
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
    <div className="w-3/5 shadow-lg shadow-green-200 hover:shadow-sm p-3">
      <div className="font-bold text-xl p-2">{jobTitleOfPost}</div>
      <div className="flex gap-4 italic p-3">
        <p>{postBy}</p>
        <p>{postByPic}</p>
        <p>{dateTimeOfPost}</p>
        <p>{catetegoryOfPost}</p>
      </div>
      <div className="jobDetail text-lg px-3">
        <ReadMoreBtn>{jobDescriptionOfPost}</ReadMoreBtn>
      </div>
      <div className="italic p-8">{locationOfPost}</div>
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
        {isReadMoreShown ? " Less " : " ...More "}
      </button>
    </div>
  );
};
