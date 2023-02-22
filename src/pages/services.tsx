import Link from "next/link";
import React, { useState } from "react";
import {
  ComputerIcon,
  ElectricianIcon,
  HomeIcon,
  ItServiceIcon,
  PainterIcon,
  PhotographerIcon,
  PlumberIcon,
  WebdesignerIcon,
} from "../icons";

export default function Services() {
  const [searchDomain] = useState("category");

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 py-5 gap-12 place-content-center">
        <AllServices
          link={`/jobs/?${searchDomain}=${"plumber"}`}
          icon={PlumberIcon}
          services={"Plumber"}
          activeJobs="5"
          rank="N/A"
        />

        <AllServices
          link={`/jobs/?${searchDomain}=${"electrician"}`}
          icon={ElectricianIcon}
          services={"Electrician"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          link={`/jobs/?${searchDomain}=${"computer-repair"}`}
          icon={ComputerIcon}
          services={"Computer Repair"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          link={`/jobs/?${searchDomain}=${"household"}`}
          icon={HomeIcon}
          services={"House Hold"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          link={`/jobs/?${searchDomain}=${"painter"}`}
          icon={PainterIcon}
          services={"Painter"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          link={`/jobs/?${searchDomain}=${"it-services"}`}
          icon={ItServiceIcon}
          services={"It Service"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          link={`/jobs/?${searchDomain}=${"web-designer"}`}
          icon={WebdesignerIcon}
          services={"Web Designer"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          link={`/jobs/?${searchDomain}=${"photographer"}`}
          icon={PhotographerIcon}
          services={"Photo Grapher"}
          activeJobs="5"
          rank="N/A"
        />
      </div>
    </div>
  );
}

const AllServices = ({
  icon,
  services,
  activeJobs,
  rank,
  link,
}: {
  link: string;
  icon: JSX.Element;
  services: string;
  activeJobs: string;
  rank: string;
}) => {
  return (
    <Link passHref href={link} className="flex gap-10">
      <div className="flex items-center gap-5 shadow border border-gray-200 hover:border-cyan-600 rounded-lg overflow-hidden p-5 bg-slate-50 hover:scale-110 ">
        <div className="w-24 opacity-70 ">{icon}</div>
        <div className="flex flex-col">
          <div className="font-bold text-3xl w-48 pb-1">{services}</div>
          <div className="text-lg pb-2">Active Jobs: &nbsp; {activeJobs}</div>
          <div className="pb-1">Rank: &nbsp; {rank}</div>
          <div className="text-lg mx-2"></div>
        </div>
      </div>
    </Link>
  );
};
