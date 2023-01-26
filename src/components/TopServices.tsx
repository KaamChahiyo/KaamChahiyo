import Link from "next/link";
import React from "react";
import {
  ElectricianIcon,
  PlumberIcon,
  ComputerIcon,
  WebdesignerIcon,
  PhotographerIcon,
} from "../icons";

export default function TopServices() {
  return (
    <div className=" flex w-full h-32">
      <div className=" w-1/3 text-center  p-5 font-bold ">Top Services</div>
      <div className="w-2/3 text-center  flex text-sm gap-[5%]  ">
        <Services icon={ElectricianIcon} services={"Electrician"} link="#" />
        <Services icon={PlumberIcon} services={"Plumber"} link="#" />
        <Services icon={ComputerIcon} services={"Computer-Repair"} link="#" />
        <Services icon={WebdesignerIcon} services={"Web-Designer"} link="#" />
        <Services icon={PhotographerIcon} services={"Photo-Grapher"} link="#" />
      </div>
    </div>
  );
}

const Services = ({
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
      <div className="flex flex-col items-center justify-center rounded-md hover:opacity-60  text-emerald-700 w-auto h-24 ">
        <div className=" h-20 w-16">{icon}</div>
        <div className="font-sm w-auto"> {services}</div>
      </div>
    </Link>
  );
};
