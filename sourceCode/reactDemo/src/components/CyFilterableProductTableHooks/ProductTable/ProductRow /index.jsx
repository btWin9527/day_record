import React from 'react';

export default function index(props) {
  const { product } = props;
  const name = !product.stocked ? (
    <span style={{ color: 'red' }}>{product.name}</span>
  ) : (
    product.name
  );
  return (
    <tr>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  );
}
