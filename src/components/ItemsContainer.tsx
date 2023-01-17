import Item from "./Item";
import { About, Catagories, QuickLinks, Location } from "../components/Menus";
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
