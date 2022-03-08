import React, {useCallback, useMemo} from 'react';
import styles from './styles.module.less';

// 产品列表组件
function Index({list = []}) {

    // 对list数据进行分组处理
    const departProductInfo = useMemo(() => {
        if (list.length <= 0) return {}
        let tempArr = [...list];
        let obj = {};
        tempArr.forEach(item => {
            if (obj[item.category]) {
                obj[item.category].push(item)
            } else {
                obj[item.category] = [item]
            }
        })
        return obj
    }, [list]);

    // 渲染产品每一行数据
    const renderProductRow = useCallback((key) => (
        departProductInfo[key].length > 0 && departProductInfo[key].map(item =>
            (<div key={item.name}>{item.name} {item.price}</div>))
    ), [departProductInfo])

    return (
        <div>
            <div className={styles.item}>
                <span className={styles.itemTitle}>Name</span>
                <span className={styles.itemTitle}>Price</span>
            </div>
            {
                Object.keys(departProductInfo).length > 0 && Object.keys(departProductInfo).map(key => (
                    <div className={styles.item} key={key}>
                        {/* 类别名称 */}
                        <span className={styles.itemTitle}>{key}</span>
                        {renderProductRow(key)}
                    </div>
                ))
            }
        </div>
    );
}

export default Index;