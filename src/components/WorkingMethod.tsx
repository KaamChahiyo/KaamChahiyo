import Link from "next/link";
import React from "react";

export default function WorkingMethod() {
  return (
    <div className="container m-auto w-full flex flex-col justify-center gap-10 mt-16 pb-10">
      <div className="text-2xl text-center font-bold">Working Procedure</div>
      <div className="gap-10 flex flex-row justify-center ">
        <Method
          step="1"
          name={"Create Account"}
          description={"Register, Get Verified and Login to KaamChahiyo"}
          link="/signup"
        />
        <Method
          step="2"
          name={"Post / Apply for Job "}
          description={"Post Job or Apply for Job as per your need."}
          link="/post-job"
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
    <Link href={link}>
      <div className="flex flex-col items-center justify-center shadow-lg hover:shadow-sm border rounded-lg overflow-hidden px-10 py-36 w-96 h-56">
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
