/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from '@components/common/form/Button';
import './AddtoCartOrQtyButton.scss';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import Quantity from './Quantity';
import { useAppDispatch } from '@components/common/context/app';
import { toast } from 'react-toastify';

export default function AddtoCartOrQtyButton({ areaProps, action }) {
    const { product } = areaProps;

    const AppContextDispatch = useAppDispatch();

    // TODO: handle inStock

    const [isLoading, setIsLoading] = useState(false);
    const [cartQty, setCartQty] = useState(product.cartQty);
    const [cartItemUuid, setCartItemUuid] = useState(product.cartItemUuid || null);

    const refreshContext = async () => {
        const url = new URL(window.location.href);
        url.searchParams.set('ajax', true);
        await AppContextDispatch.fetchPageData(url);
    };

    const updateCartQty = async (
        isIncrease,
        cartItemUuid
    ) => {
        try {
            setIsLoading(true);
            const actionStr = isIncrease ? 'increase' : 'decrease';
            const response = await fetch(`/api/cart/mine/items/${cartItemUuid}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        action: actionStr,
                        qty: 1
                    }),
                    credentials: 'same-origin'
                }
            );
            const json = await response.json();
            if (json.error) {
                toast.error(json.error.message);
            } else {
                setCartQty(json.data.item.qty);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            refreshContext();
            setIsLoading(false);
        }
    }
    const removeItem = async (cartItemUuid) => {
        try {
            console.log('removeItem', cartItemUuid);
            setIsLoading(true);
            const response = await fetch(`/api/cart/mine/items/${cartItemUuid}`, {
                method: 'DELETE',
                credentials: 'same-origin'
            });

            const json = await response.json();
            if (json.error) {
                toast.error(json.error.message);
            } else {
                setCartQty(0);
                setCartItemUuid(null);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            refreshContext();
            setIsLoading(false);
        }
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
                toast.error(json.error.message);
            } else {
                setCartQty(1);
                setCartItemUuid(json.data.item.uuid);
            }
        } catch (error) {
            toast.error(error.message);
        } finally {
            refreshContext();
            setIsLoading(false);
        }
    }

    if (product.inventory.isInStock === false) {
        return (
            <button className="btn btn-outline btn-disabled">
                {_('SOLD OUT')}
            </button>
        );
    }

    if (cartQty > 0) {
        
        return (
            <Quantity
                qty={cartQty}
                isLoading={isLoading}
                onChangeQty={(isIncrease) => updateCartQty(isIncrease, cartItemUuid)}
                onRemove={() => removeItem(cartItemUuid)}
            />
        );
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
        cartItemUuid: PropTypes.string,
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
