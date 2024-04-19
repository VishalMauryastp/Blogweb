import React from "react";
import { Link } from "react-router-dom";

const PostCard = ({ post }) => {
  return (
    <div className="">
      <div className="bg-white shadow border border-gray-200 rounded-lg  mb-5">
        <a href="#" className="">
          <img
            className="rounded-t-lg min-h-[223px]"
            src="https://flowbite.com/docs/images/blog/image-1.jpg"
            alt=""
          />
        </a>
        <div className="p-5">
          <p className="flex justify-between items-center text-sm">
            <span>By {post.author}</span>
            <span>{new Date(post.publish_date).toLocaleDateString()} </span>
          </p>
          <Link to="#">
            <h5 className="truncate
             text-gray-900 font-bold text-2xl tracking-tight mb-2">
              {post.title}
            </h5>
          </Link>
          <div
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="font-normal text-gray-700 mb-3 line-clamp-3"
          >
            {/* {post.content} */}
          </div>
          <Link
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
            to={`/posts/${post.id}`}
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
