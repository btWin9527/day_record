import React, {useCallback, useMemo, useState, useEffect} from 'react';
import SearchBar from './SearchBar';
import ProductTable from './ProductTable';

// 商品应用组件
function FilterableProductTable() {
    // 搜索框数据
    const [searchValue, setSearchValue] = useState('');
    // 是否选中多选
    const [isChecked, setIsCheck] = useState(false);
    // 列表数据
    const [productList, setProductList] = useState([]);

    // 搜索框搜索触发事件
    const onchangeInput = useCallback((e) => {
        // console.log('搜索框触发', e.target.value)
        let value = e.target.value.trim();
        setSearchValue(value);
    }, [searchValue]);

    // 搜索框单选触发事件
    const onchangeCheckbox = useCallback((e) => {
        let {checked} = e.target;
        setIsCheck(checked);
    }, [isChecked]);

    // 处理过后的数据
    const filterProductList = useMemo(() => {
        let list = [...productList];
        // 处理数据筛选
        return list.filter(item => {
            let isIncludesName = item.name && item.name.includes(searchValue);
            return isChecked ? item.stocked && isIncludesName : isIncludesName;
        });

    }, [isChecked, searchValue, productList]);

    useEffect(() => {
        // todo:mock数据
        const data = [
            {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
            {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
            {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
            {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
            {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
            {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
        ];
        setProductList(data);
    }, []);

    return (
        <>
        {/* 搜索组件 */}
        <SearchBar onchangeInput={onchangeInput} onchangeCheckbox={onchangeCheckbox}/>
        {/* 列表组件 */}
        <ProductTable list={filterProductList}/></>
    )
}

export default FilterableProductTable;