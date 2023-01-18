import { FacebookIcon, TelegramIcon, GithubIcon } from "../icons";
import FooterIcon from "./FooterIcon";

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
