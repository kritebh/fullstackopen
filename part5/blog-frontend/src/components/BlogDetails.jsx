import React from "react";

function BlogDetails({ blog, updateLike, deleteBlog }) {
  return (
    <div>
      <p>URL : {blog.url}</p>
      <p>
        Likes : {blog.likes}{" "}
        <button
          style={{ marginLeft: "5px" }}
          onClick={() =>
            updateLike({ ...blog, likes: blog.likes + 1, user: blog.user.id })
          }
        >
          like
        </button>
      </p>
      <p>author : {blog.author}</p>
      <button onClick={() => deleteBlog(blog)}>remove</button>
    </div>
  );
}

export default BlogDetails;
