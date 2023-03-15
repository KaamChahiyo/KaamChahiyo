import Link from "next/link";
import React, { useEffect, useState } from "react";
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

  let [job, setJob] = useState([]);

  useEffect(() => {
    fetch(`/api/jobs`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.jobs.sort((a, b) =>
          b.postedOn.localeCompare(a.postedOn)
        );
        setJob(sortedData);
      });
  }, []);

  const countActiveJobs = (category) => {
    const filteredJobs = job.filter((job) => job.Category.name === category);
    return filteredJobs.filter((job) => job.status === "approved").length;
  };

  const categories = [
    { name: "plumber", displayName: "Plumber", icon: PlumberIcon },
    { name: "electrician", displayName: "Electrician", icon: ElectricianIcon },
    {
      name: "computer-repair",
      displayName: "Computer Repair",
      icon: ComputerIcon,
    },
    { name: "household", displayName: "Household", icon: HomeIcon },
    { name: "painter", displayName: "Painter", icon: PainterIcon },
    { name: "it-services", displayName: "IT Services", icon: ItServiceIcon },
    {
      name: "web-designer",
      displayName: "Web Designer",
      icon: WebdesignerIcon,
    },
    {
      name: "photographer",
      displayName: "Photographer",
      icon: PhotographerIcon,
    },
  ];

  const categoryJobs = categories.map((category) => ({
    name: category.name,
    displayName: category.displayName,
    icon: category.icon,
    activeJobs: countActiveJobs(category.name),
  }));

  categoryJobs.sort((a, b) => b.activeJobs - a.activeJobs);

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-3 py-5 gap-12 place-content-center">
        {categoryJobs.map((category) => (
          <AllServices
            key={category.name}
            link={`/jobs/?${searchDomain}=${category.name}`}
            icon={category.icon}
            services={category.displayName}
            activeJobs={category.activeJobs}
            rank={categoryJobs.indexOf(category) + 1}
          />
        ))}
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
  activeJobs: number;
  rank: number;
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
