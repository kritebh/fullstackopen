import { useState } from 'react'
import Header from './Components/Header'
import Search from './Components/Search'
import AddContact from './Components/AddContact'
import AllPersons from './Components/AllPersons'

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
      <Header title="Phonebook" />
      <Search search={search} searchHandler={searchHandler} />
      <Header title="add a new" />
      <AddContact formHandler = {formHandler} newName={newName} setNewName={setNewName} number={number} setNumber={setNumber} />
      <Header title="Numbers" />
      {
        search && <AllPersons persons={filterPersons}/>
      }
      {
        !search && <AllPersons persons={persons} />
      }
    </div>
  )
}

export default App