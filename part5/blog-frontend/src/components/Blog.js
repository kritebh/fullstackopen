import { useState } from "react";
import BlogDetails from "./BlogDetails";
import PropTypes from "prop-types";
const Blog = ({ blog, updateLike, deleteBlog }) => {
  const [show, setShow] = useState(false);

  return (
    <div
      style={{ border: "2px solid black", padding: "10px", margin: "10px 0px" }}
    >
      <p>
        {blog.title} | {blog.author}
        <button style={{ marginLeft: "5px" }} onClick={() => setShow(!show)}>
          {show ? "hide" : "show"}
        </button>
      </p>
      {show && (
        <BlogDetails
          blog={blog}
          updateLike={updateLike}
          deleteBlog={deleteBlog}
        />
      )}
    </div>
  );
};

Blog.propTypes={
  blog:PropTypes.object.isRequired,
  updateLike:PropTypes.func.isRequired,
  deleteBlog:PropTypes.func.isRequired
};

export default Blog;
