import { render,screen } from "@testing-library/react";
import Blog from "./Blog";
// import userEvent from "@testing-library/user-event";
test("Render only title and author ",() => {
  const blog = {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  render(<Blog blog={blog}/>);

  const element = screen.getByText("React patterns | Michael Chan");
  expect(element).toBeDefined();
});

test("check blog url's and likes",() => {
  const blog = {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  };

  // eslint-disable-next-line no-unused-vars
  const mockHandler = jest.fn();
  render(<Blog blog={blog} />);
});