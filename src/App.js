import React from 'react';
import { useState } from 'react';

function App() {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [weatherForecast, setWeatherForecast] = useState(null);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearch = () => {
    setLoading(true);
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_API_KEY}&q=${city}&days=5&lang=pt`
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data);
        setWeatherForecast(data);
        setLoading(false);
      });
  };

  return (
    <div>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark mb-4 px-3">
        <a href="#top" className="navbar-brand text-white">
          Previsão do Tempo Hoje
        </a>
      </nav>

      <main className="container">
        <div className="p-5 mb-4 bg-light rounded-3">
          <h1>Verifique agora a previsão do tempo da sua cidade!</h1>
          <p className="lead">
            Digite o nome da sua cidade no campo abaixo e em seguida clique em
            pesquisar.
          </p>
          <div className="row mb-4">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                onChange={handleChange}
                value={city}
              />
            </div>
          </div>
          <button className="btn btn-primary btn-lg" onClick={handleSearch}>
            Pesquisar
          </button>
        </div>

        {loading ? (
          <div>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif?20170503175831"
              alt="loading"
              width="50"
            />
          </div>
        ) : (
          <div>
            {weatherForecast ? (
              <div>
                <div className="container-sm d-flex justify-content-center">
                  <div className="card mb-4">
                    <img
                      src={weatherForecast.current.condition.icon}
                      alt={weatherForecast.current.condition.text}
                    />
                    <div className="card-body">
                      <h5 className="card-title">
                        A previsão para {weatherForecast.location.name} agora é
                        de {weatherForecast.current.condition.text}
                      </h5>
                      <p className="card-text">
                        Cidade situada no {weatherForecast.location.country} na
                        região de {weatherForecast.location.region}.
                      </p>
                    </div>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Temperatura: {weatherForecast.current.temp_c}
                        <code>&deg;</code>C
                      </li>
                      <li className="list-group-item">
                        Sensação térmica: {weatherForecast.current.feelslike_c}
                        <code>&deg;</code>C
                      </li>
                      <li className="list-group-item">
                        Umidade: {weatherForecast.current.humidity}%
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="mt-4">
                  <h2>Previsão para os próximos dias:</h2>
                </div>
                <div className="card-group my-4">
                  {weatherForecast.forecast.forecastday
                    .filter((forecast, index) => index !== 0)
                    .map((forecast, index) => (
                      <div className="card" key={index}>
                        <img
                          src={forecast.day.condition.icon}
                          className="card-img-top"
                          alt={forecast.day.condition.text}
                        />
                        <div className="card-body">
                          <h5 className="card-title">
                            Previsão para o dia{' '}
                            {forecast.date.split('-').reverse().join('/')} é de{' '}
                            {forecast.day.condition.text}
                          </h5>
                          <p className="card-text">
                            <span>
                              <strong>Nascer do Sol:</strong>{' '}
                              {forecast.astro.sunrise}
                            </span>
                            <br />
                            <span>
                              <strong>Pôr do Sol:</strong>{' '}
                              {forecast.astro.sunset}
                            </span>
                            <br />
                            <span>
                              <strong>Chance de chuva:</strong>{' '}
                              {forecast.astro.daily_chance_of_rain
                                ? 'Sim'
                                : 'Não'}
                            </span>
                          </p>
                        </div>
                        <ul className="list-group list-group-flush">
                          <li className="list-group-item">
                            Temperatura máxima: {forecast.day.maxtemp_c}
                            <code>&deg;</code>C
                          </li>
                          <li className="list-group-item">
                            Temperatura mínima: {forecast.day.mintemp_c}
                            <code>&deg;</code>C
                          </li>
                          <li className="list-group-item">
                            Umidade: {forecast.day.avghumidity}%
                          </li>
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            ) : null}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
