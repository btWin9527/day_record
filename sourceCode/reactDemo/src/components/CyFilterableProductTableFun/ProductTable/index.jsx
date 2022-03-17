import React from 'react';
import styles from './index.module.styl';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow ';

export default function index(props) {
  const { filtetText, instockOnly, product } = props;
  const rows = [];
  let lastCateGory = null;
  product.forEach((item) => {
    if (item.name.indexOf(filtetText) === -1) {
      return;
    }
    if (instockOnly && !item.stocked) {
      return;
    }
    if (item.category !== lastCateGory) {
      const rowsCategroyItem = (
        <ProductCategoryRow
          key={item.category}
          category={item.category}
        ></ProductCategoryRow>
      );
      rows.push(rowsCategroyItem);
      lastCateGory = item.category;
    }
    const rowsItem = <ProductRow product={item} key={item.name}></ProductRow>;
    rows.push(rowsItem);
  });
  return (
    <div className={styles['product-table']}>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}
