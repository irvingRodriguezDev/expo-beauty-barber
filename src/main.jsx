import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import theme from "./theme";
import "./index.css";
// import App from "./App.jsx";
import Home from "./Home.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GoogleReCaptchaProvider reCaptchaKey='6Len0rcsAAAAAIJYpBuZY8P3E1l-7GQ0q5zmRDDw'>
        <Home />
      </GoogleReCaptchaProvider>
    </ThemeProvider>
  </StrictMode>,
);
