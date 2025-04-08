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

  // Fetch posts on component mount
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/posts")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.error("Failed to fetch posts", err);
      });
  }, []);

  return (
    <div className="w-[50rem] ml-[7rem] mt-5">
      <Accordion type="single" collapsible>
        {posts.length === 0 ? (
          <p className="text-gray-500 text-center">Loading posts...</p>
        ) : (
          posts.map((post, index) => (
            <AccordionItem value={`item-${index}`} key={post._id}>
              <AccordionTrigger className="p-5 font-semibold">
                {post.title}
              </AccordionTrigger>
              <AccordionContent className="p-7">
                <p className="text-gray-350">{post.description}</p>
                {post.image && (
                  <center className="p-5 ml-8">
                    <img
                      src={post.image}
                      alt={`Post ${index}`}
                      className="rounded-md w-[400px] h-auto object-cover shadow-md"
                    />
                  </center>
                )}
              </AccordionContent>
            </AccordionItem>
          ))
        )}
      </Accordion>
    </div>
  );
};

export default Accordionn;
