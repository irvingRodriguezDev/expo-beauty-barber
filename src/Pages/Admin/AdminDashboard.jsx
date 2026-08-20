// src/pages/admin/AdminDashboard.jsx
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";

export function AdminDashboard() {
  return (
    <Authenticator>
      {({ signOut, user }) => (
        <main className='p-6'>
          <div className='flex justify-between items-center mb-6'>
            <h1>Bienvenido al Panel de Expo Beauty, {user.username}</h1>
            <button
              onClick={signOut}
              className='bg-red-500 text-white px-4 py-2 rounded'
            >
              Cerrar Sesión
            </button>
          </div>

          {/* AQUÍ IRÁ EL CREADOR DE EVENTOS Y EDITOR DE ASIENTOS CON KONVA */}
        </main>
      )}
    </Authenticator>
  );
}
