"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dealsdray_common_1 = require("@abhiram2k03/dealsdray-common");
const EmployeeSchema = new mongoose_1.default.Schema({
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
        enum: dealsdray_common_1.designationEnum
    },
    gender: {
        type: String,
        required: true,
        enum: dealsdray_common_1.genderEnum
    },
    course: {
        type: String,
        required: true,
        enum: dealsdray_common_1.courseEnum
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
