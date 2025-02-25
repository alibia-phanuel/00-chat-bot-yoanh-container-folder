import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Dashbord from "../components/pages/Dashbord";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashbord />}></Route>
          <Route path="/" element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
