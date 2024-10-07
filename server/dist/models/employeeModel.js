"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
var designationEnum;
(function (designationEnum) {
    designationEnum[designationEnum["HR"] = 0] = "HR";
    designationEnum[designationEnum["Manager"] = 1] = "Manager";
    designationEnum[designationEnum["Sales"] = 2] = "Sales";
})(designationEnum || (designationEnum = {}));
var genderEnum;
(function (genderEnum) {
    genderEnum[genderEnum["M"] = 0] = "M";
    genderEnum[genderEnum["F"] = 1] = "F";
})(genderEnum || (genderEnum = {}));
var courseEnum;
(function (courseEnum) {
    courseEnum[courseEnum["MCA"] = 0] = "MCA";
    courseEnum[courseEnum["BCA"] = 1] = "BCA";
    courseEnum[courseEnum["BSC"] = 2] = "BSC";
})(courseEnum || (courseEnum = {}));
const EmployeeSchema = new mongoose_1.default.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    mobile: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true,
        enum: Object.values(designationEnum)
    },
    gender: {
        type: String,
        required: true,
        enum: genderEnum
    },
    course: {
        type: String,
        required: true,
        enum: courseEnum
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});
const EmployeeModel = mongoose_1.default.model('Employee', EmployeeSchema);
exports.default = EmployeeModel;
