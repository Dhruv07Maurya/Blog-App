import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const Accordionn = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editedDescription, setEditedDescription] = useState("");

  // Fetch posts from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => {
        setPosts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch posts", err);
        setLoading(false);
      });
  }, []);

  // Delete post by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== id));
    } catch (error) {
      console.error("Failed to delete post", error);
      alert("Error deleting post. Check console for details.");
    }
  };

  // Enable editing
  const startEditing = (id, currentDescription) => {
    setEditingId(id);
    setEditedDescription(currentDescription);
  };

  // Save updated description
  const saveEdit = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${id}`, {
        description: editedDescription,
      });

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post._id === id ? { ...post, description: editedDescription } : post
        )
      );

      setEditingId(null);
      setEditedDescription("");
    } catch (error) {
      console.error("Failed to update description", error);
      alert("Error updating description. Check console for details.");
    }
  };

  return (
    <div className="w-[50rem] ml-[7rem] mt-5">
      <Accordion type="single" collapsible>
        {loading ? (
          <p className="text-gray-200 text-center">Loading posts...</p>
        ) : posts.length === 0 ? (
          <p className="text-gray-500 text-center">No posts found.</p>
        ) : (
          posts.map((post, index) => (
            <AccordionItem value={`item-${index}`} key={post._id}>
              <AccordionTrigger className="p-5 font-semibold">
                {post.title}
              </AccordionTrigger>
              <AccordionContent className="p-7">
                {/* Show textarea if editing, else description */}
                {editingId === post._id ? (
                  <textarea
                    className="w-full p-2 border rounded text-gray-800"
                    value={editedDescription}
                    onChange={(e) => setEditedDescription(e.target.value)}
                  />
                ) : (
                  <p className="text-gray-300">{post.description}</p>
                )}

                {post.image && (
                  <center className="p-5 ml-8">
                    <img
                      src={post.image}
                      alt={`Post ${index}`}
                      className="rounded-md w-[400px] h-auto object-cover shadow-md"
                    />
                  </center>
                )}

                {/* Action buttons */}
                <div className="text-right flex justify-end gap-2">
                  {editingId === post._id ? (
                    <>
                      <button
                        onClick={() => saveEdit(post._id)}
                        className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded shadow-sm"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="mt-4 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow-sm"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEditing(post._id, post.description)}
                      className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded shadow-sm"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(post._id)}
                    className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-sm"
                  >
                    Delete
                  </button>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        )}
      </Accordion>
    </div>
  );
};

export default Accordionn;
