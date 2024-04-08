import store from "app/state/store";
import { Provider } from "react-redux";
import Vendor from "components/Vendor";

function VendorWrapper() {
  return (
    <>
      <Provider store={store}>
        <Vendor />
      </Provider>
    </>
  );
}

export default VendorWrapper;
