import {useState,useEffect} from 'react'
import axios from 'axios'
import CountryInfo from './Components/CountryInfo';
import ShowResult from './Components/ShowResult';


function App() {

  const [allCountryData,setAllCountryData] = useState([]);
  const [filteredResult,setFilteredResult] = useState([]);
  const [input,setInput] = useState("")
  const [showresult,setShowResult] = useState({show:false,countryInfo:{}});
  const [weatherInfo,setWeatherInfo] = useState({});



  const searchCountry=(searchTerm)=>{
      let searchResult =  [...allCountryData].filter((c)=>{
        return c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      })
      return searchResult
    }
    
    const handleInput = (e)=>{
      let search = e.target.value
      setInput(search)
      if(search){
        let searchResult = searchCountry(search)
        setFilteredResult(searchResult)
        if(searchResult.length===1){
          getWeatherInfo(searchResult[0])
          .then(data=>{
            setWeatherInfo({...data,capital:searchResult[0].capital[0]})
            setShowResult({...showresult,show:true,countryInfo:searchResult[0]})
          })
        }else{
          setShowResult({...showresult,show:false,countryInfo:[]})
        }
    }
    else{
      setFilteredResult([])
    }
  }

  const getWeatherInfo = (countryInfo)=>{
      let lat = countryInfo.capitalInfo.latlng[0] 
      let lon = countryInfo.capitalInfo.latlng[1] 
      const request = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_API_KEY}&units=metric`)
      return request.then(response=>response.data)
  }

  const onClickHandler = (countryInfo)=>{
    getWeatherInfo(countryInfo)
    .then(data=>{
      setWeatherInfo({...data,capital:countryInfo.capital[0]})
      setShowResult({...showresult,show:true,countryInfo:countryInfo})
    })
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
        (filteredResult.length >10 && input && !showresult.show) ?`Too many matches, specify another filter`
        : filteredResult.map((country,i)=>
        {
         return <div key={i}> { filteredResult.length >1 && <ShowResult  country={country} onClickHandler={onClickHandler}/>} </div> 
        })
      }
      {
        showresult.show && <CountryInfo country={showresult.countryInfo} weatherInfo={weatherInfo} /> 
      }

    </div>
  );
}

export default App;
