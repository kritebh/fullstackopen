import { useState } from "react"
import BlogDetails from "./BlogDetails"

const Blog = ({blog,updateLike,deleteBlog}) => {

  const [show,setShow] = useState(false)

  return (
  <div style={{border:"2px solid black",padding:"10px",margin:"10px 0px"}}>
    <p>
    {blog.title} | {blog.author}
    <button style={{marginLeft:"5px"}} onClick={()=>setShow(!show)}>{show?'hide':'show'}</button>
    </p>
    {show && <BlogDetails blog={blog} updateLike={updateLike} deleteBlog={deleteBlog} />}
  </div>  
  )
}

export default Blog