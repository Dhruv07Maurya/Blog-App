import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "./ui/button";
import axios from "axios";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    const formData = {
      email,
      password,
    };
    console.log(formData);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = {
      email,
      password,
    };
    const response = await axios.post(
      "http://localhost:5000/api/login",
      formData,
      {
        withCredentials: true,
      }
    );
    if (response.request.status === 200) {
      navigate("/dashboard/reads");
    }
    console.log(response.data);
  };

  return (
    <>
      <div id="rootg">
        <div style={{ textAlign: "center" }}>
          <Navbar />
        </div>

        <br />
        <br />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h3>Login Here</h3>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      placeholder="Email"
                    />
                  </FormControl>
                  <FormDescription>Enter your email address.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      type="password"
                      placeholder="Password"
                    />
                  </FormControl>
                  <FormDescription>Enter a strong password.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button onClick={handleLogin}>Login</Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default Login;
