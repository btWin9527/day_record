import ComponentConfig from './index'
import TestComp from "../components/TestComp";
const open = () => {
  // 弹窗容器蒙版层打开
}

const close = () => {
    // 弹窗容器蒙版层关闭

}

const xinlin = (type) => {
    type ===1 && <TestComp aProps={open}/>
    // 导出指定组件
    return
}

xinlin(1)
