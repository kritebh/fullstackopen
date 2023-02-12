import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const formHandler = (e)=>{
    e.preventDefault()
    let allPersons = [...persons]
    let isPresent = false;
    allPersons.forEach((p)=>{
      if(p.name===newName){
        isPresent = true
        alert(`${newName} is already to phonebook`)
      }
    })

    if(isPresent){
      return
    }
    setPersons([...persons,{name:newName}])
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(e)=>formHandler(e)}>
        <div>
          name: <input value={newName} onChange={(e)=>setNewName(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person,i)=>{
          return <p key={i}>{person.name}</p>
        })
      }
    </div>
  )
}

export default App