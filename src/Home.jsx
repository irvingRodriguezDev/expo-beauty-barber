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
import SoldOutEvent from "./components/Pages/SoldOutPage";
import ComingSoon from "./components/Pages/CommingSoon";
import AdminCreateEvent from "./components/Pages/AdminCreateEvent";
import EventDetai from "./components/Pages/EventDetail";

function Home() {
  return (
    <Router>
      <Routes>
        {/* Redirección inicial: de "/" a la base del evento */}
        <Route path='/' element={<Navigate to='/' replace />} />

        {/* Grupo de rutas con la misma base */}
        <Route path='/'>
          {/* Esta es la ruta index (la raíz del grupo) */}
          <Route index element={<App />} />
          <Route path='/evento/:slug' element={<EventDetai />} />
          {/* Las sub-rutas se vuelven relativas a la base */}
          {/* URL resultante:/mis-boletos */}
          <Route path='mis-boletos' element={<MyTickets />} />4
          {/* URL resultante: /payment-success */}
          <Route path='/payment-success' element={<SuccessPage />} />
          <Route path='/payment-error' element={<ErrorPage />} />
          {/* URL resultante: /ticket/:code */}
          <Route path='ticket/:code' element={<TicketView />} />
          {/* URL resultante:/admin/check-in */}
          <Route path='admin/check-in' element={<ScannerView />} />
          <Route path='admin/create-event' element={<AdminCreateEvent />} />
        </Route>

        {/* Ruta 404 general */}
        <Route path='*' element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default Home;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import TicketView from "./components/Pages/TicketDetail";
// import ScannerView from "./components/Pages/ScannerView";
// import SuccessPage from "./components/Pages/SuccessPage";
// import MyTickets from "./components/Pages/MyTickets";
// import ErrorPage from "./components/Pages/ErrorPage";
// import NotFound from "./components/Pages/NotFound";
// import ComingSoon from "./components/Pages/CommingSoon";

// function Home() {
//   return (
//     <Router>
//       <Routes>
//         {/* Página principal */}
//         <Route path='/' element={<ComingSoon />} />

//         {/* 404 */}
//         <Route path='*' element={<NotFound />} />
//       </Routes>
//     </Router>
//   );
// }

// export default Home;
