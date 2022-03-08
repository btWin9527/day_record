import {useMemo, useState, useEffect} from 'react';

export const useList = (isChecked, searchValue) => {
    // 列表数据
    const [productList, setProductList] = useState([]);
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
        const data = [{
            category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"
        }, {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"}, {
            category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"
        }, {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"}, {
            category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"
        }, {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}];
        setProductList(data);
    }, []);

    return {
        filterProductList
    }
}