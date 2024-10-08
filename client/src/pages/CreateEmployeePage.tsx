import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import axios from "axios";
import { backendURL } from "@/config";
import { employeeSchema } from "@abhiram2k03/dealsdray-common";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "react-toastify";
import { Navbar } from "@/components/ui/Navbar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

export const CreateEmployeePage = () => {
  const [employeeData, setEmployeeData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    course: "",
    image: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const cloudinaryURL = import.meta.env.VITE_CLOUDINARY_URL;
  const cloudinaryUploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
  const cloudinaryCloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
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

      const response = await axios.post(
        `${backendURL}/api/v1/employee`,
        dataToSend
      );
      if (response.status === 201) {
        toast.success("Employee created successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error: any) {
      if(error.response.status === 401) {
        localStorage.removeItem("username");
        toast.error("Session expired. Please login again.");
        navigate("/");
      }
      toast.error(error.response.data.message);
      console.error("Error occured", error);
      setErrorMessage("Employee creation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 flex-col justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6 text-center">
            Create Employee
          </h1>
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
                required
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
                required
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
                required
              />
            </div>

            {/* Designation Dropdown */}
            <div>
              <Label htmlFor="designation">Designation</Label>
              <Select
                name="designation"
                value={employeeData.designation}
                onValueChange={(value) =>
                  setEmployeeData({ ...employeeData, designation: value })
                }
                required
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

            {/* Image Upload Field */}
            <div>
              <Label htmlFor="imgUpload">Image Upload</Label>
              <Input
                type="file"
                id="imgUpload"
                name="image"
                onChange={handleImageChange}
                className="mt-1"
                required
                accept=".jpg,.png"
              />
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            {/* Submit Button */}
            <Button onClick={handleSubmit} className="w-full mt-4">
              {loading ? "Creating..." : "Submit"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
