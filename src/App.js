import { useState } from 'react';
import './App.css';
import City from './components/City'
import ZipSearchField from './components/ZipSearchField'

function App() {
  const [zipCode, setZipCode] = useState('');
  const [cities, setCities] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <div className="col-4 justify-content-center">
          <h2>Zip Code Search</h2>
        </div>
      </header >

        <div className="row justify-content-center results">
          <div className="col-4">
            <ZipSearchField zipChanged={'Zip'} />
            { cities }
          </div>
        </div>
    </div >
  );
}

export default App;
