import express from "express";
import { signup } from "../controllers/signup.controller.js";

const SignupRouter = express.Router();
SignupRouter.post("/", signup);
export default SignupRouter;
