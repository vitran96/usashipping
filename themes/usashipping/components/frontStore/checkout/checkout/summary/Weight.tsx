import React from 'react';
// import { _ } from '@evershop/evershop/src/lib/locale/translate';

interface WeightProps {
  weight: string;
}

export function Weight({ weight }: WeightProps) {
  return (
    <div className="summary-row">
      <span>Weight</span>
      <div>
        <div>{weight}</div>
      </div>
    </div>
  );
}