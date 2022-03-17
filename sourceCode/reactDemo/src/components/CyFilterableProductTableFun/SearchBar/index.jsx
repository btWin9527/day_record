import React from 'react';

export default function index(props) {
  const { filtetText, inStockOnly, onFilterChange, onStockChange } = props;
  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={filtetText}
        onChange={(e) => onFilterChange(e)}
      />
      <p>
        <input
          type="checkbox"
          checked={inStockOnly}
          onChange={(e) => onStockChange(e)}
        />{' '}
        Only show products in stock
      </p>
    </div>
  );
}
