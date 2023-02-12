import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number:'040-123456' },
  ]) 
  const [newName, setNewName] = useState('')
  const [number,setNumber] = useState('')
  const [search,setSearch] = useState('')
  const [filterPersons,setFilterPersons] = useState([])

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

  const searchHandler = (e)=>{
    let currInput = e.target.value
    setSearch(currInput)
    
    let allPersons = [...persons]
    
    let filterResult =  allPersons.filter((p)=>{
      return p.name.toLowerCase().includes(currInput.toLowerCase())
    })

    setFilterPersons(filterResult)
    

  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input type='text' value={search} onChange={(e)=>searchHandler(e)} ></input>
      </div>
      <h2>add a new</h2>
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
        search && filterPersons.map((person,i)=>{
          return <p key={i}>{person.name} {person.number}</p>
        })
      }
      {
        !search && persons.map((person,i)=>{
          return <p key={i}>{person.name} {person.number}</p>
        })
      }
    </div>
  )
}

export default App