import {useState} from 'react';
import axios from 'axios';


function Weather() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  const apiKey= process.env.REACT_APP_API_KEY;

  const handleInput = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  }

  async function handleSearch(e) {
    let response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&appid=${apiKey}`);
    setData(response.data);
    console.log(response.data);
  }

  return(
    <div className='weather-container'>
      <div className='weather'>
        <input 
          value={query} 
          onChange={handleInput} 
          placeholder={"Dublin"}
        />
      </div>
      <div className='weather'>
        <button onClick={handleSearch} >
            Enter city    
        </button>
      </div>

      {data.main? (
        <div className='response'>
          <div>
            {data.name}
          </div>
          <div>
            {(data.main.temp.toFixed(0))}&deg; C
          </div>
          <div>
            <img
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt="weather status icon"
            />
          </div>
          <div>
            {data.weather[0].description}
          </div>
        </div>
        ) 
        : (
          <div className='noData'>
            { '...' }
          </div>
        )
      }  




    </div>
  )
}

export default Weather;