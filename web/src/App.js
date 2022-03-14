import "devextreme/dist/css/dx.common.css";
import "devextreme/dist/css/dx.light.css";
import "./App.scss";
import { Container } from "react-bootstrap";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CustomNavbar from "./components/app/Navbar";
import HomePage from "./pages/home";
import PeoplePage from "./pages/people";
import ServicePage from "./pages/service";
import ProductPage from "./pages/products";
import TreatmentRegisterPage from "./pages/treatment.register";

function App() {
  return (
    <>
      <BrowserRouter>
        <CustomNavbar />
        <Container className="content">
          <Routes>
            <Route exact path="/" element={<HomePage />} />
            <Route exact path="/peoples" element={<PeoplePage />} />
            <Route exact path="/services" element={<ServicePage />} />
            <Route exact path="/products" element={<ProductPage />} />
            <Route
              exact
              path="/treatmentregister"
              element={<TreatmentRegisterPage />}
            />
          </Routes>
        </Container>
      </BrowserRouter>
    </>
  );
}

export default App;
