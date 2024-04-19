import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Layout/Layout";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(""); // State for storing the error message

  const navigate = useNavigate();

  // Example validation function (extend as needed)
  const validateForm = () => {
    if (!title.trim() || !content.trim() || !author.trim()) {
      setError("Please fill in all fields.");
      return false;
    }
    // Additional validation logic here
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(""); // Reset error message on new submission
    if (!validateForm()) return; // Perform validation

    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/create-post.php`,
        {
          title,
          content: `<pre>${content}</pre>`,
          author,
          category,
        }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError("Failed to create post. Please try again later.");
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="bg-[#bdbdbd]/40 min-h-[80vh]">
        <div className="w-[90%] mx-auto ">
          <h2 className=" text-2xl font-sans font-semibold md:text-4xl py-10">
            Create a New Post
          </h2>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}{" "}
          {/* Display error message */}
          <form onSubmit={handleSubmit} className=" p-4">
            <div className="mb-3  flex flex-col gap-3">
              <label htmlFor="category" className="font-semibold">
                Category :
              </label>
              <input
                type="text"
                className="px-2 py-1 rounded border shadow w-full"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
            </div>
            <div className="mb-3  flex flex-col gap-3">
              <label htmlFor="title" className="font-semibold">
                Title :
              </label>
              <input
                type="text"
                className="px-2 py-1 rounded border shadow w-full"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3  flex flex-col gap-3">
              <label htmlFor="content" className="font-semibold">
                Content :
              </label>
              <textarea
                className="px-2 py-1 rounded border shadow w-full"
                id="content"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              ></textarea>
            </div>
            <div className="mb-3  flex flex-col gap-3">
              <label htmlFor="author" className="font-semibold">
                Author Name :
              </label>
              <input
                type="text"
                className="px-2 py-1 rounded border shadow w-full"
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className=" px-8 mt-4 mb-10 py-2 bg-blue-400 rounded"
              disabled={isLoading}
            >
              {isLoading ? (
                <span>
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>{" "}
                  Creating post...
                </span>
              ) : (
                "Create Post"
              )}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default CreatePost;
