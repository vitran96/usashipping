declare module '@evershop/evershop/src/lib/locale/translate' {
  export const _: (text: string, ...args: any[]) => string;
}

declare module '@components/frontStore/catalog/product/list/List' {
  interface ProductListProps {
    products: any[];
    countPerRow?: number;
  }
  const ProductList: React.FC<ProductListProps>;
  export default ProductList;
}

declare module '@components/common/Area' {
  interface AreaProps {
    id: string;
    className?: string;
    noOuter?: boolean;
    coreComponents?: any[];
  }
  const Area: React.FC<AreaProps>;
  export default Area;
}

declare module '@components/frontStore/cms/Button' {
  interface ButtonProps {
    title: string;
    url: string;
    variant?: string;
  }
  const Button: React.FC<ButtonProps>;
  export default Button;
}

declare module '@components/common/form/fields/Checkbox' {
  interface CheckboxProps {
    name: string;
    label?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value?: string | number | boolean;
    checked?: boolean;
  }
  const Checkbox: React.FC<CheckboxProps>;
  export default Checkbox;
}

declare module '@components/common/form/Form' {
  interface FormProps {
    id?: string;
    action?: string;
    method?: string;
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
    submitBtn?: boolean;
    btnText?: string;
    children?: React.ReactNode;
  }
  const Form: React.FC<FormProps>;
  export default Form;
}

// New type declarations for components causing errors

declare module '@components/common/LoadingBar' {
  interface LoadingBarProps {}
  const LoadingBar: React.FC<LoadingBarProps>;
  export default LoadingBar;
}

declare module '@components/frontStore/checkout/checkout/summary/Items' {
  interface ItemsProps {
    items: any[];
    displayCheckoutPriceIncludeTax: boolean;
  }
  export const Items: React.FC<ItemsProps>;
}

declare module '@components/frontStore/checkout/checkout/summary/cart/Discount' {
  interface DiscountProps {
    code?: string;
    discount?: string;
  }
  export const Discount: React.FC<DiscountProps>;
}

declare module '@components/frontStore/checkout/checkout/summary/cart/Shipping' {
  interface ShippingProps {
    method?: string;
    cost?: string;
  }
  export const Shipping: React.FC<ShippingProps>;
}

declare module '@components/frontStore/checkout/checkout/summary/cart/Subtotal' {
  interface SubtotalProps {
    count: number;
    total: string;
  }
  export const Subtotal: React.FC<SubtotalProps>;
}

declare module '@components/frontStore/checkout/checkout/summary/cart/Tax' {
  interface TaxProps {
    taxAmount: string;
    showTitle?: boolean;
  }
  export const Tax: React.FC<TaxProps>;
}

declare module '@components/frontStore/checkout/checkout/summary/cart/Total' {
  interface TotalProps {
    taxAmount: string;
    total: string;
    totalTaxAmount: number;
    displayCheckoutPriceIncludeTax: boolean;
  }
  export const Total: React.FC<TotalProps>;
}