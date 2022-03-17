import SearchBar from './SearchBar';
import ProductTable from './ProductTable';
import {useSearch} from "./useSearch";
import {useList} from "./useList";

// 商品应用组件
function FilterableProductTable() {
    const {searchValue, isChecked, onchangeInput, onchangeCheckbox} = useSearch();
    const {filterProductList} = useList(isChecked, searchValue);

    return (
        <>
            {/* 搜索组件 */}
            <SearchBar onchangeInput={onchangeInput} onchangeCheckbox={onchangeCheckbox}/>
            {/* 列表组件 */}
            <ProductTable list={filterProductList}/>
        </>
    )
}

export default FilterableProductTable;
