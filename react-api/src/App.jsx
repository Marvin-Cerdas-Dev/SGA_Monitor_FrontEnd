import React, { Suspense, useEffect } from "react";
import { fetchData } from "./fetchData";
import "./App.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const apiData = fetchData("http://127.0.0.1:5000/traffic-memory-state");
const apiDataEvent = fetchData("http://127.0.0.1:5000/event_info");

function App() {
  const data = apiData.read();
  const edata = apiDataEvent.read();

  useEffect(() => {
    // Establecer un intervalo para recargar la página cada minuto (60,000 milisegundos)
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 60000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez al montar el componente

  // Transforma 'data' para que tenga una propiedad 'name' igual a 'date'
  const lastTenData = data.slice(-25); // Obtén los últimos 10 elementos de 'data'

  const chartData = lastTenData.map((item) => ({
    ...item,
    name: item.date.split(',')[1].trim().substring(0, 17),
    SGA: parseFloat(item.memory_percentage), // Convertir a número
    Limite: 85, // Valor fijo
  }));
  

  return (
    <div className="App">
      {/* Add the title for the chart */}
      <h1>Gráfica de SGA</h1>

      {/* Add the line chart */}
      <LineChart width={1100} height={300} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 100]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="SGA" stroke="Green" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="Limite" stroke="red" />
      </LineChart>

      <h1>Eventos que Exceden el Límite de Memoria</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <table className="table">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>% Memoria Utilizada</th>
              <th>Usuario</th>
              <th>SQL</th>
            </tr>
          </thead>
          <tbody>
            {edata?.map((item) => (
              <tr key={item.eventId}>
                <td>{item.event_date}</td>
                <td>{item.memory_percentage}%</td>
                <td>{item.user_name}</td>
                <td>{item.user_query}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Suspense>
    </div>
  );
}

export default App;