const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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
      <Header course={course} />
      <Part part={parts[0]}/>
      <Part part={parts[1]}/>
      <Part part={parts[2]}/>
      <Total exercises1={parts[0].exercises} exercises2={parts[1].exercises} exercises3={parts[2].exercises} />
    </div>
  )
}

export default App