import Link from "next/link";
import React from "react";
import { ComputerIcon } from "../icons/ComputerIcon";
import { ElectricianIcon } from "../icons/ElectricainIcon";
import { PhotographerIcon } from "../icons/PhotographerIcon";
import { PlumberIcon } from "../icons/PlumberIcon";
import { WebdesignerIcon } from "../icons/WebdesignerIcon";

const Category = ({
  icon,
  services,
  link,
}: {
  icon: JSX.Element;
  services: string;
  link: string;
}) => {
  return (
    <Link href={link}>
      <div className="flex items-center justify-center rounded-md hover:opacity-60  text-emerald-700 w-24 h-24 ">
        <div className=" h-20 w-16">
          {icon}
          {services}
        </div>
      </div>
    </Link>
  );
};

export default function TopCategory() {
  return (
    <div className=" flex w-full h-32">
      <div className=" w-1/3 text-center p-5 font-bold ">Top Category</div>
      <div className="w-2/3 flex gap-20  ">
        <Category icon={ElectricianIcon} services={"Electrician"} link="#" />
        <Category icon={PlumberIcon} services={"Plumber"} link="#" />
        <Category icon={ComputerIcon} services={"Computer Repair"} link="#" />
        <Category icon={WebdesignerIcon} services={"Web-Designer"} link="#" />
        <Category icon={PhotographerIcon} services={"Photo-Grapher"} link="#" />
      </div>
    </div>
  );
}
