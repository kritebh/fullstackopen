import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number:'040-123456' }
  ]) 
  const [newName, setNewName] = useState('')
  const [number,setNumber] = useState('')

  const formHandler = (e)=>{
    e.preventDefault()
    let allPersons = [...persons]
    let isPresent = false;
    allPersons.forEach((p)=>{
      if(p.name===newName){
        isPresent = true
        alert(`${newName} is already added to phonebook`)
      }
    })

    if(isPresent){
      return
    }
    setPersons([...persons,{name:newName,number:number}])
    setNewName("")
    setNumber("")
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={(e)=>formHandler(e)}>
        <div>
          name: <input value={newName} onChange={(e)=>setNewName(e.target.value)} />
        </div>
        <div>
          number: <input value={number} onChange={(e)=>setNumber(e.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {
        persons.map((person,i)=>{
          return <p key={i}>{person.name} {person.number}</p>
        })
      }
    </div>
  )
}

export default App