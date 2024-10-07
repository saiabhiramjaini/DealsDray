import mongoose from 'mongoose';

enum designationEnum {
    "HR",
    "Manager",
    "Sales"
}

enum genderEnum {
    "M",
    "F"
}

enum courseEnum {
    "MCA",
    "BCA",
    "BSC"
}

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
        enum: Object.values(designationEnum)
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