import { Cloud, CloudRain, Sun, Wind, Droplets } from "lucide-react";
import { useState } from "react";
import "spoilerjs/spoiler-span";

export const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("");

  const getWeather = async () => {
    if (!city.trim()) return;

    setLoading(true);

    try {
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=es`
      );
      const geoData = await geoRes.json();

      if (!geoData.results || geoData.results.length === 0) {
        alert("Ciudad no encontrada");
        setLoading(false);
        return;
      }

      const { latitude, longitude, name } = geoData.results[0];

      // Obtener clima
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`
      );
      const weatherData = await weatherRes.json();

      setWeather({
        city: name,
        temp: Math.round(weatherData.current.temperature_2m),
        humidity: weatherData.current.relative_humidity_2m,
        wind: weatherData.current.wind_speed_10m,
        code: weatherData.current.weather_code,
      });
    } catch (error) {
      alert("Error al obtener el clima " + error);
    }

    setLoading(false);
  };
  const getIcon = (code) => {
    if (code === 0) return <Sun className="w-24 h-24 text-yellow-300" />;
    if (code <= 3) return <Cloud className="w-24 h-24 text-gray-300" />;
    return <CloudRain className="w-24 h-24 text-blue-300" />;
  };

  const getDescription = (code) => {
    if (code === 0) return "Despejado";
    if (code <= 3) return "Nublado";
    return "Lluvia";
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            <spoiler-span> Clima Ecuador</spoiler-span> 🌤️ 
          </h1>
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && getWeather()}
              placeholder="Escribe una ciudad..."
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
            <button
              onClick={getWeather}
              disabled={loading}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
            >
              {loading ? "cargando..." : "Buscar"}
            </button>
          </div>

          {weather && (
            <div className="text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                {weather.city}
              </h2>

              <div className="flex justify-center mb-4">
                {getIcon(weather.code)}
              </div>

              <div className="text-6xl font-bold text-gray-800 mb-2">
                <spoiler-span>{weather.temp}°C</spoiler-span>
              </div>

              <div className="text-xl text-gray-600 mb-6">
                {getDescription(weather.code)}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 rounded-lg p-4">
                  <Wind className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm text-gray-600">Viento</div>
                  <div className="text-lg font-semibold">
                    {weather.wind} km/h
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg p-4">
                  <Droplets className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <div className="text-sm text-gray-600">Humedad</div>
                  <div className="text-lg font-semibold">
                    {weather.humidity}%
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
