import { useRouter } from "next/router";

const JobId = () => {
  const router = useRouter();
  const { jobId } = router.query;

  return (
    <div className="flex justify-center items-center gap-2">
      <h1>JobDetails: </h1>
      <h2>{jobId}</h2>
    </div>
  );
};

export default JobId;
