import Image from "next/image";
import React from "react";

function TopEmployees() {
  return (
    <div className="">
      <div className="flex justify-center text-2xl py-6">Top Employees</div>
      <div className="flex gap-10 justify-center">
        <TopEmployee
          avatarURL="/assets/img/profile-image.png"
          employeeName=""
          employeeDescription="Hello I am top employee. I did many good jobs so I became top
employee."
          employeeTag="Software Engineer"
        />
        <TopEmployee
          avatarURL="/assets/img/profile-image.png"
          employeeName=""
          employeeDescription="Hello I am top employee. I did many good jobs so I became top
employee."
          employeeTag="Software Engineer"
        />
        <TopEmployee
          avatarURL="/assets/img/profile-image.png"
          employeeName=""
          employeeDescription="Hello I am top employee. I did many good jobs so I became top
employee."
          employeeTag="Software Engineer"
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
}: {
  avatarURL: string;
  employeeName: string;
  employeeDescription: string;
  employeeTag: string;
}) => {
  return (
    <>
      <div className="flex flex-col border container  shadow-md w-96 gap-4 p-10  rounded-lg">
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
      </div>
    </>
  );
};
