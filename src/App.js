import { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import City from './components/City'
import ZipSearchField from './components/ZipSearchField'

function App() {
  const [zipCode, setZipCode] = useState('');
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const handleSearch = async () => {
      if (zipCode === '') return; //deals with the inital load so we don't call API
  
      let linkToAPI = 'http://ctp-zip-api.herokuapp.com/zip/' + zipCode;
  
      try {
        let response = await axios.get(linkToAPI);
        setCities(response.data);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data); //Not Found
          console.log(error.response.status); //404
        }
      }
    }
    handleSearch();
  }, [zipCode])

  const zipHandler = (e) => {
    // checking to see if there are 5 digits
    if (e.target.value.length !== 5) {
      setZipCode('');
      setCities([]);
      return; 
    }

    // checking to see if everything is a number
    const nums = /^[0-9]+$/;
    if (!e.target.value.match(nums)) {
      setZipCode('');
      setCities([]);
      return;
    }

    setZipCode(e.target.value);
  }

  const generateCities = () => {
    if (cities.length === 0) {
      return "No Results";
    }
    else {
      return cities.map(city => {
        return <City key={city.RecordNumber} City={city.City} State={city.State} Lat={city.Lat} Long={city.Long} EstimatedPopulation={city.EstimatedPopulation} TotalWages={city.TotalWages}/>
      });
    }
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="col-4 justify-content-center container">
          <h2>Zip Code Search</h2>
        </div>
      </header >

      <div className="row justify-content-center results">
        <div className="col-4">
          <ZipSearchField zipChanged={zipHandler} />
          { generateCities() }
        </div>
      </div>
    </div >
  );
}

export default App;
