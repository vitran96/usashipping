import React from 'react';
import PropTypes from 'prop-types';
// import { _ } from '@evershop/evershop/src/lib/locale/translate';

export function Weight({ weight }) {
  return (
    <div className="summary-row">
      <span>Weight</span>
      <div>
        <div>{weight}</div>
      </div>
    </div>
  );
}

Weight.propTypes = {
  weight: PropTypes.string.isRequired
};