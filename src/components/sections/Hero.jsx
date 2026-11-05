import {
  Box,
  Container,
  CircularProgress,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import MethodGet from "../../config/service";
import EventCard from "../EventCard";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { Link } from "react-router-dom";

export default function Hero() {
  const brandPink = "#E53888";
  const deepText = "#1A1A1A";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "/events";
    MethodGet(url)
      .then((res) => {
        setEvents(res.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error, "ocurrio un error");
        setLoading(false);
      });
  }, []);

  const rawEvents = events ? events.slice(0, 3) : [];

  // Ordenamos los eventos para escritorio: el destacado (ej. el del costo de 1200 o el del centro) va en medio (índice 1)
  // En móvil, podemos reordenar el arreglo para que el destacado quede al final (última posición).
  // Identificamos el destacado por costo (ej. 1200) o por el índice central si son 3.
  const getOrderedEvents = (isMobile) => {
    if (rawEvents.length !== 3) return rawEvents;

    // Buscamos el evento destacado (por ejemplo, el que cuesta 1200 o el del centro índice 1)
    const highlightedIndex =
      rawEvents.findIndex(
        (ev) => Number(ev.costo) === 1200 || Number(ev.precio) === 1200,
      ) !== -1
        ? rawEvents.findIndex(
            (ev) => Number(ev.costo) === 1200 || Number(ev.precio) === 1200,
          )
        : 1;

    const restEvents = rawEvents.filter((_, idx) => idx !== highlightedIndex);
    const highlightedEvent = rawEvents[highlightedIndex];

    if (isMobile) {
      // En móvil: ponemos los demás primero y el destacado al final
      return [...restEvents, highlightedEvent];
    } else {
      // En escritorio: formato original (ej. [Día 1, Pase Completo, Día 2]) para que quede en el centro
      return [restEvents[0], highlightedEvent, restEvents[1]];
    }
  };

  if (loading)
    return (
      <Grid
        container
        spacing={2}
        sx={{
          bgcolor: "#FFD9E2",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "30px",
        }}
      >
        <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress
            aria-label='Cargando Eventos'
            sx={{ color: brandPink }}
          />
        </Grid>
        <Grid size={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Typography
            variant='h2'
            sx={{
              fontSize: { xs: ".9rem", sm: "1.2rem", md: "1.5rem" },
              fontWeight: 900,
              lineHeight: 1,
              color: deepText,
              letterSpacing: "-0.02em",
            }}
          >
            Consultando Eventos disponibles...
          </Typography>
        </Grid>
      </Grid>
    );

  return (
    <Box
      component='section'
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: "100%",
        background: "linear-gradient(180deg, #FAF6F6 0%, #FFFFFF 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: { xs: 6, md: 8 },
        px: 2,
        overflowX: "hidden",
      }}
    >
      <Container maxWidth='xl' sx={{ position: "relative", zIndex: 1 }}>
        {/* ENCABEZADO CENTRADO ARRIBA */}
        <Box
          component='header'
          sx={{ textAlign: "center", maxWidth: "1200px", mx: "auto", mb: 6 }}
        >
          <Typography
            variant='h1'
            sx={{
              fontSize: { xs: "2rem", sm: "2.3rem", md: "2.6rem" },
              fontWeight: 800,
              color: deepText,
              lineHeight: 1.2,
              marginBottom: "16px",
              letterSpacing: "-0.5px",
            }}
          >
            Elige tu Pase para <br />
            <Box component='span' sx={{ color: brandPink }}>
              Christmas Nails CDMX
            </Box>
          </Typography>
          <Typography
            variant='body1'
            sx={{
              fontSize: { xs: "1rem", md: "1.125rem" },
              color: "#64748B",
              lineHeight: 1.6,
            }}
          >
            Asegura tu lugar en la capacitación más esperada de la temporada.
            <br />
            Selecciona el acceso que mejor se adapte a ti.
          </Typography>
        </Box>

        {/* GRID DE TARJETAS ORDENADAS RESPONSIVAS */}
        {/* Usamos CSS Grid / Flex con orden responsivo mediante ocultamiento o duplicando vistas limpias para móvil y desktop, o bien ordenando por CSS order */}

        {/* Vista para Escritorio (md en adelante): El destacado queda en medio */}
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: "center",
            maxWidth: "100%",
            mx: "auto",
            display: { xs: "none", md: "flex" },
          }}
        >
          {getOrderedEvents(false).map((evento, index) => {
            const isHighlighted =
              Number(evento.costo) === 1200 ||
              Number(evento.precio) === 1200 ||
              index === 1;
            return (
              <Grid
                size={{ xs: 12, md: 4 }}
                key={evento.id || index}
                sx={{ display: "flex", m: 1 }}
              >
                <EventCard
                  evento={evento}
                  brandPink={brandPink}
                  deepText={deepText}
                  isHighlighted={isHighlighted}
                />
              </Grid>
            );
          })}
        </Grid>

        {/* Vista para Celular (xs): El destacado pasa al final */}
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: "center",
            maxWidth: "100%",
            mx: "auto",
            display: { xs: "flex", md: "none" },
          }}
        >
          {getOrderedEvents(true).map((evento, index) => {
            const isHighlighted =
              Number(evento.costo) === 1200 || Number(evento.precio) === 1200;
            return (
              <Grid
                size={{ xs: 12, md: 4 }}
                key={evento.id || index}
                sx={{ display: "flex", m: 1 }}
              >
                <EventCard
                  evento={evento}
                  brandPink={brandPink}
                  deepText={deepText}
                  isHighlighted={isHighlighted}
                />
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Link
            to={"https://bit.ly/ChristmasNails_Iraida"}
            target='_blank'
            rel='noopener noreferrer'
            style={{ textDecoration: "none" }}
          >
            <Button
              sx={{
                bgcolor: "#24CD63",
                color: "#fff",
                borderRadius: "12px",
                px: 3,
                py: 1.5,
                textTransform: "none",
                fontWeight: 700,
                "&:hover": { bgcolor: "#20b356" },
              }}
            >
              O compralo por WhatsApp <WhatsAppIcon sx={{ ml: 1 }} />
            </Button>
          </Link>
        </Box>

        {/* PIE DE PÁGINA Y MÉTODOS DE PAGO */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography
            sx={{
              color: "#64748B",
              fontSize: "0.9rem",
              mb: 1,
              fontWeight: 500,
            }}
          >
            💳 Pago seguro aceptado con Tarjeta (Débito/Crédito) y Efectivo en
            OXXO
          </Typography>
          <Typography sx={{ color: "#64748B", fontSize: "0.875rem" }}>
            © Eventos Wapizima. Pagos seguros y garantía de acceso.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
