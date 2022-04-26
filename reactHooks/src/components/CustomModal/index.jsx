import {useCustomModal} from "./useCustomModal";
import {Modal} from "antd";

export default function CustomModal({id, children, ...rest}) {
  const modal = useCustomModal(id)
  return (
    <Modal
      onCancel={() => modal.hide()}
      onOk={() => modal.hide()}
      afterClose={() => modal.hide(true)}
      visible={!modal.hiding}
      {...rest}
    >
      {children}
    </Modal>
  )
}

// 容器组件优化显示
export const createCustomModal = (modalId, Comp) => {
  return (props) => {
    const {visible, args} = useCustomModal(modalId)
    if (!visible) return null
    return <Comp {...args} {...props}/>
  }
}

CustomModal.create = createCustomModal
CustomModal.useModal = useCustomModal