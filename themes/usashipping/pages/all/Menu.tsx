import React from "react";

interface MenuItem {
  name: string;
  url: string;
}

interface MenuProps {
  menu: {
    items: MenuItem[];
  };
}

interface ComponentLayout {
  areaId: string;
  sortOrder: number;
}

const Menu: React.FC<MenuProps> = ({ menu: { items } }) => {
  return (
    <div className="main-menu self-center hidden md:block">
      <ul className="nav flex space-x-275 justify-content-center">
        {items.map((i, index) => (
          <li className="nav-item" key={index}>
            <a className="nav-link hover:underline" href={i.url}>
              {i.name}
            </a>
          </li>
        ))}
        <li className="nav-item">
          <a className="nav-link hover:underline" href={"/page/contact"}>
            Contact
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;

export const layout: ComponentLayout = {
  areaId: "header",
  sortOrder: 1,
};

export const query = `
  query {
    menu {
      items {
        name
        url
      }
    }
}`;