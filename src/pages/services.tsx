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
    <div className="flex items-center justify-center pb-5 m-auto gap-10">
      <div className="grid grid-cols-4 p-3 gap-10 place-content-center">
        <AllServices
          icon={PlumberIcon}
          services={"Plumber"}
          activeJobs="5"
          rank="N/A"
        />

        <AllServices
          icon={ElectricianIcon}
          services={"Electrician"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          icon={ComputerIcon}
          services={"Computer Repair"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          icon={HomeIcon}
          services={"HouseHold"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          icon={PainterIcon}
          services={"Painter"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          icon={ItServiceIcon}
          services={"It Service"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
          icon={WebdesignerIcon}
          services={"Web Designer"}
          activeJobs="5"
          rank="N/A"
        />
        <AllServices
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
}: {
  icon: JSX.Element;
  services: string;
  activeJobs: string;
  rank: string;
}) => {
  return (
    <div className="flex gap-10">
      <div className="flex flex-row w-auto gap-5 border rounded-lg shadow-lg p-5">
        <div className="h-32 w-32">{icon}</div>
        <div className="flex flex-col">
          <div className="font-bold text-lg w-36 pb-1">{services}</div>
          <div className="font-medium">Active Jobs:</div>
          <div className="font-semibold mx-4 ">{activeJobs}</div>
          <div className="">Rank:</div>
          <div className="font-medium mx-2">{rank}</div>
        </div>
      </div>
    </div>
  );
};
