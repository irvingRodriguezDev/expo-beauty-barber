import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Vistas Públicas
// import { EventDetailPage } from "../pages/public/EventDetailPage";
// import { SeatSelectionPage } from "../pages/public/SeatSelectionPage";
// import { CheckoutPage } from "../pages/public/CheckoutPage";

// // Vistas Admin
// import { AdminEventsPage } from "../pages/admin/AdminEventsPage";
// import { AdminCreateEventPage } from "../pages/admin/AdminCreateEventPage";
// import { AdminSeatEditorPage } from "../pages/admin/AdminSeatEditorPage";

// Componente Guardián de Rutas
import { ProtectedRoute } from "./ProtectedRoute";
//VISTAS PUBLICAS
import App from "../App";
//VISTAS ADMIN
import AdminLogin from "../Pages/Admin/Auth/AdminLogin";
import { AdminDashboard } from "../Pages/Admin/AdminDashboard";
import SuccessPage from "../Pages/SuccessPage";
import TicketView from "../Pages/TicketDetail";
import MyTickets from "../Pages/MyTickets";
import ScannerView from "../Pages/ScannerView";
import AdminEventsPage from "../Pages/Admin/AdminEventsPage";
import AdminSeatEditorPage from "../Pages/Admin/AdminSeatEditorPage";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ==========================================
            1. RUTAS PÚBLICAS (Clientes / Compradores)
           ========================================== */}
        <Route path='/' element={<App />} />
        <Route path='/payment-success' element={<SuccessPage />} />
        <Route path='/ticket/:code' element={<TicketView />} />
        <Route path='/mis-boletos' element={<MyTickets />} />
        <Route path='/admin/check-in' element={<ScannerView />} />

        {/* <Route path='/evento/:slug' element={<EventDetailPage />} />
        <Route path='/evento/:slug/boletos' element={<SeatSelectionPage />} />
        <Route path='/checkout/confirmacion' element={<CheckoutPage />} /> */}

        {/* ==========================================
            2. RUTAS DE AUTENTICACIÓN ADMIN
           ========================================== */}
        <Route path='/admin/login' element={<AdminLogin />} />

        {/* ==========================================
            3. RUTAS PROTEGIDAS (Solo Admin con Cognito)
           ========================================== */}
        <Route element={<ProtectedRoute />}>
          <Route
            path='/admin'
            element={<Navigate to='/admin/dashboard' replace />}
          />
          <Route path='/admin/dashboard' element={<AdminDashboard />} />
          <Route path='/admin/eventos' element={<AdminEventsPage />} />
          <Route
            path='/admin/eventos/:id/mapa'
            element={<AdminSeatEditorPage />}
          />
        </Route>

        {/* 404 - Redirección genérica */}
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </BrowserRouter>
  );
};
