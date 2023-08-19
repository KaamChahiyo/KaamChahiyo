import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function WorkingMethod() {
  const { data: userData } = useSession();
  const user = userData?.user;
  const [description, setDescription] = useState("");
  const [link, setLink] = useState("");

  let role = user?.["role"];

  useEffect(() => {
    if (role == "employer") {
      setDescription("Post Job");
      setLink("/post-job");
    } else {
      setDescription("Apply for Job");
      setLink("/jobs");
    }
  }, [role]);
  return (
    <div className="flex flex-col container m-auto w-full justify-center gap-10 mb-16">
      <div className="text-2xl text-center font-bold">Working Procedure</div>
      <div className="flex flex-row flex-wrap gap-10 justify-center ">
        <Method
          step="1"
          name={"Create Account"}
          description={"Register, Get Verified and Login to KaamChahiyo"}
          link="/signup"
        />

        <Method
          step="2"
          name={description}
          description={description}
          link={link}
        />
        <Method
          step="3"
          name={"Get Pay/Paid"}
          description={"After Job is Completed Get Paid "}
          link="#"
        />
      </div>
    </div>
  );
}

const Method = ({
  step,
  name,
  link,
  description,
}: {
  step: string;
  name: string;
  link: string;
  description: string;
}) => {
  return (
    <Link passHref href={link}>
      <div
        className="flex flex-col items-center shadow hover:shadow-lg 
       hover:shadow-blue-100 border border-gray-200  hover:border-cyan-600  rounded-lg overflow-hidden
       px-10 py-10 w-96 h-72"
      >
        <div
          className="text-6xl font-bold px-5 py-2 rounded-full
         hover:text-white hover:bg-black hover:border-black border-4 border-black "
        >
          {step}
        </div>
        <div className="font-bold py-5">{name}</div>
        <div className="font-sm text-center">{description}</div>
      </div>
    </Link>
  );
};
