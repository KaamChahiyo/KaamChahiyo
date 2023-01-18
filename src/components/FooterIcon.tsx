import Link from "next/link";
import React from "react";

export const FooterIcon = ({
  icon,
  link,
}: {
  icon: JSX.Element;
  link: string;
}) => {
  return (
    <Link href={link}>
      <div className="flex items-center justify-center rounded-full hover:opacity-50 bg-white text-emerald-700 w-10 h-10 ">
        <div className="h-8 w-8 ">{icon}</div>
      </div>
    </Link>
  );
};
export default FooterIcon;
