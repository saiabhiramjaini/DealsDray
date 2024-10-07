import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { DashboardPage } from "./pages/DashboardPage";
import { CreateEmployeePage } from "./pages/CreateEmployeePage";
import { EmployeeListPage } from "./pages/EmployeeListPage";
import { UpdateEmployeePage } from "./pages/UpdateEmployeePage";


export default function App() {
  return (
   <>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage/>} />
      <Route path="/signup" element={<SignupPage/>} />
      <Route path="/home" element={<DashboardPage/>} />
      <Route path="/create" element={<CreateEmployeePage/>} />
      <Route path="/employeelist" element={<EmployeeListPage/>} />
      <Route path="/update" element={<UpdateEmployeePage/>} />
    </Routes>
    </BrowserRouter>
   </>
  )
}