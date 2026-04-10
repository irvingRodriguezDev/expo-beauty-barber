import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TicketView from "./components/Pages/TicketDetail"; // El componente que creamos antes
import App from "./App"; // Tu página de registro actual
import ScannerView from "./components/Pages/ScannerView";
import SuccessPage from "./components/Pages/SuccessPage";

function Home() {
  return (
    <Router>
      <Routes>
        {/* Ruta para el formulario de registro y pago */}
        <Route path='/' element={<App />} />
        <Route path='/payment-success' element={<SuccessPage />} />
        {/* Ruta dinámica para el boleto digital */}
        <Route path='/ticket/:code' element={<TicketView />} />
        {/* Ruta para realizar el check-in del boleto */}
        <Route path='/admin/check-in' element={<ScannerView />} />
        {/* Opcional: Ruta 404 */}
        <Route path='*' element={<div>Página no encontrada</div>} />
      </Routes>
    </Router>
  );
}

export default Home;
