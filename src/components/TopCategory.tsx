import Link from "next/link";
import React from "react";
import {
  PlumberIcon,
  ItServiceIcon,
  PainterIcon,
  ElectricianIcon,
  HomeIcon,
} from "../icons";

export default function TopCategory() {
  return (
    <div className="flex m-auto container gap-36 justify-center items-center p-10">
      <div className="text-center font-bold text-2xl ">Top Category</div>
      <div className="text-sm text-center flex gap-10  ">
        <Category icon={ElectricianIcon} services={"Electrician"} link="#" />
        <Category icon={PlumberIcon} services={"Plumber"} link="#" />
        <Category icon={HomeIcon} services={"Household"} link="#" />
        <Category icon={ItServiceIcon} services={"IT Solution"} link="#" />
        <Category icon={PainterIcon} services={"Painter"} link="#" />
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
    <Link href={link}>
      <div
        className="flex flex-col items-center justify-center shadow p-16 border rounded-md hover:opacity-60
       text-emerald-700 w-24 h-24 gap-3"
      >
        <div className=" h-20 w-16">{icon}</div>
        <div> {services}</div>
      </div>
    </Link>
  );
};
