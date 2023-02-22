import Link from "next/link";
import React, { useState } from "react";
import {
  ElectricianIcon,
  PlumberIcon,
  ComputerIcon,
  WebdesignerIcon,
  PhotographerIcon,
} from "../icons";

export default function TopServices() {
  const [searchDomain] = useState("category");

  return (
    <div className="flex flex-wrap m-auto container gap-36 justify-center items-center">
      <div className="text-center font-bold text-2xl">Top Services</div>
      <div className="flex flex-wrap justify-center text-center text-sm gap-10 ">
        <Services
          icon={ElectricianIcon}
          services={"Electrician"}
          link={`/jobs/?${searchDomain}=${"electrician"}`}
        />
        <Services
          icon={PlumberIcon}
          services={"Plumber"}
          link={`/jobs/?${searchDomain}=${"plumber"}`}
        />
        <Services
          icon={ComputerIcon}
          services={"Computer Repair"}
          link={`/jobs/?${searchDomain}=${"computer-repair"}`}
        />
        <Services
          icon={WebdesignerIcon}
          services={"Web Designer"}
          link={`/jobs/?${searchDomain}=${"web-designer"}`}
        />
        <Services
          icon={PhotographerIcon}
          services={"Photographer"}
          link={`/jobs/?${searchDomain}=${"photographer"}`}
        />
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
    <Link passHref href={link}>
      <div
        className="flex flex-col items-center justify-center  p-16  shadow hover:shadow-lg hover:shadow-blue-100 border hover:scale-110
        border-gray-200  hover:border-cyan-600  rounded-lg overflow-hidden text-emerald-700 w-24 h-24 gap-3"
      >
        <div className=" h-20 w-16">{icon}</div>
        <div className="font-sm w-auto"> {services}</div>
      </div>
    </Link>
  );
};
