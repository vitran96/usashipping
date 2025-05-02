import React from 'react';
import { Discount } from '@components/frontStore/checkout/checkout/summary/cart/Discount';
import { Shipping } from '@components/frontStore/checkout/checkout/summary/cart/Shipping';
import { Subtotal } from '@components/frontStore/checkout/checkout/summary/cart/Subtotal';
import { Tax } from '@components/frontStore/checkout/checkout/summary/cart/Tax';
import { Total } from '@components/frontStore/checkout/checkout/summary/cart/Total';
import { Weight } from "./Weight";

interface PriceData {
  value?: number;
  text: string;
}

interface CartSummaryProps {
  subTotal: PriceData;
  subTotalInclTax: PriceData;
  grandTotal: PriceData;
  discountAmount: PriceData;
  taxAmount: PriceData;
  shippingMethodName?: string;
  shippingFeeInclTax: PriceData;
  coupon?: string;
  totalWeight: PriceData;
  displayCheckoutPriceIncludeTax?: boolean;
  totalQty?: string | number;
}

const CartSummary: React.FC<CartSummaryProps> = ({
  subTotal,
  subTotalInclTax,
  grandTotal,
  discountAmount,
  taxAmount,
  shippingMethodName,
  shippingFeeInclTax,
  coupon,
  totalWeight,
  displayCheckoutPriceIncludeTax = false
}) => {
  return (
    <div className="checkout-summary-block">
      <Subtotal
        count={0}
        total={subTotal.text}
      />
      <Shipping method={shippingMethodName} cost={shippingFeeInclTax.text} />
      <Discount code={coupon} discount={discountAmount.text} />
      {/* <Weight weight={totalWeight.text} /> */}
      <Total
        taxAmount={taxAmount.text}
        total={grandTotal.text}
        totalTaxAmount={0}
        displayCheckoutPriceIncludeTax={false}
      />
    </div>
  );
}

export { CartSummary };