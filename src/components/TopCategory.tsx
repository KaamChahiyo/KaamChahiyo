import Link from "next/link";
import React, { useState, useEffect } from "react";
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

const categories = [
  { name: "electrician", displayName: "Electrician", icon: ElectricianIcon },
  { name: "plumber", displayName: "Plumber", icon: PlumberIcon },
  { name: "household", displayName: "Household", icon: HomeIcon },
  { name: "it-services", displayName: "IT Solution", icon: ItServiceIcon },
  { name: "painter", displayName: "Painter", icon: PainterIcon },
  {
    name: "computer-repair",
    displayName: "Computer Repair",
    icon: ComputerIcon,
  },
  { name: "web-designer", displayName: "Web Designer", icon: WebdesignerIcon },
  { name: "photographer", displayName: "Photographer", icon: PhotographerIcon },
];

export default function TopCategory() {
  const [topCategories, setTopCategories] = useState([]);

  const fetchJobs = () => {
    fetch(`/api/jobs`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        const sortedData = data.jobs.sort((a, b) =>
          b.postedOn.localeCompare(a.postedOn)
        );

        const categoryJobs = categories.map((category) => ({
          name: category.name,
          displayName: category.displayName,
          icon: category.icon,
          activeJobs: countActiveJobs(category.name, sortedData),
        }));

        categoryJobs.sort((a, b) => b.activeJobs - a.activeJobs);

        setTopCategories(categoryJobs.slice(0, 5));
      });
  };

  const countActiveJobs = (category, jobs) => {
    const filteredJobs = jobs.filter((job) => job.Category.name === category);
    return filteredJobs.filter((job) => job.status === "approved").length;
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <div className="flex flex-wrap m-auto container gap-36 justify-center items-center">
        <div className="flex text-center font-bold text-2xl ">Top Category</div>
        <div className="grid grid-cols-3 md:grid-cols-5 flex-wrap justify-center text-sm text-center gap-10">
          {topCategories.map(({ name, displayName, icon }) => (
            <Category
              key={name}
              icon={icon}
              services={displayName}
              link={`/jobs/?category=${name}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

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
    <Link passHref href={link}>
      <div
        className="flex flex-col items-center justify-center shadow border hover:shadow-lg hover:shadow-blue-100 hover:scale-110
        border-gray-200 hover:border-cyan-600 rounded-lg overflow-hiddentext-emerald-700 w-24 h-24 p-16 gap-3"
      >
        <div className="h-20 w-16">{icon}</div>
        <> {services}</>
      </div>
    </Link>
  );
};
