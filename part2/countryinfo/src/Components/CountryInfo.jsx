import React from 'react'

function CountryInfo({country}) {
  return (
    <div>
        <h2>{country.name.common}</h2>
        <p>Capital - {country.capital.map((cap,i)=> {return <span key={i}>{`${cap} `}</span> })}</p>
        <p>area - {country.area}</p>
        <h3>languages</h3>
        <ul>
            {
                Object.keys(country.languages).map((key,i)=>{
                    return <li key={i}> {country.languages[key]} </li>
                })
            }
        </ul>
        <img src={country.flags.png} alt='flag' />
    </div>
  )
}

export default CountryInfo