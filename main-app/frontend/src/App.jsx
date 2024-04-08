import Header from "components/Header";
import React, { Suspense } from "react";
import "./App.css";
import { Container } from "react-bootstrap";
const VendorList = React.lazy(() => import("VendorModule/Vendor"));
function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Suspense fallback="Loading...">
          <VendorList />
        </Suspense>
      </Container>
    </div>
  );
}
export default App;
