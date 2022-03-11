import React, {useState, useRef, useEffect} from "react";
import {
    sortableContainer,
    sortableElement
} from "react-sortable-hoc";
import styles from './styles.module.less'

const arrayMove = (array, from, to) => {
    array = array.slice();
    array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
    return array;
};

const SortableItem = sortableElement(({value, sortIndex}) => (
    <div>
        {value.text}- #{sortIndex}
    </div>
));

const SortableContainer = sortableContainer(({children}) => {
    return <ul>{children}</ul>;
});

function SortList() {
    const [items, setItems] = useState([
        {id: 1, text: 'A', sort: 1},
        {id: 2, text: 'B', sort: 2},
        {id: 3, text: 'C', sort: 3},
    ]);
    const sortRef = useRef(null);
    const onSortEnd = ({oldIndex, newIndex}) => {
        let tempList = [...items];
        let list = arrayMove(tempList, oldIndex, newIndex);
        setItems(list);
    };

    useEffect(() => {
        autoSort()
    }, [])

    // 设置自动排序
    const autoSort = () => {
        setTimeout(() => {
            let tempList = [...items];
            let list = arrayMove(tempList, 2, 0)
            setItems(list);
        }, 1000)
    }

    return (
        <div className={styles.content}>
            <SortableContainer onSortEnd={onSortEnd} ref={sortRef}>
                {items.map((value, index) => (
                    <SortableItem key={value.id} index={index} value={value} sortIndex={value.sort}/>
                ))}
            </SortableContainer>
        </div>
    );
}

export default SortList;
