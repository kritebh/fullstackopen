import React from "react";

function AddBlog({newBlogData,setNewBlogData,newBlogFormHandler}) {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newBlogFormHandler}>
        <div>
        title: <input type="text" onChange={(e)=>setNewBlogData({...newBlogData,title:e.target.value})}/>
        </div>
        <div>
        author: <input type="text" onChange={(e)=>setNewBlogData({...newBlogData,author:e.target.value})}/>
        </div>
        <div>
        url: <input type="text" onChange={(e)=>setNewBlogData({...newBlogData,url:e.target.value})}/>
        </div>
        <div>
        <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
}

export default AddBlog;
