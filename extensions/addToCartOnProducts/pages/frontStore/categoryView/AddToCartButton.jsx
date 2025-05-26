import PropTypes from 'prop-types';
import React from 'react';

export default function AddToCartButton(props) {
    return (
        <button
            type='button'
            onClick={() => console.log('add to cart clicked')}
        >
            Add to Cart
        </button>
    )
}

export const layout = {
    areaId: 'productListingItem',
    sortOrder: 40,
}