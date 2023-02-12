import React from "react";

export default function apply({ job, params }) {
  console.log("Params: ", params);

  console.log("job: ", job);
  return <div>Apply Form {params.jobId}</div>;
}

export async function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}
