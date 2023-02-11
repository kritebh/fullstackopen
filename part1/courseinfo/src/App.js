const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }



  const Header = ({course})=>{
    return (
      <h1>{course}</h1>
    )
  }

  const Part = ({part:{name,exercises}})=>{
    return (
      <>
      <p>
        {name} {exercises}
      </p>
      </>
    )
  }

  const Total = ({exercises1,exercises2,exercises3})=>{
    return (
      <p>Number of exercises {exercises1 + exercises2 + exercises3}</p>
    )
  }

  return (
    <div>
      <Header course={course.name} />
      <Part part={course.parts[0]}/>
      <Part part={course.parts[1]}/>
      <Part part={course.parts[2]}/>
      <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />
    </div>
  )
}

export default App