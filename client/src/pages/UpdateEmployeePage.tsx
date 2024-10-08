import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { backendURL } from "@/config";
import { employeeSchema } from "@abhiram2k03/dealsdray-common";
import { toast } from "react-toastify";
import { Navbar } from "@/components/ui/Navbar";

export const UpdateEmployeePage = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: null as File | null,
  });
  const [imagePreview, setImagePreview] = useState("");

  const cloudinaryURL = import.meta.env.VITE_CLOUDINARY_URL;
  const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`${backendURL}/api/v1/employee/${id}`);
        setEmployeeData(response.data);
        setImagePreview(response.data.image);
      } catch (error) {
        console.error("Error fetching employee:", error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    if (e.target.files && e.target.files.length > 0) {
      setEmployeeData({
        ...employeeData,
        image: e.target.files[0],
      });
      setImagePreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", cloudinaryUploadPreset);
    formData.append("cloud_name", cloudinaryCloudName);

    axios.defaults.withCredentials = false;
    const response = await axios.post(cloudinaryURL, formData);
    axios.defaults.withCredentials = true;
    return response.data.secure_url;
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      let dataToSend = { ...employeeData };

      if (employeeData.image instanceof File) {
        const imageUrl = await uploadImage(employeeData.image);
        dataToSend.image = imageUrl;
      }

      const validationResult = employeeSchema.safeParse(dataToSend);
      if (!validationResult.success) {
        console.error("Validation Error: ", validationResult.error);
        toast.error(validationResult.error.errors[0].message);
        setErrorMessage("Employee creation failed. Please try again.");
        return;
      }

      const response = await axios.put(
        `${backendURL}/api/v1/employee/${id}`,
        dataToSend
      );
      if (response.status === 200) {
        toast.success("Employee updated successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.error("Error occured", error);
      setErrorMessage("Updating employee failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">Edit Employee</h1>
          <form className="space-y-4">
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
              <Select
                name="designation"
                value={employeeData.designation}
                onValueChange={(value) =>
                  setEmployeeData({ ...employeeData, designation: value })
                }
              >
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
            {/* Gender Radio Buttons */}
            <div className="flex gap-8">
              <Label>Gender</Label>
              <RadioGroup
                value={employeeData.gender}
                onValueChange={(value) =>
                  setEmployeeData({ ...employeeData, gender: value })
                }
                className="flex gap-5"
              >
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

            {/* Course checkboxes */}
            <div className="flex gap-8">
              <Label>Course</Label>
              <div className="flex space-x-4">
                {["MCA", "BCA", "BSC"].map((course) => (
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

            <div className="flex gap-5">
              <div className="flex flex-1 flex-col justify-center">
                <Label htmlFor="imgUpload">Image Upload</Label>
                <Input
                  type="file"
                  id="imgUpload"
                  onChange={handleImageChange}
                  className="mt-1"
                />
              </div>

              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 w-24  object-cover rounded"
                />
              )}
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <Button
              type="submit"
              onClick={handleSubmit}
              className="w-full mt-4"
            >
              {loading ? "Loading..." : "Update Employee"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
