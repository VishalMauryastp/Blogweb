import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import PostCard from "../components/PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/posts.php?page=${currentPage}`
        );
        console.log(response);
        // Assuming the backend wraps posts in a 'posts' field and provides 'totalPosts'
        setPosts(response.data.posts);
        setTotalPosts(response.data.totalPosts);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setError("Failed to load posts.");
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentPage]);

  const totalPages = Math.ceil(totalPosts / postsPerPage);
  const goToPreviousPage = () => setCurrentPage(currentPage - 1);
  const goToNextPage = () => setCurrentPage(currentPage + 1);
  return (
    <Layout>
      <section className="bg-[#bdbdbd]/40 py-10">
        <div className="w-[90%] mx-auto ">
          <h1 className="font-sans font-semibold text-5xl ">Latest Posts</h1>
          {/* {error && <div className="">{error}</div>} */}
          <div className=" grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3  xl:grid-cols-4 gap-4 mt-10">
            {isLoading ? (
              <p>Loading posts...</p>
            ) : posts?.length ? (
              <>
                {posts.map((post, i) => {
                  return <PostCard key={i} post={post} />;
                })}
              </>
            ) : (
              <p>No posts available.</p>
            )}
          </div>
          <ul className="flex items-center gap-4">
            <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
              <button
                className=" bg-white w-fit px-2 py-1 rounded"
                onClick={goToPreviousPage}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li
                key={index}
                className={`${index + 1 === currentPage ? "active" : ""}`}
              >
                <button className="" onClick={() => setCurrentPage(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
            <li className={`${currentPage === totalPages ? "disabled" : ""}`}>
              <button
                className=" bg-white w-fit px-2 py-1 rounded"
                onClick={goToNextPage}
              >
                Next
              </button>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
