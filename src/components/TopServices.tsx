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
    <div className="flex m-auto container gap-36 justify-center items-center p-10">
      <div className="text-center font-bold text-2xl">Top Services</div>
      <div className="text-center  flex text-sm gap-10 ">
        <Services icon={ElectricianIcon} services={"Electrician"} link="#" />
        <Services icon={PlumberIcon} services={"Plumber"} link="#" />
        <Services icon={ComputerIcon} services={"Computer Repair"} link="#" />
        <Services icon={WebdesignerIcon} services={"Web Designer"} link="#" />
        <Services icon={PhotographerIcon} services={"Photographer"} link="#" />
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
      <div
        className="flex flex-col items-center justify-center shadow p-16 border rounded-md hover:opacity-60
       text-emerald-700 w-24 h-24 gap-3"
      >
        <div className=" h-20 w-16">{icon}</div>
        <div className="font-sm w-auto"> {services}</div>
      </div>
    </Link>
  );
};
