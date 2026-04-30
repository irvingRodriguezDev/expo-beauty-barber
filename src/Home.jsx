import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import TicketView from "./components/Pages/TicketDetail";
import App from "./App";
import ScannerView from "./components/Pages/ScannerView";
import SuccessPage from "./components/Pages/SuccessPage";
import MyTickets from "./components/Pages/MyTickets";
import ErrorPage from "./components/Pages/ErrorPage";
import NotFound from "./components/Pages/NotFound";

function Home() {
  return (
    <Router>
      <Routes>
        {/* Redirección inicial: de "/" a la base del evento */}
        <Route
          path='/'
          element={<Navigate to='/convencion-wtc-mexico' replace />}
        />

        {/* Grupo de rutas con la misma base */}
        <Route path='/convencion-wtc-mexico'>
          {/* Esta es la ruta index (la raíz del grupo) */}
          <Route index element={<App />} />

          {/* Las sub-rutas se vuelven relativas a la base */}
          {/* URL resultante: /convencion-wtc-mexico/mis-boletos */}
          <Route path='mis-boletos' element={<MyTickets />} />

          {/* URL resultante: /convencion-wtc-mexico/payment-success */}
          <Route path='payment-success' element={<SuccessPage />} />
          <Route path='payment-error' element={<ErrorPage />} />

          {/* URL resultante: /convencion-wtc-mexico/ticket/:code */}
          <Route path='ticket/:code' element={<TicketView />} />

          {/* URL resultante: /convencion-wtc-mexico/admin/check-in */}
          <Route path='admin/check-in' element={<ScannerView />} />
        </Route>

        {/* Ruta 404 general */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default Home;
