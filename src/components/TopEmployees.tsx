import Image from "next/image";
import Link from "next/link";
import React from "react";

function TopEmployees() {
  return (
    <div className="">
      <div className="flex justify-center font-bold text-2xl mb-8 py-4">
        Top Employees
      </div>
      <div className="flex gap-10 justify-center">
        <TopEmployee
          avatarURL="/assets/img/profile-image.png"
          employeeName="Ananta Raj Mishra"
          employeeDescription="Hello I am top employee. I did many good jobs so I became top
employee."
          employeeTag="Software Engineer"
          link="#"
        />
        <TopEmployee
          avatarURL="/assets/img/profile-image.png"
          employeeName="Suman Chalise"
          employeeDescription="Hello I am top employee. I did many good jobs so I became top
employee."
          employeeTag="Software Engineer"
          link="#"
        />
        <TopEmployee
          avatarURL="/assets/img/profile-image.png"
          employeeName="Deepak Acharya"
          employeeDescription="Hello I am top employee. I did many good jobs so I became top
employee."
          employeeTag="Software Engineer"
          link="#"
        />
      </div>
    </div>
  );
}
export default TopEmployees;

const TopEmployee = ({
  avatarURL,
  employeeName,
  employeeDescription,
  employeeTag,
  link,
}: {
  avatarURL: string;
  employeeName: string;
  employeeDescription: string;
  employeeTag: string;
  link: string;
}) => {
  return (
    <>
      <Link
        passHref href={link}
        className="flex flex-col border container shadow-md hover:shadow-sm w-96 gap-4 p-10  rounded-lg"
      >
        <div className="flex flex-col gap-2 justify-center items-center">
          <div className="h-20 w-20 relative rounded-full overflow-hidden ">
            <Image src={avatarURL} alt="Profile Image" fill />
          </div>
          <div className="text-lg text-center font-bold">{employeeName}</div>
        </div>
        <div className="flex flex-col justify-center items-center text-center gap-2">
          <div className="text-lg">{employeeDescription}</div>
          <div className="flex">
            <div key="" className="rounded-2xl bg-slate-100 p-2 text-sm">
              {employeeTag}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
