import mongoose from 'mongoose';
import { designationEnum, genderEnum, courseEnum } from '@abhiram2k03/dealsdray-common';

const EmployeeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true,
        enum: designationEnum
    },
    gender:{
        type: String,
        required: true,
        enum: genderEnum
    },
    course:{
        type: String,
        required: true,
        enum: courseEnum
    },
    image:{
        type: String,
        required: true
    }
},
{
    timestamps: true
}
);

const EmployeeModel = mongoose.model('Employee', EmployeeSchema);
export default EmployeeModel;