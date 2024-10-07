import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

export const UpdateEmployeePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Edit Employee</h1>
        <form className="space-y-4">
          {/* Name Field */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
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
              placeholder="Enter Mobile No"
              className="mt-1"
            />
          </div>

          {/* Designation Dropdown */}
          <div>
            <Label htmlFor="designation" className="mr-8">Designation: </Label>
            <select>
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
                  className="mr-2"
                />
                <Label htmlFor="female" className="cursor-pointer">
                  Female
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Course Checkbox */}
          <div className="flex gap-8">
            <Label className="mr-9 mt-1">Course: </Label>
            <div className="flex gap-5">
              <span>
                <Checkbox id="mca" value="MCA" />
                <Label htmlFor="mca" className="p-2">MCA</Label>
              </span>
              <span>
                <Checkbox id="bca" value="BCA" />
                <Label htmlFor="bca" className="p-2">BCA</Label>
              </span>
              <span>
                <Checkbox id="bsc" value="BSC" />
                <Label htmlFor="bsc" className="p-2">BSC</Label>
              </span>
            </div>
          </div>

          {/* Img Upload Field */}
          <div>
            <Label htmlFor="imgUpload">Img Upload</Label>
            <Input type="file" id="imgUpload" className="mt-1" />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full mt-4">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};
