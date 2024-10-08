import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CreateEmployeePage } from "./pages/CreateEmployeePage";
import { EmployeeListPage } from "./pages/EmployeeListPage";
import { UpdateEmployeePage } from "./pages/UpdateEmployeePage";

import 'react-toastify/dist/ReactToastify.css';
import { Bounce, ToastContainer } from "react-toastify";

export default function App() {
  const isLoggedIn = localStorage.getItem("username") !== null;

  return (
   <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={isLoggedIn ? <Navigate to="/home" replace /> : <LoginPage />} />
      <Route path="/" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/home" element={<DashboardPage/>} />
      <Route path="/create" element={<CreateEmployeePage/>} />
      <Route path="/employeelist" element={<EmployeeListPage/>} />
      <Route path="/update/:id" element={<UpdateEmployeePage/>} />
    </Routes>
    <ToastContainer
        position="top-center"
        autoClose={4000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition= {Bounce}
        />
    </BrowserRouter>
   </>
  )
}