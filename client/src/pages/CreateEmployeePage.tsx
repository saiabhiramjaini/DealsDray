import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import axios from "axios";
import { backendURL } from "@/config";
// @ts-ignore
import { employeeSchema, designationEnum, genderEnum, courseEnum, Employee } from "@abhiram2k03/dealsdray-common";
import { Checkbox } from "@/components/ui/checkbox";

export const CreateEmployeePage = () => {
  const [employeeData, setEmployeeData] = useState<Employee>({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "", 
    image: null,
  });

  const cloudinaryURL = import.meta.env.VITE_CLOUDINARY_URL;
  const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
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
  
  

  const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEmployeeData({
        ...employeeData,
        image: e.target.files[0],
      });
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
    try {
      let dataToSend = { ...employeeData };

      // Upload image if exists
      if (employeeData.image instanceof File) {
        const imageUrl = await uploadImage(employeeData.image);
        dataToSend.image = imageUrl;
      }

      // Validate employeeData according to the schema
      const validationResult = employeeSchema.safeParse(dataToSend);
      if (!validationResult.success) {
        console.error("Validation Error: ", validationResult.error);
        return;
      }

      const response = await axios.post(`${backendURL}/api/v1/employee`, dataToSend);
      console.log(response.data);
    } catch (error) {
      console.error("Error occurred", error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Create Employee</h1>
        <form className="space-y-4">
          {/* Name Field */}
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

          {/* Email Field */}
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

          {/* Mobile No Field */}
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

          {/* Designation Dropdown */}
          <div>
            <Label htmlFor="designation" className="mr-8">Designation: </Label>
            <select
              id="designation"
              name="designation"
              value={employeeData.designation}
              onChange={handleChange}
              className="mt-1"
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="Manager">Manager</option>
              <option value="Sales">Sales</option>
            </select>
          </div>

          {/* Gender Radio Buttons */}
          <div className="flex gap-7">
            <Label className="mr-10">Gender: </Label>
            <RadioGroup className="flex">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="M"
                  checked={employeeData.gender === "M"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <Label htmlFor="male" className="cursor-pointer">
                  Male
                </Label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="F"
                  checked={employeeData.gender === "F"}
                  onChange={handleChange}
                  className="mr-2"
                />
                <Label htmlFor="female" className="cursor-pointer">
                  Female
                </Label>
              </div>
            </RadioGroup>
          </div>

{/* Course Checkboxes */}
<div className="flex gap-8">
            <Label className="mr-9 mt-1">Course: </Label>
            <div className="flex gap-5">
              <span>
                <Checkbox
                  id="mca"
                  checked={employeeData.course === "MCA"}
                  onCheckedChange={() => handleCheckboxChange("MCA")}
                />
                <Label htmlFor="mca" className="p-2">MCA</Label>
              </span>
              <span>
                <Checkbox
                  id="bca"
                  checked={employeeData.course === "BCA"}
                  onCheckedChange={() => handleCheckboxChange("BCA")}
                />
                <Label htmlFor="bca" className="p-2">BCA</Label>
              </span>
              <span>
                <Checkbox
                  id="bsc"
                  checked={employeeData.course === "BSC"}
                  onCheckedChange={() => handleCheckboxChange("BSC")}
                />
                <Label htmlFor="bsc" className="p-2">BSC</Label>
              </span>
            </div>
          </div>



          {/* Image Upload Field */}
          <div>
            <Label htmlFor="imgUpload">Image Upload</Label>
            <Input
              type="file"
              id="imgUpload"
              name="image"
              onChange={handleImageChange}
              className="mt-1"
            />
          </div>

          {/* Submit Button */}
          <Button onClick={handleSubmit} className="w-full mt-4">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};




