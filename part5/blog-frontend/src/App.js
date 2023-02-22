import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [loginFormData, setLoginFormData] = useState({});

  useEffect(() => {
    if(user){
      blogService.getAll(user?.token).then((blogs) => setBlogs(blogs));
    }
  }, [user]);
  
  useEffect(()=>{
    let userDetails = localStorage.getItem('user')
    if(userDetails){
      setUser(JSON.parse(userDetails))
    }
  },[])

  const loginFormHandler = async (event) => {
    event.preventDefault();
    let userDetails = await blogService.login(
      loginFormData.username,
      loginFormData.password
    );
    localStorage.setItem('user',JSON.stringify(userDetails))
    setUser(userDetails);
    setLoginFormData({});
  };

  const logout = ()=>{
    localStorage.clear()
    setUser(null)
    setBlogs([])
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
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
      <button onClick={logout}>logout</button>
      </p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
