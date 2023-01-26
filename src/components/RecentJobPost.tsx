import React from "react";

export default function RecentJobPost() {
  let postBy = "";
  let postByPic = "";
  let locationOfPost = "location";
  let dateTimeOfPost = "5 hours ago";
  let catetegoryOfPost = "Category";
  return (
    <div className="m-auto">
      <div className=" p-10 font-bold text-xl">Recent Job posting</div>
      <div className="flex overflow-x-auto gap-5  px-10 mx-5 ">
        <div className="Job_1 w-1/3 shadow-lg">
          <div className="font-bold p-5 text-xl">Job Title</div>
          <div className="flex gap-4 italic p-3">
            <p>{dateTimeOfPost}</p>
            <p>{catetegoryOfPost}</p>
          </div>
          <div className="jobDetail text-lg px-3">
            Description of the job is wirtten here. We should write what problem
            or solutions we need on this section. Employer posts a job and this
            is description from that post.
          </div>
          <div className="italic p-8">{locationOfPost}</div>
        </div>

        <div className="Job_1 w-1/3 shadow-lg">
          <div className="font-bold p-5 text-xl">Job Title</div>
          <div className="flex gap-4 italic p-3">
            <p>{dateTimeOfPost}</p>
            <p>{catetegoryOfPost}</p>
          </div>
          <div className="jobDetail text-lg px-3">
            Description of the job is wirtten here. We should write what problem
            or solutions we need on this section. Employer posts a job and this
            is description from that post.
          </div>
          <div className="italic p-8">{locationOfPost}</div>
        </div>

        <div className="Job_1 w-1/3 shadow-lg">
          <div className="font-bold p-5 text-xl">Job Title</div>
          <div className="flex gap-4 italic p-3">
            <p>{dateTimeOfPost}</p>
            <p>{catetegoryOfPost}</p>
          </div>
          <div className="jobDetail text-lg px-3">
            Description of the job is wirtten here. We should write what problem
            or solutions we need on this section. Employer posts a job and this
            is description from that post.
          </div>
          <div className="italic p-8">{locationOfPost}</div>
        </div>
      </div>
    </div>
  );
}
