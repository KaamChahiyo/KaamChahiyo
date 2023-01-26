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
    <div className=" flex w-full h-32">
      <div className=" w-1/3 text-center p-5 font-bold ">Top Category</div>
      <div className="w-2/3 text-sm text-center flex gap-[5%]  ">
        <Category icon={ElectricianIcon} services={"Electrician"} link="#" />
        <Category icon={PlumberIcon} services={"Plumber"} link="#" />
        <Category icon={HomeIcon} services={"House-Hold"} link="#" />
        <Category icon={ItServiceIcon} services={"IT-Solution"} link="#" />
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
      <div className="flex flex-col items-center justify-center rounded-md hover:opacity-60  text-emerald-700 w-24 h-24 ">
        <div className=" h-20 w-16">{icon}</div>
        <div> {services}</div>
      </div>
    </Link>
  );
};
