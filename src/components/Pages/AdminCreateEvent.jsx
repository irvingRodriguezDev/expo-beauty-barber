import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Estilos del editor
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  LinearProgress,
  Stack,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import Swal from "sweetalert2";

export default function AdminCreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    total_tickets: "",
    map_url: "", // Nuevo campo
  });
  const [descriptionHtml, setDescriptionHtml] = useState(""); // Estado para el HTML de ReactQuill
  const [flyerFile, setFlyerFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ type: "", text: "" });

  const brandPink = "#ee6f97ff";
  const deepText = "#3D2B2F";
  const lightBg = "#FFD9E2";
  const extractMapSrc = (input) => {
    // Si el usuario pegó el código completo del iframe
    if (input.includes("<iframe")) {
      // Expresión regular para buscar el contenido dentro de src="..."
      const srcMatch = input.match(/src=["']([^"']+)["']/);

      // Si encuentra la coincidencia, regresa la URL, si no, regresa el texto original
      return srcMatch ? srcMatch[1] : input;
    }

    // Si no es un iframe (ya pegó la URL limpia), la regresa intacta
    return input.trim();
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMapChange = (e) => {
    const rawInput = e.target.value;

    // Limpiamos el texto usando la función extractor
    const cleanSrc = extractMapSrc(rawInput);

    setFormData({
      ...formData,
      map_url: cleanSrc, // Guardamos únicamente la URL limpia en el estado
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFlyerFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const generateSlug = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[\s_]+/g, "-")
      .replace(/[^\w\-]+/g, "")
      .replace(/\-\-+/g, "-");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage({ type: "", text: "" });

    if (!flyerFile) {
      setStatusMessage({
        type: "error",
        text: "Por favor, selecciona un flyer.",
      });
      setLoading(false);
      return;
    }

    try {
      // FASE 1: S3 Presigned URL
      const presignedResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/events/upload-url`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: flyerFile.name,
            filetype: flyerFile.type,
          }),
        },
      );
      if (!presignedResponse.ok) throw new Error("Error en URL firmada.");
      const { uploadUrl, finalAssetUrl } = await presignedResponse.json();

      // FASE 2: Subida a S3
      await fetch(uploadUrl, {
        method: "PUT",
        headers: { "Content-Type": flyerFile.type },
        body: flyerFile,
      });

      // FASE 3: Guardar en BD (Mandando el HTML y la URL del Mapa)
      const finalSlug = generateSlug(formData.title);
      const createEventResponse = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/events`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titulo: formData.title,
            descripcion: descriptionHtml, // Aquí va el String de HTML Puro
            fecha: formData.date,
            costo: formData.costo,
            lugar: formData.location,
            total_boletos: parseInt(formData.total_tickets, 10) || 0,
            flyer_url: finalAssetUrl,
            mapa: formData.map_url, // Se va a tu Lambda
            slug: finalSlug,
          }),
        },
      );

      if (!createEventResponse.ok)
        throw new Error("Error al guardar en MySQL.");
      setFormData({
        title: "",
        date: "",
        location: "",
        total_tickets: "",
        costo: "",
        map_url: "",
      });
      setDescriptionHtml("");
      setPreviewUrl("");
      setFlyerFile(null);
      Swal.fire({
        title: "Correcto",
        text: "El evento se ha creado de manera exitosa",
        icon: "success",
        timer: 2500,
        showConfirmButton: false,
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
        timer: 2500,
        showConfirmButton: false,
      });
      setStatusMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  // Módulos personalizados para simplificar la barra de herramientas de Quill
  const quillModules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  return (
    <Box sx={{ bgcolor: lightBg, minHeight: "100vh", py: 6 }}>
      <Container maxWidth='md'>
        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderRadius: "24px",
            border: "1px solid rgba(255, 183, 206, 0.4)",
          }}
        >
          <Typography
            variant='h5'
            sx={{
              fontWeight: 900,
              color: deepText,
              mb: 4,
              textAlign: "center",
            }}
          >
            CREAR EVENTO PREMIUM
          </Typography>

          <Box component='form' onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label='Título del Evento'
                  name='title'
                  fullWidth
                  required
                  value={formData.title}
                  onChange={handleChange}
                />
              </Grid>

              {/* EDITOR RICH TEXT PARA LA DESCRIPCIÓN */}
              <Grid item xs={12}>
                <Typography
                  variant='subtitle2'
                  sx={{ mb: 1, fontWeight: 700, color: deepText }}
                >
                  Descripción del Evento
                </Typography>
                <Box
                  sx={{
                    bgcolor: "#FFF",
                    borderRadius: "8px",
                    overflow: "hidden",
                    "& .ql-container": {
                      minHeight: "180px",
                      fontFamily: "inherit",
                    },
                    "& .ql-toolbar": { borderColor: "rgba(0,0,0,0.23)" },
                  }}
                >
                  <ReactQuill
                    theme='snow'
                    value={descriptionHtml}
                    onChange={setDescriptionHtml}
                    modules={quillModules}
                  />
                </Box>
              </Grid>

              <Grid item xs={12} sm={4}>
                <TextField
                  label='Fecha'
                  name='date'
                  type='date'
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  value={formData.date}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label='Costo'
                  name='costo'
                  type='number'
                  fullWidth
                  required
                  InputLabelProps={{ shrink: true }}
                  value={formData.costo}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label='Boletos Totales'
                  name='total_tickets'
                  type='number'
                  fullWidth
                  value={formData.total_tickets}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label='Nombre del Lugar (Ej. WTC CDMX)'
                  name='location'
                  fullWidth
                  value={formData.location}
                  onChange={handleChange}
                />
              </Grid>

              {/* NUEVO CAMPO: URL DEL MAPA */}
              <Grid item xs={12}>
                <TextField
                  label='Mapa de Google'
                  name='map_url'
                  fullWidth
                  value={formData.map_url}
                  onChange={handleMapChange} // <-- Usamos el nuevo manejador limpio
                  placeholder='Pega aquí el iframe completo <iframe src=...>'
                  helperText='Ve a Google Maps -> Compartir -> Insertar mapa -> Copia todo el código completo y pégalo aquí sin miedo. Nosotros lo limpiamos.'
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  variant='subtitle2'
                  sx={{ mb: 1, fontWeight: 700, color: deepText }}
                >
                  Flyer *
                </Typography>
                <Stack direction='row' spacing={3} alignItems='center'>
                  <Button
                    component='label'
                    variant='outlined'
                    startIcon={<CloudUploadIcon />}
                    sx={{ borderColor: brandPink, color: brandPink }}
                  >
                    Subir Imagen
                    <input
                      type='file'
                      accept='image/*'
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                  {previewUrl && (
                    <Box
                      component='img'
                      src={previewUrl}
                      sx={{
                        width: 100,
                        height: 100,
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  )}
                </Stack>
              </Grid>

              {loading && (
                <Grid item xs={12}>
                  <LinearProgress sx={{ color: brandPink }} />
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  type='submit'
                  variant='contained'
                  fullWidth
                  disabled={loading}
                  sx={{
                    bgcolor: deepText,
                    py: 2,
                    borderRadius: "12px",
                    fontWeight: 800,
                  }}
                >
                  {loading ? "GUARDANDO..." : "PUBLICAR EVENTO"}
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}
