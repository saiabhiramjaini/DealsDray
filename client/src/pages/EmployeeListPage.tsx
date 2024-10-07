import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const employees = [
  { id: 1, name: "hukum", email: "hcgupta@cstech.in", mobile: "954010044", designation: "HR", gender: "Male", course: "MCA", createDate: "13-Feb-21" },
  { id: 1, name: "manish", email: "manish@cstech.in", mobile: "954010033", designation: "Sales", gender: "Male", course: "BCA", createDate: "12-Feb-21" },
  { id: 1, name: "yash", email: "yash@cstech.in", mobile: "954010022", designation: "Manager", gender: "Male", course: "BSC", createDate: "11-Feb-21" },
  { id: 1, name: "abhishek", email: "abhishek@cstech.in", mobile: "954010033", designation: "HR", gender: "Male", course: "MCA", createDate: "13-Feb-21" },
];

export const EmployeeListPage = () => {
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

      <Table>
        <TableCaption>A list of employees.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Unique Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Mobile No</TableHead>
            <TableHead>Designation</TableHead>
            <TableHead>Gender</TableHead>
            <TableHead>Course</TableHead>
            <TableHead>Create Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.id}</TableCell>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.email}</TableCell>
              <TableCell>{employee.mobile}</TableCell>
              <TableCell>{employee.designation}</TableCell>
              <TableCell>{employee.gender}</TableCell>
              <TableCell>{employee.course}</TableCell>
              <TableCell>{employee.createDate}</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">Edit</Button>
                <Button variant="ghost" size="sm" className="text-red-500">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EmployeeListPage;