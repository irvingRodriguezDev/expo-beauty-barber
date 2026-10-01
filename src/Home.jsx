import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import App from "./App";
import SuccessPage from "./Pages/SuccessPage";
import MyTickets from "./Pages/MyTickets";
import ErrorPage from "./Pages/ErrorPage";
import NotFound from "./Pages/NotFound";
import ComingSoon from "./Pages/CommingSoon";
import EventDetai from "./Pages/EventDetail";
import TicketView from "./Pages/TicketDetail";
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
        </Route>

        {/* Ruta 404 general para cualquier URL no registrada */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default Home;
