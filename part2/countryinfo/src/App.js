import {useState,useEffect} from 'react'
import axios from 'axios'
import CountryInfo from './Components/CountryInfo';



function App() {

  const [allCountryData,setAllCountryData] = useState([]);
  const [filteredResult,setFilteredResult] = useState([]);
  const [input,setInput] = useState("")
  const [showresult,setShowResult] = useState(false);



  const searchCountry=(searchTerm)=>{
      let searchResult =  [...allCountryData].filter((c)=>{
        return c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setFilteredResult(searchResult)
      if(searchResult.length===1){
        setShowResult(true)
      }
      else{
        setShowResult(false)
      }
  }

  const handleInput = (e)=>{
    let search = e.target.value
    setInput(search)
    if(search){
      searchCountry(search)
    }
    else{
      setFilteredResult([])
    }
  }

  useEffect(()=>{
    axios.get("https://restcountries.com/v3.1/all")
    .then((response)=>{
      setAllCountryData(response.data)
    })
  },[])



  return (
    <div>
      find countries <input type="text" value={input} onChange={(e)=>handleInput(e)} ></input>
      <br></br>
      {
        (filteredResult.length >10 && input && !showresult) ?`Too many matches, specify another filter`: filteredResult.map((country,i)=><p key={i}>{country.name.common}</p>)
      }
      {
        showresult && <CountryInfo country={filteredResult[0]} /> 
      }

    </div>
  );
}

export default App;
