/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import React from 'react';
import Button from '@components/common/form/Button';
import './AddtoCartOrQtyButton.scss';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import Quantity from './Quantity';

export default function AddtoCartOrQtyButton({ areaProps, action }) {
    const { product } = areaProps;
    console.log('product', product);
    console.log('action', action);

    const [isLoading, setIsLoading] = React.useState(false);

    // TODO: handle inStock
    // TODO: cartQty Update

    if (product.inventory.isInStock === false) {
        return (
            <button className="btn btn-outline btn-disabled">
                {_('SOLD OUT')}
            </button>
        );
    }

    if (product.cartQty > 0) {
        return (
            <Quantity
                qty={product.cartQty}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                updateApi={product.updateQtyApi}
                removeApi={product.removeApi}
            />
        );
    }

    const addToCart = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(action, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    sku: product.sku,
                    qty: 1
                }),
                credentials: 'same-origin'
            });

            const json = await response.json();

            if (json.error) {
                console.error(json.error.message);
            } else {
                // Optionally, you can handle the success case here
                console.log('Product added to cart successfully');
                console.log('json', json);
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="add-to-cart ">
            <Button
                title={_('ADD TO CART')}
                outline
                isLoading={isLoading}
                onAction={() => addToCart()}
            />
        </div>
    );
}

AddtoCartOrQtyButton.propTypes = {
    action: PropTypes.string.isRequired,
    product: PropTypes.shape({
        inventory: PropTypes.shape({
            isInStock: PropTypes.bool.isRequired
        }).isRequired,
        name: PropTypes.string.isRequired,
        sku: PropTypes.string.isRequired,
        cartQty: PropTypes.number.isRequired,
        cartItemId: PropTypes.string,
        removeApi: PropTypes.string,
        updateQtyApi: PropTypes.string,
    }).isRequired
};

export const layout = {
    areaId: 'productListingItem',
    sortOrder: 40,
}

export const query = `
  query Query {
    action:url (routeId: "addMineCartItem")
  }
`;
