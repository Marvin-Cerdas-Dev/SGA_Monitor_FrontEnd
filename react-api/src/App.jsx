import React, { Suspense, useEffect } from "react";
import { fetchData } from "./fetchData";
import "./App.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { BarChart, Bar} from "recharts";

const apiData = fetchData("http://127.0.0.1:5000/traffic-memory-state");
const apiDataEvent = fetchData("http://127.0.0.1:5000/event_info");
const apiDataLogs = fetchData("http://127.0.0.1:5000/tablespaces_volumetria");

function TrafficLight({ percentage }) {
  let colorClass = "";
  let genericClass = "trafficLight-gris";
  let list = [];

  if (percentage <= 50) {
    colorClass = "trafficLight-green";
    list.push(<span key="generic1" className={genericClass}></span>);
    list.push(<span key="generic2" className={genericClass}></span>);
    list.push(<span key="color" className={colorClass}></span>);
  } else if (percentage <= 85) {
    colorClass = "trafficLight-yellow";
    list.push(<span key="generic1" className={genericClass}></span>);
    list.push(<span key="color" className={colorClass}></span>);
    list.push(<span key="generic2" className={genericClass}></span>);
  } else {
    colorClass = "trafficLight-red";
    list.push(<span key="color" className={colorClass}></span>);
    list.push(<span key="generic1" className={genericClass}></span>);
    list.push(<span key="generic2" className={genericClass}></span>);
  }

  return <>{list}</>; 
}

function App() {
  const data = apiData.read();
  const edata = apiDataEvent.read();
  const logdata = apiDataLogs.read();

  useEffect(() => {
    // Establecer un intervalo para recargar la página cada minuto (60,000 milisegundos)
    const intervalId = setInterval(() => {
      window.location.reload();
    }, 60000);

    // Limpia el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, []); // El segundo argumento [] asegura que el efecto se ejecute solo una vez al montar el componente

  // Transforma 'data' para que tenga una propiedad 'name' igual a 'date'
  const lastTenData = data.slice(-20); // Obtén los últimos 10 elementos de 'data'
  const lastDataTl  = data.slice(-1); // Obtine el último dato 

  const porcentajeActual = lastDataTl?.map((item) => (item.memory_percentage));
    
  const chartData = lastTenData.map((item) => ({
    ...item,
    name: item.date.split(',')[1].trim().substring(0, 17),
    SGA: parseFloat(item.memory_percentage), // Convertir a número
    Limite: 85, // Valor fijo
  }));
  
  const barData = logdata.map((item) => ({
    ...item,
    name: item.tablespace_name,
    mb_usada:item.mb_used,
    mb_libre:item.mb_free,
    mb_hwr:item.hwr_mb,
    mb_total:item.mb_size - item.mb_used,
  }));

  return (
    <div className="App">
      {/* Add the title for the chart */}
      <h1>Gráfica de SGA</h1>
      {/* Add the line chart */}
      <div class="container">
        <div class="box">
          <div class="box-row">

            <div class="box-cell box1">
              <LineChart width={900} height={300} data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="SGA" stroke="Green" activeDot={{ r: 8 }} />
              <Line type="monotone" dataKey="Limite" stroke="red" />
              </LineChart>                    
            </div>
            <div class="box-cell box2">
              <div class="trafficLight">
              <TrafficLight percentage={porcentajeActual} />
              </div>
              {lastDataTl?.map((item) => (
              <tr key={item.eventId}>
                <td>{item.memory_percentage}%</td>
              </tr>
            ))}      
            </div>
          </div>
        </div>
      </div>

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
                <td class="table-date">{item.event_date}</td>
                <td>{item.memory_percentage}%</td>
                <td>{item.user_name}</td>
                <td>{item.user_query}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Suspense>
      <h1>Eventos de Tablespace de Memoria </h1>
      <div class="box-cell box1">
              <BarChart width={900} height={300} data={barData}  margin={{top: 20,right: 30,left: 20,bottom: 5}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis/>
              <Tooltip />
              <Legend />
              <Bar dataKey="mb_usada" stackId="a" fill="#338AFF" />
              <Bar dataKey="mb_libre" stackId="a" fill="#33FF74" />
              <Bar dataKey="mb_hwr" stackId="a" fill="#FF3633" />
              <Bar dataKey="mb_total" stackId="a" fill="#000000" />
              </BarChart>                    
            </div>
    </div>
  );
}

export default App;