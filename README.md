# 📊 SGA Monitor - Frontend

Welcome to the **SGA Monitor Frontend**, a web application designed to visualize and monitor the **System Global Area (SGA)** performance metrics in real-time. This frontend provides an intuitive interface for database administrators to track memory usage, tablespace status, and critical system events.

---

## 📋 Table of Contents
1. [Project Overview](#-project-overview)
2. [Requirements](#-requirements)
3. [Installation](#-installation)
4. [Project Structure](#-project-structure)
5. [Features and Functionalities](#-features-and-functionalities)
6. [Running the Application](#-running-the-application)

---

## 🖥️ Project Overview
The frontend of **SGA Monitor** provides a comprehensive monitoring solution with a unique memory status semaphore:
- 🟢 Green: Memory usage is relatively low
- 🟠 Orange: Memory usage is moderate
- 🔴 Red: Memory usage is near capacity

Built with modern web technologies to deliver real-time database performance insights.

## 🔧 Requirements
- **Node.js 16+**
- **React 18+**
- **npm** or **yarn**
- Modern web browser
- Backend SGA Monitor API

## 📦 Technologies
- React.js
- Axios for API communication
- Chart.js or Recharts for data visualization
- React Router for navigation
- Tailwind CSS or Bootstrap for styling

## ⚙️ Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Marvin-Cerdas-Dev/SGA_Monitor_FrontEnd.git
   cd SGA_Monitor_FrontEnd
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Configure the application:
   ```bash
   # Create .env file in the project root
   REACT_APP_API_URL=http://localhost:5000
   ```

## 📁 Project Structure
```
SGA_Monitor_FrontEnd/
├── react-api/
|   ├── public/
|   |    └── vite.svg
|   ├── src/
|   |  └── assets/
│   |  |    └── react.svg
│   |  ├── App.css
│   |  ├── App.jsx
│   |  ├── fetchData.js
│   |  ├── index.css
│   |  ├── main.jsx
│   |  └── useFetch.js
|   ├── index.html
|   ├── package-lock.json
|   ├── package.json
|   └── vite.config.js
└── README.md
```

## 🌐 Features and Functionalities
- **Memory Status Semaphore**
  - Visual indicator of memory usage levels
  - Color-coded system (Green/Orange/Red)

- **SGA Memory Dashboard**
  - Real-time memory usage visualization
  - Percentage and absolute memory consumption charts

- **Event Monitoring**
  - Critical memory-related event tracking
  - Alerts for unusual memory consumption patterns

## 🚀 Running the Application
1. Ensure backend API is running
2. Start development server:
   ```bash
   npm start
   # or
   yarn start
   ```
3. Access at `http://localhost:3000`

## 🔗 Backend Integration
- Connects to SGA Monitor Backend
- Key API Endpoints:
  - `/traffic-memory-state`
  - `/event_info`
  - `/tablespaces_volumetria`

## 🛠️ Production Build
```bash
npm run build
# or
yarn build
```

## 📜 License
This project is licensed under the [MIT License.](LICENSE)

## 🤝 Contact
Marvin Cerdas - [GitHub Profile](https://github.com/Marvin-Cerdas-Dev)
