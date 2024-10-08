import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { backendURL } from "@/config";

export const UpdateEmployeePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employeeData, setEmployeeData] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: '',
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/v1/employee/${id}`);
        setEmployeeData(response.data);
        setImagePreview(response.data.image);
      } catch (error) {
        console.error('Error fetching employee:', error);
      }
    };
    fetchEmployee();
  }, [id]);

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.name, e.target.value);
    setEmployeeData({
      ...employeeData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (course: string) => {
    setEmployeeData({
      ...employeeData,
      course: employeeData.course === course ? "" : course,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEmployeeData({ ...employeeData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(employeeData);
  
    try {
      
  
      const response = await axios.put(`${backendURL}/api/v1/employee/${id}`, employeeData);
  
      console.log('Update response:', response.data);
      alert('Employee updated successfully');
      navigate('/');
    } catch (error) {
      console.error('Error updating employee:', error);
      alert('Error updating employee');
    }
  };
  
  

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Employee</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={employeeData.name}
              onChange={handleChange}
              placeholder="Enter Name"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={employeeData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="mobile">Mobile No</Label>
            <Input
              type="tel"
              id="mobile"
              name="mobile"
              value={employeeData.mobile}
              onChange={handleChange}
              placeholder="Enter Mobile No"
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="designation">Designation</Label>
            <Select name="designation" value={employeeData.designation} onValueChange={(value) => setEmployeeData({ ...employeeData, designation: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Designation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HR">HR</SelectItem>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Gender</Label>
            <RadioGroup value={employeeData.gender} onValueChange={(value) => setEmployeeData({...employeeData, gender: value})}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="M" id="male" />
                <Label htmlFor="male">Male</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="F" id="female" />
                <Label htmlFor="female">Female</Label>
              </div>
            </RadioGroup>
          </div>

          <div>
            <Label>Course</Label>
            <div className="flex space-x-4">
              {['MCA', 'BCA', 'BSC'].map((course) => (
                <div key={course} className="flex items-center space-x-2">
                  <Checkbox
                    id={course.toLowerCase()}
                    checked={employeeData.course === course}
                    onCheckedChange={() => handleCheckboxChange(course)}
                  />
                  <Label htmlFor={course.toLowerCase()}>{course}</Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="imgUpload">Image Upload</Label>
            <Input type="file" id="imgUpload" onChange={handleImageChange} className="mt-1" />
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />
            )}
          </div>

          <Button type="submit" className="w-full mt-4">
            Update Employee
          </Button>
        </form>
      </div>
    </div>
  );
};