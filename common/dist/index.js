"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseEnum = exports.genderEnum = exports.designationEnum = exports.employeeSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    username: zod_1.z.string().min(1, { message: "Username should be non-empty" }),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
});
exports.employeeSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, { message: "Name is required" }),
    email: zod_1.z.string().email({ message: "Invalid email address" }),
    mobile: zod_1.z.string().min(10, { message: "Mobile number should contain 10 digits" }),
    designation: zod_1.z.enum(["HR", "Manager", "Sales"], { message: "Invalid designation" }),
    gender: zod_1.z.enum(["M", "F"], { message: "Invalid gender" }),
    course: zod_1.z.enum(["MCA", "BCA", "BSC"], { message: "Invalid course" }),
    image: zod_1.z.string({ message: "Upload Image" }).url({ message: "Invalid image URL" })
});
var designationEnum;
(function (designationEnum) {
    designationEnum[designationEnum["HR"] = 0] = "HR";
    designationEnum[designationEnum["Manager"] = 1] = "Manager";
    designationEnum[designationEnum["Sales"] = 2] = "Sales";
})(designationEnum || (exports.designationEnum = designationEnum = {}));
var genderEnum;
(function (genderEnum) {
    genderEnum[genderEnum["M"] = 0] = "M";
    genderEnum[genderEnum["F"] = 1] = "F";
})(genderEnum || (exports.genderEnum = genderEnum = {}));
var courseEnum;
(function (courseEnum) {
    courseEnum[courseEnum["MCA"] = 0] = "MCA";
    courseEnum[courseEnum["BCA"] = 1] = "BCA";
    courseEnum[courseEnum["BSC"] = 2] = "BSC";
})(courseEnum || (exports.courseEnum = courseEnum = {}));
