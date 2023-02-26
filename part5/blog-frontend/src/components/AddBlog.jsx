import React, { useState } from "react";
import PropTypes from "prop-types";
function AddBlog({ newBlogFormHandler }) {
  const [newBlogData, setNewBlogData] = useState({});

  const addBlog = (event) => {
    event.preventDefault();
    newBlogFormHandler(newBlogData);
    event.target.reset();
    setNewBlogData({});
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            type="text"
            onChange={(e) =>
              setNewBlogData({ ...newBlogData, title: e.target.value })
            }
          />
        </div>
        <div>
          author:{" "}
          <input
            type="text"
            onChange={(e) =>
              setNewBlogData({ ...newBlogData, author: e.target.value })
            }
          />
        </div>
        <div>
          url:{" "}
          <input
            type="text"
            onChange={(e) =>
              setNewBlogData({ ...newBlogData, url: e.target.value })
            }
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
      <br />
    </div>
  );
}

AddBlog.propTypes = {
  newBlogFormHandler:PropTypes.func.isRequired
};

export default AddBlog;
