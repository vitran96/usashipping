import React from 'react';
import { Items } from '@components/frontStore/checkout/checkout/summary/Items';
import { CartSummary } from '../../components/frontStore/checkout/checkout/summary/Cart';
import Area from '@components/common/Area';
import './Summary.scss';

interface CartItem {
  thumbnail: string;
  productName: string;
  productSku: string;
  qty: number;
  variantOptions: string;
  total: {
    value: number;
    text: string;
  };
  subTotal: {
    value: number;
    text: string;
  };
  lineTotal: {
    value: number;
    text: string;
  };
}

interface CartProps {
  cart: {
    totalQty?: number;
    items: CartItem[];
    subTotal: {
      value: number;
      text: string;
    };
    subTotalInclTax: {
      value: number;
      text: string;
    };
    grandTotal: {
      value: number;
      text: string;
    };
    discountAmount: {
      value: number;
      text: string;
    };
    taxAmount: {
      value: number;
      text: string;
    };
    totalWeight: {
      value: number;
      text: string;
    };
    shippingFeeInclTax: {
      value: number;
      text: string;
    };
    shippingMethodName: string;
    coupon: string;
  };
}

interface ComponentLayout {
  areaId: string;
  sortOrder: number;
}

const Summary: React.FC<CartProps> = ({ cart }) => {
  let displayCheckoutPriceIncludeTax = false;
  return (
    <Area
      id="checkoutSummary"
      className="checkout-summary hidden md:block"
      coreComponents={[
        {
          component: { default: Items },
          props: { items: cart.items, displayCheckoutPriceIncludeTax },
          sortOrder: 20,
          id: 'checkoutOrderSummaryItems'
        },
        {
          component: { default: CartSummary },
          props: { ...cart, displayCheckoutPriceIncludeTax },
          sortOrder: 30,
          id: 'checkoutOrderSummaryCart'
        }
      ]}
    />
  );
}

export default Summary;

export const layout: ComponentLayout = {
  areaId: 'checkoutPageRight',
  sortOrder: 10
};

export const query = `
  query Query {
    cart {
      totalQty
      subTotal {
        value
        text
      }
      subTotalInclTax {
        value
        text
      }
      grandTotal {
        value
        text
      }
      discountAmount {
        value
        text
      }
      taxAmount {
        value
        text
      }
      totalWeight {
        value
        text
      }
      shippingFeeInclTax {
        value
        text
      }
      shippingMethodName
      coupon
      items {
        thumbnail
        productName
        productSku
        qty
        variantOptions
        total {
          value
          text
        }
        subTotal {
          value
          text
        }
        lineTotal {
          value
          text
        }
      }
    }
  }
`;