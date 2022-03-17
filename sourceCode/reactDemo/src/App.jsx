import './App.css';
import FilterableProductTable from './components/FilterableProductTable';
import SortList from './components/SortList';
import AntdComp from './components/AntdComp';
import CyFilterableProductTableFun from './components/CyFilterableProductTableFun';
import CyFilterableProductTableHooks from './components/CyFilterableProductTableHooks';
import CyFilterableProductTableClass from './components/CyFilterableProductTableClass';

const PRODUCTS = [
  {
    category: 'Sporting Goods',
    price: '$49.99',
    stocked: true,
    name: 'Football',
  },
  {
    category: 'Sporting Goods',
    price: '$9.99',
    stocked: true,
    name: 'Baseball',
  },
  {
    category: 'Sporting Goods',
    price: '$29.99',
    stocked: false,
    name: 'Basketball',
  },
  {
    category: 'Electronics',
    price: '$99.99',
    stocked: true,
    name: 'iPod Touch',
  },
  {
    category: 'Electronics',
    price: '$399.99',
    stocked: false,
    name: 'iPhone 5',
  },
  { category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7' },
];

function App() {
  return (
    <div className="App">
      {/*<FilterableProductTable/>*/}
      {/* <SortList/> */}
      {/* <AntdComp/> */}
      {/* 函数式组件 */}
      {/* <CyFilterableProductTableFun
        products={PRODUCTS}
      ></CyFilterableProductTableFun> */}
      {/* class组件 */}
      {/* <CyFilterableProductTableClass products={PRODUCTS}></CyFilterableProductTableClass> */}
      {/* 优化-自定义hooks */}
      <CyFilterableProductTableHooks
        products={PRODUCTS}
      ></CyFilterableProductTableHooks>
    </div>
  );
}

export default App;
