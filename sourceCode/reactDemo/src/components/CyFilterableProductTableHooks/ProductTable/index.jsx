import React, { useEffect, useMemo } from 'react';
import styles from './index.module.styl';
import ProductCategoryRow from './ProductCategoryRow';
import ProductRow from './ProductRow ';

export default function index(props) {
  const { filtetText, instockOnly, product } = props;
  // 对产品list进行分组处理
  const groupProductList = useMemo(() => {
    if (product.length <= 0) return {};
    let tempArr = [...product];
    let obj = {};
    tempArr.forEach((item) => {
      if (obj[item.category]) {
        obj[item.category].push(item);
      } else {
        obj[item.category] = [item];
      }
    });
    return obj;
  }, [product]);

  // 根据key获取行数据
  const renderRow = (key) =>
    groupProductList[key].map((item) => (
      <div key={item.name}>
        {item.name} {item.price}
      </div>
    ));

  return (
    <div className={styles['product-table']}>
      <div>
        <span>Name</span>
        <span>Price</span>
      </div>
      {Object.keys(groupProductList).length > 0 &&
        Object.keys(groupProductList).map((key) => (
          <div key={key}>
            <div>{key}</div>
            <div>{renderRow(key)}</div>
          </div>
        ))}
    </div>
  );
}
