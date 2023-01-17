import { About, Catagories, QuickLinks, Location } from "../components/Menus";

const Item = ({ Links, title }: { Links: string; title: string }) => {
  return (
    <ul>
      <h1 className="mb-1 font-semibold">{title}</h1>
      {Links.map((link) => (
        <li key={link.name}>
          <a
            className="text-gray-400 hover:text-teal-400 duration-300
          text-sm cursor-pointer leading-6"
            href={link.link}
          >
            {link.name}
          </a>
        </li>
      ))}
    </ul>
  );
};

const ItemsContainer = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
      <Item Links={About} title="ABOUT" />
      <Item Links={Catagories} title="CATAGORIES" />
      <Item Links={QuickLinks} title="QUICKLINKS" />
      <Item Links={Location} title="LOCATION" />
    </div>
  );
};

export default ItemsContainer;
