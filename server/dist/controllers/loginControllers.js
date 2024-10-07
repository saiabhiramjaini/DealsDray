"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createUser = void 0;
const zod_1 = __importDefault(require("zod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const loginModel_1 = __importDefault(require("../models/loginModel"));
const loginSchema = zod_1.default.object({
    username: zod_1.default.string().min(1, { message: "Username should be non-empty" }),
    password: zod_1.default
        .string()
        .min(8, { message: "Password must be at least 8 characters long" }),
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = loginSchema.parse(req.body);
        const existingUser = yield loginModel_1.default.findOne({ username });
        if (existingUser) {
            return res
                .status(400)
                .json({ message: "User already exists. Please login." });
        }
        const hashedPassword = yield bcrypt_1.default.hash(password, 10);
        const newUser = yield loginModel_1.default.create({
            username,
            password: hashedPassword,
        });
        return res.status(201).json({ message: "User created", user: newUser });
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: err.errors.map((error) => ({
                    field: error.path[0],
                    message: error.message,
                })),
            });
        }
        console.error("Error creating user:", err);
        return res
            .status(500)
            .json({
            message: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = loginSchema.parse(req.body);
        const existingUser = yield loginModel_1.default.findOne({ username });
        if (!existingUser) {
            return res
                .status(400)
                .json({ message: "User doesn't exists. Please Signin." });
        }
        const comparePassword = yield bcrypt_1.default.compare(password, existingUser.password);
        if (!comparePassword) {
            return res.status(400).json({ message: "Invalid password" });
        }
        return res.status(200).json({ message: "Login successful" });
    }
    catch (err) {
        if (err instanceof zod_1.default.ZodError) {
            return res.status(400).json({
                message: "Validation failed",
                errors: err.errors.map((error) => ({
                    field: error.path[0],
                    message: error.message,
                })),
            });
        }
        console.error("Error creating user:", err);
        return res
            .status(500)
            .json({
            message: "An unexpected error occurred. Please try again later.",
        });
    }
});
exports.loginUser = loginUser;
