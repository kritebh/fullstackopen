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

  const loginFormHandler = async (event) => {
    event.preventDefault();
    let userDetails = await blogService.login(
      loginFormData.username,
      loginFormData.password
    );
    setUser(userDetails);
    setLoginFormData({});
  };

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
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
