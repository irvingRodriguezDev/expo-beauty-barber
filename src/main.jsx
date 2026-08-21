import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import theme from "./theme";
import "./index.css";
import { awsConfig } from "./config/aws-exports.js"; // Carga la configuración de Cognito
import { Amplify } from "aws-amplify";
import { AppRoutes } from "./routes/AppRoutes.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

Amplify.configure(awsConfig);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <GoogleReCaptchaProvider reCaptchaKey='6Len0rcsAAAAAIJYpBuZY8P3E1l-7GQ0q5zmRDDw'>
          <AppRoutes />
        </GoogleReCaptchaProvider>
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
