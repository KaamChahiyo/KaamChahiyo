import Link from "next/link";
import { FacebookIcon, GithubIcon, TelegramIcon } from "../icons";

const FooterIcon = ({ icon, link }: { icon: JSX.Element; link: string }) => {
  return (
    <Link href={link}>
      <div className="flex items-center justify-center rounded-full hover:opacity-50 bg-white text-[#0063F1] w-10 h-10 ">
        <div className="h-8 w-8 ">{icon}</div>
      </div>
    </Link>
  );
};

const SocialIcons = () => {
  return (
    <div className="flex gap-5 ">
      <FooterIcon icon={FacebookIcon} link="#" />
      <FooterIcon icon={TelegramIcon} link="#" />
      <FooterIcon icon={GithubIcon} link="#" />
    </div>
  );
};
export default SocialIcons;
