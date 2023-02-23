import Link from "next/link";
import React, { useState } from "react";
import {
  PlumberIcon,
  ItServiceIcon,
  PainterIcon,
  ElectricianIcon,
  HomeIcon,
} from "../icons";

export default function TopCategory() {
  const [searchDomain] = useState("category");

  return (
    <div className="flex flex-wrap m-auto container gap-36 justify-center items-center">
      <div className="flex text-center font-bold text-2xl ">Top Category</div>
      <div className="flex flex-wrap justify-center text-sm text-center gap-10  ">
        <Category
          icon={ElectricianIcon}
          services={"Electrician"}
          link={`/jobs/?${searchDomain}=${"electrician"}`}
        />
        <Category
          icon={PlumberIcon}
          services={"Plumber"}
          link={`/jobs/?${searchDomain}=${"plumber"}`}
        />
        <Category
          icon={HomeIcon}
          services={"Household"}
          link={`/jobs/?${searchDomain}=${"household"}`}
        />
        <Category
          icon={ItServiceIcon}
          services={"IT Solution"}
          link={`/jobs/?${searchDomain}=${"it-services"}`}
        />
        <Category
          icon={PainterIcon}
          services={"Painter"}
          link={`/jobs/?${searchDomain}=${"painter"}`}
        />
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
        <div> {services}</div>
      </div>
    </Link>
  );
};
