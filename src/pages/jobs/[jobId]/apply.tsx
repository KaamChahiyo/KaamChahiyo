import React, { useEffect } from "react";

export default function apply({ job, params }) {
  // console.log("Params: ", params);

  // console.log("job: ", job);
  return (
    <div className="flex justify-center items-center">
      Apply Form {params.jobId}
    </div>
  );
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}
