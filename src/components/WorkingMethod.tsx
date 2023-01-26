import Link from "next/link";
import React from "react";
import { AccIcon, AddIcon, PayIcon } from "../icons";

export default function WorkingMethod() {
  return (
    <div className=" w-full h-32">
      <div className="w-full h-10">Working Procedure</div>
      <div className="flex w-full h-20">
        <div className="w-1/3">
          <Method
            icon={AccIcon}
            name={"Create Account"}
            description={"Register, Get Verified and Login to KaamChahiyo"}
            link="#"
          />
        </div>
        <div className="w-1/3">
          <Method
            icon={AddIcon}
            name={"Post Job/Apply for Job "}
            description={"Post Job or Apply for Job as per your need."}
            link="#"
          />
        </div>
        <div className="w-1/3">
          <Method
            icon={PayIcon}
            name={"Get Paid"}
            description={"After Job is Completed Get Paid "}
            link="#"
          />
        </div>
      </div>
    </div>
  );
}

const Method = ({
  icon,
  name,
  link,
  description,
}: {
  icon: JSX.Element;
  name: string;
  link: string;
  description: string;
}) => {
  return (
    <Link href={link}>
      <div className="items-center justify-center">{icon}</div>
      <div className="w-auto font-bold">{name}</div>
      <div className="w-auto font-sm">{description}</div>
    </Link>
  );
};
