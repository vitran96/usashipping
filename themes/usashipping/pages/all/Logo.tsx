import React from "react";

interface ComponentLayout {
  areaId: string;
  sortOrder: number;
}

const Logo: React.FC = () => {
  return (
    <div>
      <a href="/">
        <img src="/eve.svg" alt="eve" />
      </a>
    </div>
  );
}

export default Logo;

export const layout: ComponentLayout = {
  areaId: "header",
  sortOrder: 5,
};