import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleInStockChange = this.handleInStockChange.bind(this);
  }
  handleFilterTextChange = (e) => {
    console.log(e.target.value);
    this.props.onFilterTextChange(e.target.value);
  };
  handleInStockChange(e) {
    this.props.onCheckboxChange(e.target.checked);
  }
  render() {
    const filterText = this.props.filterText;
    const inStockOnly = this.props.inStockOnly;
    return (
      <>
        <input
          type="text"
          placeholder="Search..."
          value={filterText}
          onChange={this.handleFilterTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={this.handleInStockChange}
          />{' '}
          Only show products in stock
        </p>
      </>
    );
  }
}
class ProductRow extends Component {
  render() {
    const { product } = this.props;
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
}
class ProductCategoryRow extends Component {
  render() {
    const category = this.props.category;
    return (
      <tr>
        <th colSpan="2">{category}</th>
      </tr>
    );
  }
}
class ProductTable extends Component {
  render() {
    const filterText = this.props.filterText;
    const instockOnly = this.props.instockOnly;
    let rows = [];
    let lastCateGory = null;
    this.props.products.forEach((item) => {
      if (item.name.indexOf(filterText) === -1) {
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
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

export default class CyFilterableProductTableClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      instockOnly: false,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }
  handleFilterTextChange(val) {
    this.setState({ filterText: val });
  }
  handleCheckboxChange(val) {
    this.setState({ instockOnly: val });
  }
  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          instockOnly={this.state.instockOnly}
          onFilterTextChange={this.handleFilterTextChange}
          onCheckboxChange={this.handleCheckboxChange}
        />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          instockOnly={this.state.instockOnly}
        ></ProductTable>
      </div>
    );
  }
}

/**
 * 应用所需要的数据：
 * 1、包含所有产品的原始列表 父组件传递过来的
 * 2、用户输入的内容 state
 * 3、复选框是否选中的值 state
 * 4、经过搜索筛选出的数据列表 可以通过输入的内容和复选框计算出来
 *
 * 两个维度：
 * 1、数据是否由父组件通过props传递过来。是的话，不是state
 * 2、数据是否随着时间推移保持不变。是的话，不是state
 * 3、能否根据其他state或者props计算出来。是的话，不是state
 */

/**
 * 第二版
 * 1、拆分所有组件
 * 2、将class组件改成函数式组件
 */
