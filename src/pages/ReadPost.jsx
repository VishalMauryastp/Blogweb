import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout/Layout";

const ReadPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [ipAddress, setIpAddress] = useState("");

  const fetchPost = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/post.php/${id}`
      );
      const post = response.data.data;
      setPost(post);
      console.log("response read post ", response);
      setLikeCount(post.likes);
      setDislikeCount(post.dislikes);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchIpAddress = async () => {
    try {
      const response = await axios.get("https://api.ipify.org/?format=json");
      setIpAddress(response.data.ip);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/post.php/${id}/like/${ipAddress}`
      );
      const likes = response.data.data;
      setLikeCount(likes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDislike = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/post.php/${id}/dislike/${ipAddress}`
      );
      const dislikes = response.data.data;
      setDislikeCount(dislikes);
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    fetchPost();
    // fetchIpAddress();
  }, [fetchPost]);

  if (!post) {
    return <div>Loading...</div>;
  }
  return (
    <Layout>
      <section className="bg-[#bdbdbd]/40 py-10">
        <div className=" my-4 w-[90%] mx-auto">
          <h1 className="mb-4 text-2xl md:text-4xl  font-sans font-semibold">{post.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: post.content }} className="space-y-3 [&>ol]:space-y-3 [&>ol]:list-decimal"> 
            {/* {post.content} */}
          </div>
          <hr />
          <div className="d-flex justify-content-between">
            <div>
              <button
                className="btn btn-outline-primary me-2"
                onClick={handleLike}
              >
                Like <span className="badge bg-primary">{likeCount}</span>
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={handleDislike}
              >
                Dislike <span className="badge bg-danger">{dislikeCount}</span>
              </button>
            </div>
            <div className="mt-8">
              <small className="text-muted">
                Posted by {post.author} on {post.date}
              </small>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ReadPost;
