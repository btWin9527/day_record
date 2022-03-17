import React from 'react';
import SearchBar from './SearchBar';
import ProduceTable from './ProductTable';
import useSearch from './useSearch';
import useList from './useList';
export default function index(props) {
  const { filtetText, inStockOnly, handleFilterChange, handleStockChange } =
    useSearch();
  const { groupProductList } = useList(filtetText, inStockOnly, props.products);
  return (
    <div>
      <SearchBar
        filtetText={filtetText}
        inStockOnly={inStockOnly}
        onFilterChange={handleFilterChange}
        onStockChange={handleStockChange}
      />
      <ProduceTable product={groupProductList} />
    </div>
  );
}

/**
 * 1、通过组件层级拆分组件
 * 2、用函数式组件创建一个静态版本
 * 3、确定 UI state的最小且最完整表示
 *  1）列出所有的数据：
 *      全部的产品列表， props
 *      用户输入的值，state
 *      复选框的选择状态，state
 *      根据用户输入值和复选框筛选的列表，可由2.3筛选出来
 *  2）判断哪些值是state
 *      这个值是不是由父组件通过props传递过来的，
 *      这个值是不是随着时间的推移会改变，
 *      这个值是不是可以由其他的state或者props计算出来
 * 4、确定state放置的位置：
 *    用户输入的值：search组件+列表组件
 *    复选框的值：search组件+；列表组件
 *    综上：两个state都应该放到 他们的父级组件上
 * 5、添加反向数据流
 */

/**
 * 问题：
 * 1、函数调用时为什么要使用箭头函数的形式：如果用e的话需要写成箭头函数形式
 * 2、为什么要传递e，是因为会用到值吗：是的
 * 3、使用箭头函数和普通函数定义有什么区别：在函数式组件中没有区别，在class组件中才有区别
 */
