import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState, useEffect } from "react";
import axios from "axios";
import { backendURL } from "@/config"; 
import { useNavigate } from "react-router-dom";

export const EmployeeListPage = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${backendURL}/api/v1/employee`);
        console.log(response.data);
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
        setErrorMessage("Failed to load employee data.");
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  const handleDelete = async (id: string) => {
    try {
     await axios.delete(`${backendURL}/api/v1/employee/${id}`);
      setEmployees(employees.filter((employee: any) => employee._id !== id));
    } catch (error) {
      console.error("Error deleting employee:", error);
      setErrorMessage("Failed to delete employee.");
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Employee List</h1>
        <Button>Create Employee</Button>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div>Total Count: {employees.length}</div>
        <Input className="w-64" placeholder="Enter Search Keyword" />
      </div>

      {errorMessage && (
        <p className="text-red-500 mb-4">{errorMessage}</p>
      )}

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Unique Id</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile No</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Create Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center">
                Loading...
              </TableCell>
            </TableRow>
          ) : (
            employees.map((employee: any) => (
              <TableRow key={employee._id}>
                <TableCell>{employee._id}</TableCell>
                <TableCell><img src={employee.image} alt="" className="w-10 object-cover"/></TableCell>
                <TableCell>{employee.name}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.mobile}</TableCell>
                <TableCell>{employee.designation}</TableCell>
                <TableCell>{employee.gender}</TableCell>
                <TableCell>{employee.course}</TableCell>
                <TableCell>{new Date(employee.createdAt).toLocaleDateString()}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" onClick={() => {navigate(`/update/${employee._id}`)}}>Edit</Button>
                  <Button variant="ghost" size="sm" className="text-red-500" onClick={() => handleDelete(employee._id)}>Delete</Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default EmployeeListPage;
