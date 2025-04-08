import * as React from "react";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import axios from "axios";

export default function AddPost() {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [selectedImage, setSelectedImage] = React.useState(null);
  const [errorMessage, setErrorMessage] = React.useState("");

  // Handle single image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setErrorMessage("");
    }
  };

  // Remove selected image
  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !selectedImage) {
      setErrorMessage("All fields including image are required.");
      return;
    }

    setErrorMessage("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", selectedImage);

    try {
      const response = await axios.post("http://localhost:5000/api/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      console.log("Post Added:", response.data);
      alert("Post added successfully!");

      // Reset form
      setTitle("");
      setDescription("");
      setSelectedImage(null);
    } catch (error) {
      console.error("Error adding post:", error);
      setErrorMessage("Failed to add post. Please try again.");
    }
  };

  return (
    <Card className="w-[350px] ml-[20rem] mt-10">
      <CardHeader>
        <CardTitle>Create Post</CardTitle>
        <CardDescription>Add your new Post in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Title of your Post"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />

              <Label htmlFor="description">Describe</Label>
              <Textarea
                id="description"
                placeholder="Description of your Post"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Label htmlFor="image">Choose Image</Label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className="file-input"
              />

              {errorMessage && <p className="text-red-500">{errorMessage}</p>}

              {selectedImage && (
                <div className="image-preview mt-2 relative w-[100px] h-[100px]">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="preview"
                    className="w-full h-full object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center"
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
          <br />
          <CardFooter className="flex justify-between">
            <Button variant="outline" type="button" onClick={() => window.location.reload()}>
              Cancel
            </Button>
            <Button type="submit">Add Post</Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
