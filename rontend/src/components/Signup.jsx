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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleImageChange = (event) => {
    const files = event.target.files;
    if (files) {
      setSelectedImages(Array.from(files));
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const formData = { username, email, password };
    const url = "http://localhost:5000/api/signup";
    try {
      const response = await axios.post(url, formData, {
        withCredentials: true,
      });
      console.log(response);
    } catch (error) {
      console.error("Error during signup:", error.response);
    }
  };

  const handleRemoveImage = (index) => {
    const updatedImages = selectedImages.filter((_, i) => i !== index);
    setSelectedImages(updatedImages);
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
          <h3>Register from Here</h3>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                      placeholder="Username"
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

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
              type="password"
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

            <div>
              <label htmlFor="">Choose Profile Picture</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                accept="image/*"
              />
            </div>

            <div className="image-previews">
              {selectedImages.length > 0 && (
                <div className="image-preview">
                  <img
                    src={URL.createObjectURL(selectedImages[0])}
                    alt="preview"
                    className="image-preview-img"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(0)}
                    className="remove-button"
                  >
                    X
                  </button>
                </div>
              )}
            </div>

            <Button onClick={handleSignup}>Register</Button>
          </form>
        </Form>
      </div>
    </>
  );
}

export default Signup;
