import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import AddBlog from "./components/AddBlog";
import Notification from "./components/Notification"
import Togglable from "./components/Togglable";
import sort from "./utils/sortBlog"
import "./App.css"
const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loginFormData, setLoginFormData] = useState({});
  const [showNotification,setShowNotification] = useState({type:"",message:""})

  useEffect(()=>{
    let userDetails = localStorage.getItem('user')
    if(userDetails){
      setUser(JSON.parse(userDetails))
    }
  },[])


  useEffect(() => {
    if(user){
      blogService.getAll(user?.token).then((blogs) => {
        sort(blogs)
        setBlogs(blogs)
      });
    }
  }, [user]);
  

  const loginFormHandler = async (event) => {
    event.preventDefault();
    try{
      let userDetails = await blogService.login(
        loginFormData.username,
        loginFormData.password
      );
      localStorage.setItem('user',JSON.stringify(userDetails))
      setUser(userDetails);
      setLoginFormData({});
    }
    catch(error){
      if(error.response.status===401){
        notify("error",error.response.data.error)
      }
    }
  };

  const newBlogFormHandler = async(formData)=>{
    let newBlog = await blogService.addNew(formData,user.token)
    setBlogs([...blogs,newBlog])
    notify("success",`${newBlog.title} by ${newBlog.author} added`)
  }


  const updateLike = async (blogToBeUpdate)=>{
    let res = await blogService.updateBlog(blogToBeUpdate,user.token)
    let allBlogs = [...blogs];
    allBlogs.forEach((b)=>{
      if(b.id===res.id){
        b.likes = res.likes
      }
    })
    sort(allBlogs)
    setBlogs(allBlogs)
  }

  const deleteBlog = async(blogToDelete)=>{
    if(window.confirm(`Remove blog ${blogToDelete.title} by ${blogToDelete.author}`)){
      let res = await blogService.deleteBlog(blogToDelete.id,user.token)
      if(res.status===204){
        let allBlogs = [...blogs]
        allBlogs = allBlogs.filter(d=>{
          return d.id!==blogToDelete.id
        })
        setBlogs(allBlogs)
      }
    }
  }

  const logout = ()=>{
    localStorage.clear()
    setUser(null)
    setBlogs([])
  }

  const notify=(type,message)=>{
    setShowNotification({...showNotification,type,message})
    setTimeout(()=>{
      setShowNotification({type:"",message:""})
    },5000)
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {showNotification.message && <Notification notification={showNotification}/>}
        <form onSubmit={loginFormHandler}>
          <div>
            username :{" "}
            <input
              type="text"
              onChange={(e) => {
                setLoginFormData({
                  ...loginFormData,
                  username: e.target.value,
                });
              }}
            ></input>
          </div>
          <div>
            password :{" "}
            <input
              type="text"
              onChange={(e) => {
                setLoginFormData({
                  ...loginFormData,
                  password: e.target.value,
                });
              }}
            ></input>
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>
      {user.name} logged in
      </p>
      {showNotification.message && <Notification notification={showNotification}/>}
      <button onClick={logout}>logout</button><br/><br/>
    <Togglable buttonLabel='create new'>
      <AddBlog 
      newBlogFormHandler={newBlogFormHandler}  
      />
    </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} updateLike={updateLike} deleteBlog={deleteBlog} />
      ))}
    </div>
  );
};

export default App;
