import React from "react";
import "./MainBanner.scss";

// Define layout export type for EverShop
interface ComponentLayout {
  areaId: string;
  sortOrder: number;
}

const MainBanner: React.FC = () => {
  return (
    <div className="main-banner-home flex items-center">
      <div className="page-width grid grid-cols-1 md:grid-cols-2 gap-2">
        <div className="text-center md:text-left px-2 ">
          <h2 className="h1">Gift the best for your loved ones</h2>
          <p>Shop and Ship by Us</p>
          <p></p>
          <a className="button button-primary" href="#">
            SHOW NOW
          </a>
        </div>
        <div />
      </div>
    </div>
  );
}

export default MainBanner;

export const layout: ComponentLayout = {
  areaId: "content",
  sortOrder: 1,
};