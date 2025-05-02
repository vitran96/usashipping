import React from 'react';
import Button from '@components/frontStore/cms/Button';

interface ComponentLayout {
  areaId: string;
  sortOrder: number;
}

const FeaturedCategories: React.FC = () => {
  return (
    <div className="mt-15">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 page-width">
        <div>
          <div className="text-center">
            <img src="/assets/homepage/banner/walmart-banner.jpeg" alt="" />
          </div>
          <h3 className="h4 uppercase mt-1 mb-1">Men shoes collection</h3>
          <div className="mb-1">
            <p>
              Affordable household items with great variaties and durabilities.
            </p>
          </div>
          <Button url="/Walmart" title="Shop Walmart" variant="primary" />
        </div>
        <div>
          <div>
            <img src="/assets/homepage/banner/costco-banner.jpeg" alt="" />
          </div>
          <h3 className="h4 uppercase mt-1 mb-1">Women shoes collection</h3>
          <div className="mb-1">
            <p>
              High quality products.
            </p>
          </div>
          <Button url="/Costco" title="Shop Costco" variant="primary" />
        </div>
        <div>
          <div>
            <img src="/assets/homepage/banner/kid-shoes.jpeg" alt="" />
          </div>
          <h3 className="h4 uppercase mt-1 mb-1">Men shoes collection</h3>
          <div className="mb-1">
            <p>
              Other great items.
            </p>
          </div>
          <Button url="/Misc" title="Shop Other Stores" variant="primary" />
        </div>
      </div>
    </div>
  );
}

export default FeaturedCategories;

export const layout: ComponentLayout = {
  areaId: 'content',
  sortOrder: 10
};