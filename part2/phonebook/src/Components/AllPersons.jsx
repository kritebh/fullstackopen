import React from 'react'
import ShowPersonDetails from "./ShowPersonDetails"

function AllPersons({persons}) {
  return (
    <div>
        {
            persons.map((person,i)=>{
                return <ShowPersonDetails key={i} name={person.name} number={person.number} />
            })
        }
    </div>
  )
}

export default AllPersons