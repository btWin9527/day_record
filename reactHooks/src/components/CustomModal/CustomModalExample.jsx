import {useCustomModal} from "./useCustomModal";
import {modalReducer} from "./reducer";
import {Button} from "antd";
import {createStore} from "redux";
import {Provider} from "react-redux";
import CustomModal, {createCustomModal} from "./index";

const store = createStore(modalReducer);

const MyModal = createCustomModal("my-modal", () => {
  return (
    <CustomModal id="my-modal" title="Nice Modal">
      Hello NiceModal!
    </CustomModal>
  );
});

function CustomModalExample() {
  const modal = useCustomModal('my-modal')

  return (
    <div className="exp-14-users">
      <Button type="primary" onClick={() => modal.show()}>
        + New User
      </Button>
      <MyModal/>
    </div>
  )
}

export default () => {
  return (
    <Provider store={store}>
      <CustomModalExample/>
    </Provider>
  );
};