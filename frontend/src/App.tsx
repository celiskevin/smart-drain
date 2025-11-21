import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import Layout from "./components/Layout";
import Dashboard from "./components/Dashboard"; //Importacion implicita no tiene {} //! CON { } es una importacion explicita 
import MaintenceHistory from "./components/MaintenceHistory";
import IncidenceHistory from "./components/IncidenceHistory";
import MaintenancesForm from "./components/MaintenancesForm";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/historial-mantenimientos" element={<MaintenceHistory />} />
          <Route path="/historial-incidencias" element={<IncidenceHistory />} />
          <Route path="/nuevo-mantenimiento" element={<MaintenancesForm />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App;