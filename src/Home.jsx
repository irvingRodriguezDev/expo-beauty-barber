import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import TicketView from "./components/Pages/TicketDetail";
import App from "./App";
import ScannerView from "./components/Pages/ScannerView";
import SuccessPage from "./components/Pages/SuccessPage";
import MyTickets from "./components/Pages/MyTickets";
import ErrorPage from "./components/Pages/ErrorPage";
import NotFound from "./components/Pages/NotFound";
import SoldOutEvent from "./components/Pages/SoldOutPage";
import ComingSoon from "./components/Pages/CommingSoon";
import AdminCreateEvent from "./components/Pages/AdminCreateEvent";
import EventDetai from "./components/Pages/EventDetail";

function Home() {
  return (
    <Router>
      <Routes>
        {/* Grupo de rutas principal */}
        <Route path='/'>
          {/* URL: / (Página de inicio) */}
          <Route index element={<App />} />

          {/* URL: /evento/nombre-del-evento (Ignora el ?fbclid= automáticamente) */}
          <Route path='evento/:slug' element={<EventDetai />} />

          {/* URLs de usuario */}
          <Route path='mis-boletos' element={<MyTickets />} />
          <Route path='payment-success' element={<SuccessPage />} />
          <Route path='payment-error' element={<ErrorPage />} />
          <Route path='ticket/:code' element={<TicketView />} />

          {/* URLs de administración */}
          <Route path='admin/check-in' element={<ScannerView />} />
          <Route path='admin/create-event' element={<AdminCreateEvent />} />
        </Route>

        {/* Ruta 404 general para cualquier URL no registrada */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default Home;
