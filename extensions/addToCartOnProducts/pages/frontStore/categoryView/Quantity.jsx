import React from 'react';
import PropTypes from 'prop-types';
import { useAppDispatch } from '@components/common/context/app';

export default function Quantity({ qty, isLoading, onChangeQty, onRemove }) {
    const AppContextDispatch = useAppDispatch();
    const [quantity, setQuantity] = React.useState(qty);
    const previousQuantity = React.useRef(qty);
    const [debounceTimer, setDebounceTimer] = React.useState(null);

    const updateQuantity = (newQuantity) => {
        setQuantity(newQuantity);
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        const timer = setTimeout(() => {
            onChangeQty(previousQuantity, newQuantity);
            refreshContext();
        }, 500);
        setDebounceTimer(timer);
    };

    const removeItem = () => {
        setQuantity(0);
        if (debounceTimer) {
            clearTimeout(debounceTimer);
        }
        const timer = setTimeout(() => {
            onRemove();
            refreshContext();
        }, 500);
        setDebounceTimer(timer);
    }

    const refreshContext = async () => {
        const url = new URL(window.location.href);
        url.searchParams.set('ajax', true);
        await AppContextDispatch.fetchPageData(url);
        previousQuantity.current = qty;
    };

    return (
        <div className="qty-box grid grid-cols-3 border border-[#ccc]">
            {quantity > 1 && (
                <button
                    className="flex justify-center items-center"
                    onClick={() => updateQuantity(Math.max(quantity - 1, 0))}
                    disabled={isLoading}
                    type="button"
                >
                    {isLoading && (
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                            className="spinner"
                            viewBox="0 0 66 66"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                className="path"
                                fill="none"
                                strokeWidth="6"
                                cx="33"
                                cy="33"
                                r="30"
                            />
                        </svg>
                    )}
                    {!isLoading && (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                            className="icon icon-minus"
                            fill="none"
                            viewBox="0 0 10 2"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M.5 1C.5.7.7.5 1 .5h8a.5.5 0 110 1H1A.5.5 0 01.5 1z"
                                fill="currentColor"
                            />
                        </svg>
                    )}
                </button>
            )}
            {quantity === 1 && (
                <button
                    className="flex justify-center items-center"
                    onClick={() => removeItem()}
                    disabled={isLoading}
                    type="button"
                >
                    {isLoading && (
                        <svg
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                            className="spinner"
                            viewBox="0 0 66 66"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <circle
                                className="path"
                                fill="none"
                                strokeWidth="6"
                                cx="33"
                                cy="33"
                                r="30"
                            />
                        </svg>
                    )}
                    {!isLoading && (
                        // trash/bin icon
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                            role="presentation"
                            className="icon icon-trash"
                            fill="none"
                            viewBox="0 0 10 10"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M1 1.5a.5.5 0 01.5-.5h7a.5.5 0 010 1H8v7a.5.5 0 01-1 0V2H3v6a.5.5 0 01-1 0V2H1.5A.5.5 0 011 1.5zM3 2h4v6H3V2z"
                                fill="currentColor"
                            />
                        </svg>
                    )}
                </button>
            )}
            <input type="text" value={quantity} readOnly />
            <button
                className="flex justify-center items-center"
                onClick={() => updateQuantity(quantity + 1)}
                disabled={isLoading}
                type="button"
            >
                {isLoading && (
                    <svg
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                        className="spinner"
                        viewBox="0 0 66 66"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            className="path"
                            fill="none"
                            strokeWidth="6"
                            cx="33"
                            cy="33"
                            r="30"
                        />
                    </svg>
                )}
                {!isLoading && (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false"
                        role="presentation"
                        className="icon icon-plus"
                        fill="none"
                        viewBox="0 0 10 10"
                    >
                        <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M1 4.51a.5.5 0 000 1h3.5l.01 3.5a.5.5 0 001-.01V5.5l3.5-.01a.5.5 0 00-.01-1H5.5L5.49.99a.5.5 0 00-1 .01v3.5l-3.5.01H1z"
                            fill="currentColor"
                        />
                    </svg>
                )}
            </button>
        </div>
    );
}

Quantity.propTypes = {
    qty: PropTypes.number.isRequired,
    updateApi: PropTypes.string.isRequired
};
