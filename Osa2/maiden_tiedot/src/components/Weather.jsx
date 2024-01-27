
const Weather = ({country, weather}) => {
    console.log(country.latlng)

    if(weather){
        console.log("weather exists")
    } else{
        console.log("No weather yet")
    }


    return (
        <>
         <h2>Weather in {weather.name}</h2>
         {weather ?<> <p>Temparature {weather.main["temp"]} Celsius </p>
         <p>Wind {weather.wind["speed"]} m/s </p> </>
          : null }
        </>
    )
}

export default Weather