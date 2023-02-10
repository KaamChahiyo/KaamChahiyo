import Link from "next/link";
import React from "react";
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
  return (
    <div className="flex items-center justify-center pb-5 m-auto">
      <div className="grid grid-cols-3 p-3 gap-12 place-content-center">
        <AllServices
          link=""
          icon={PlumberIcon}
          services={"Plumber"}
          activeJobs="5"
          rank="N/A"
        />

        <AllServices
          link=""
          icon={ElectricianIcon}
          services={"Electrician"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          link=""
          icon={ComputerIcon}
          services={"Computer Repair"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          link=""
          icon={HomeIcon}
          services={"House Hold"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          link=""
          icon={PainterIcon}
          services={"Painter"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          link=""
          icon={ItServiceIcon}
          services={"It Service"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          link=""
          icon={WebdesignerIcon}
          services={"Web Designer"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          link=""
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
    <Link href={link} className="flex gap-10">
      <div className="flex flex-row w-auto gap-5 border rounded-lg shadow-lg hover:shadow-sm p-5 bg-slate-50 hover:scale-110  items-center">
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
