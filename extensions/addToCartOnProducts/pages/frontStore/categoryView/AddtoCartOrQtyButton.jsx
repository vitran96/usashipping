/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-param-reassign */
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import Button from '@components/common/form/Button';
import './AddtoCartOrQtyButton.scss';
import { _ } from '@evershop/evershop/src/lib/locale/translate';
import Quantity from './Quantity';
import { toast } from 'react-toastify';

export default function AddtoCartOrQtyButton({ areaProps, action }) {
    const { product } = areaProps;

    // TODO: handle inStock

    const [isLoading, setIsLoading] = useState(false);
    const [cartQty, setCartQty] = useState(product.cartQty);
    const [cartUuid, setCartUuid] = useState(product.uuid);

    if (product.inventory.isInStock === false) {
        return (
            <button className="btn btn-outline btn-disabled">
                {_('SOLD OUT')}
            </button>
        );
    }

    if (cartQty > 0) {
        const updateCartQty = async (previousQty, newQty) => {
            try {
                setIsLoading(true);

                const response = await fetch(`/api/cart/${cartItemId}/items/${product.productId}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            action: '', // 'increase' or 'decrease'
                            qty: newQty
                        }),
                        credentials: 'same-origin'
                    }
                );
                const json = await response.json();
                if (json.error) {
                    toast.error(json.error.message);
                    return;
                } else {
                    setCartQty(newQty);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        const removeItem = async () => {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/cart/${cartUuid}/items/${product.productId}`, {
                    method: 'DELETE',
                    credentials: 'same-origin'
                });

                const json = await response.json();
                if (json.error) {
                    toast.error(json.error.message);
                } else {
                    setCartQty(0);
                    setCartUuid(null);
                }
            } catch (error) {
                toast.error(error.message);
            } finally {
                setIsLoading(false);
            }
        }
        return (
            <Quantity
                qty={cartQty}
                isLoading={isLoading}
                onChangeQty={(previousQty, newQty) => updateCartQty(previousQty, newQty)}
                onRemove={() => removeItem()}
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
                toast.error(json.error.message);
            } else {
                setCartQty(1);
                setCartItemId(json.uuid);
            }
        } catch (error) {
            toast.error(error.message);
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
        cartUuid: PropTypes.string,
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
