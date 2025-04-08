import express from "express";
import { login } from "../controllers/login.controller.js";
const LoginRouter = express.Router();
LoginRouter.post("/", login);
export default LoginRouter;
