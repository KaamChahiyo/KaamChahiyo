import React from "react";

export default function RecentJobPost() {
  const postDetails = [
    {
      postBy: "",
      postByPic: "",
      locationOfPost: "location",
      dateTimeOfPost: "5 hours ago",
      catetegoryOfPost: "Category",
      jobTitleOfPost: "Job title",
      descriptionOfPost: "description",
    },
  ];
  return (
    <div className="m-auto">
      <div className=" p-10 font-bold text-xl">Recent Job posting</div>
      <div className="flex overflow-x-auto gap-5  px-10 mx-5 ">
        <div className="Job_1 w-1/3 shadow-lg">
          {postDetails.map((postDetail) => {
            return <PostDetailsProp postBy={postDetail.postBy} />;
          })}
        </div>
      </div>
    </div>
  );
}

const PostDetailsProp = ({
  postBy,
  postByPic,
  locationOfPost,
  dateTimeOfPost,
  catetegoryOfPost,
  jobTitleOfPost,
  descriptionOfPost,
}: {
  postBy: string;
  postByPic: string;
  locationOfPost: string;
  dateTimeOfPost: string;
  catetegoryOfPost: string;
  jobTitleOfPost: string;
  descriptionOfPost: string;
}) => {
  return (
    <div>
      <div className="font-bold p-5 text-xl">{postDetails.jobTitleOfPost}</div>
      <div className="flex gap-4 italic p-3">
        <p>{postDetails.dateTimeOfPost}</p>
        <p>{postDetails.catetegoryOfPost}</p>
      </div>
      <div className="jobDetail text-lg px-3">
        Description of the job is wirtten here. We should write what problem or
        solutions we need on this section. Employer posts a job and this is
        description from that post.
      </div>
      <div className="italic p-8">{postDetails.locationOfPost}</div>
    </div>
  );
};
