import React from "react";

interface ComponentLayout {
  areaId: string;
  sortOrder: number;
}

const FreeShippingBar: React.FC = () => {
  return (
    <div className="page-width">
      <div className="grid grid-cols-1 md:grid-cols-3 md:divide-x border-divider border my-3">
        <div className="p-2 border-divider">
          <h2>Convenience</h2>
          <p>Shop at the best stores wherever you are.</p>
        </div>
        <div className="p-2 border-divider">
          <h2>Swiftness</h2>
          <p>We ship the gifts in 1 business day.</p>
        </div>
        <div className="p-2 border-divider">
          <h2>Great Service</h2>
          <p>Our customer service is available throughout the week.</p>
        </div>
      </div>
    </div>
  );
}

export default FreeShippingBar;

export const layout: ComponentLayout = {
  areaId: "content",
  sortOrder: 2,
};