import {useState, useCallback} from 'react';

export const useSearch = () => {
    // 搜索框数据
    const [searchValue, setSearchValue] = useState('');
    // 是否选中多选
    const [isChecked, setIsCheck] = useState(false);

    // 搜索框搜索触发事件
    const onchangeInput = useCallback((e) => {
        let value = e.target.value.trim();
        setSearchValue(value);
    }, [searchValue]);

    // 搜索框单选触发事件
    const onchangeCheckbox = useCallback((e) => {
        let {checked} = e.target;
        setIsCheck(checked);
    }, [isChecked]);

    return {
        searchValue,
        isChecked,
        onchangeInput,
        onchangeCheckbox
    }
}