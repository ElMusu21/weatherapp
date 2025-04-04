import { useState } from 'react'
import './WeatherApp.css'

export const WeatherApp = () => {

    const urlBase = 'https://api.openweathermap.org/data/2.5/weather'
    const API_KEY = '41446912e573d492f478abbd03ddded5'
    const difKelvin = 273.15 // restar grados kelvin menos diffKelvin para obtener temp en grados C
  
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    const [error, setError] = useState(null)

    const fetchWeather = async () => {
        try {
            const res = await fetch(`${urlBase}?q=${city}&appid=${API_KEY}&lang=es`)
            const data = await res.json()

            // Comprobamos si la API devolvió un error
            if (data.cod !== 200) {
                setError('Ciudad no encontrada. Intenta con otra.')
                setWeatherData(null)
            } else {
                setWeatherData(data)
                setError(null) // Reseteamos el error si la ciudad es válida
                console.log(data)
            }
        } catch (error) {
            console.error('Ha habido un error', error)
            setError('Ha ocurrido un error al obtener los datos del clima.')
        }
    }

    const handleCityChange = (event) => {
        setCity(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setError(null) // Limpiamos cualquier error previo
        fetchWeather()
    }

    return (
        <div className="container">
            <h1>Aplicación de Clima</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Ingresa una Ciudad"
                    value={city}
                    onChange={handleCityChange}
                />
                <button type="submit">Buscar</button>
            </form>

            {error && <p>{error}</p>}

            {weatherData && !error && 
                <div>
                    <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                    <p>La temperatura actual es: {Math.floor(weatherData.main.temp - difKelvin)} °C.</p>
                    <p>{weatherData.weather[0].description}</p>
                    <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
                </div>
            }
        </div>
    )
}