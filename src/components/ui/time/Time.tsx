 "use client"

import { useMemo, useState, useEffect } from 'react';


export const DateTimeComponent = () => {
    const [currentTime, setCurrentTime] = useState(new Date());
    const [city, setCity] = useState(''); // Add a state for the city
  
    useEffect(() => {
      // Get the user's location using the geolocation API
      navigator.geolocation.getCurrentPosition(position => {
        const apiUrl = `https://reverse.geocoder.ls.hereapi.com/6.2/reversegeocode.json?apiKey=AIzaSyD4QGWFoVWBeDgGpd95DsAwDjeRTAQFyuo&mode=retrieveAddresses&prox=${position.coords.latitude},${position.coords.longitude}`;
        fetch(apiUrl)
          .then(response => response.json())
          .then(data => {
            const address = data.Response.View[0].Result[0].Location.Address;
            setCity(address.City); // Update the city state
          })
          .catch(error => console.error(error));
      });
    }, [city]); // Add city to the dependency array
  
    const formattedTime = useMemo(() => {
      const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const month = monthNames[currentTime.getMonth()];
      const day = currentTime.getDate();
      const year = currentTime.getFullYear();
      return `${month} ${day}, ${year} ${currentTime.toLocaleTimeString()}`;
    }, [currentTime]);
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);
      return () => clearInterval(intervalId);
    }, []);
  
    return (
      <div>
        <h1>{formattedTime}  {city}</h1>
      </div>
    );
  };
  
  