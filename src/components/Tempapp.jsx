import React, { useEffect, useState } from "react";
import "./css/style.css";
import day from '../assets/day.jpg';
import night from '../assets/night.png';

export default function Tempapp() {
  const [search, setSearch] = useState("dhaka");
  const [city, setCity] = useState(null);
  const [msg, setMsg] = useState({
    color: '#333'
  })
  const [bg, setBg] = useState({
    background: `linear-gradient(45deg, #c29d4e, transparent)`
  })
  const [weather, setWeather] = useState({
    backgroundImage: `url(${day})`,
    color: '#fff'
  })
  const [wave, setWave] = useState({
    opacity: 1,
    filter: `sepia(1)`
  })

  
  const boxweather = () => {
    
    let time = new Date().getHours();
    if(time < 9){
      setWeather({
        backgroundImage: `url(${night})`,
        color: '#fff'
      })
      setBg({
        background: `linear-gradient(45deg, #05162f, #040811)`
      })
      setMsg({
        color: '#fff'
      })
      setWave({
        opacity: 0.4,
        filter: `brightness(0) invert(1)`
      })
    }
  };



  useEffect(() => {
    const fetchApi = async () => {
      const api = `d75193467ad6e1e7f744639b81f9c816`;
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${api}&units=metric`;
      const response = await fetch(url);
      const resJson = await response.json();
      setCity(resJson.main);
    };

  boxweather();

    fetchApi();
  }, [search],0);

  return (
    <div className="tempapp_area" style={bg}>
      <div className="container">
        <div className="tempapp-wrapper">
          <div className="box" style={weather} >
            {/* search bar  */}
            <input
              type="search"
              name="search"
              value={search}
              autoComplete="off"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
            />

            {!city ? (
              <div className="no_data">
                <p className="error" style={msg}>data not found </p>
              </div>
            ) : (
              <>
                {/* temp info  */}
                <div className="temp_info">
                  <div className="city_name">
                    <i className="fa-solid fa-street-view"></i>
                    <h1>{search}</h1>
                  </div>
                  <div className="city_meta">
                    <h1>{city.temp}°C</h1>
                    <span>Min: {city.temp_min}°C | Max: {city.temp_max}°C</span>
                  </div>
                </div>

                {/* wave animation  */}
                <div className="ocean" style={wave}>
                  <div className="wave"></div>
                  <div className="wave"></div>
                  <div className="wave"></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
