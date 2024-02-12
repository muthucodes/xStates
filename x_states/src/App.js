import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [countries, setCountries] = useState(null);
  const [states, setStates] = useState(null);
  const [cities, setCities] = useState(null);

  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);

  const changeHandler = (e) => {
    console.log(e.target.name, "selected");
    if (e.target.name === "countries" && e.target.value !== "placeholder") {
      setCountry(e.target.value);
    }
    if (e.target.name === "states" && e.target.value !== "placeholder") {
      setState(e.target.value);
      
    }
    if (e.target.name === "cities" && e.target.value !== "placeholder") {
      setCity(e.target.value);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch(
          "https://crio-location-selector.onrender.com/countries"
        );
        const data = await response.json();
        // console.log(data);
        console.log("countries fetched");
        setCountries(data);
      } catch (error) {
        console.log(error);
      }
    };
  
    fetchCountries();
  }, [])
  
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${country}/states`
        );
        const data = await response.json();
        // console.log(data);
        console.log("states fetched");
        setStates(data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchCities = async () => {
      try {
        const response = await fetch(
          `https://crio-location-selector.onrender.com/country=${country}/state=${state}/cities`
        );
        const data = await response.json();
        // console.log(data);
        console.log("cities fetched");
        setCities(data);
      } catch (error) {
        console.log(error);
      }
    };
    
    if(country){
      fetchStates();

    }
    if(state){

      fetchCities();
    }
   
  }, [country, state, city]);

  return (
    <div className="App">
      <h1>Select Location</h1>
      <div className="menu">
        <select
          defaultValue={"placeholder"}
          className="dropdown country"
          name="countries"
          id="countries"
          onChange={(e) => {
            changeHandler(e);
          }}
        >
          <option value={"placeholder"}>Select Country</option>
          {countries &&
            countries.map((country) => (
              <option value={country}>{country}</option>
            ))}
        </select>
        <select
          disabled={!country}
          defaultValue={"placeholder"}
          className="dropdown state"
          name="states"
          id="states"
          onChange={(e) => {
            changeHandler(e);
          }}
        >
          <option value={"placeholder"}>Select State</option>
          {states &&
            states.map((state) => <option value={state}>{state}</option>)}
        </select>
        <select
          disabled={!state}
          defaultValue={"placeholder"}
          className="dropdown city"
          name="cities"
          id="cities"
          onChange={(e) => {
            changeHandler(e);
          }}
        >
          <option value={"placeholder"}>Select City</option>
          {cities && cities.map((city) => <option value={city}>{city}</option>)}
        </select>
      </div>
      {city && <p>You selected {city}, {state}, {country}</p>}
    </div>
  );
}

export default App;
