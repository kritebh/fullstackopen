const Header = ({ course }) => <h1>{course}</h1>;
const Total = ({ sum }) => <p>Number of exercises {sum}</p>
const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => {
  let sum = parts.reduce((acc,element) => {
      return acc+=element.exercises
  },0);
  return (
  <>
    {parts.map((part, i) => {
      return <Part part={part} key={i} />;
    })}
    <Total sum={sum} />
  </>
  )
};

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
    </>
  );
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <>
    {courses.map((course,i)=>{
      return <Course key={i} course={course} />;
    })}
    </>
  )
  
};

export default App;
