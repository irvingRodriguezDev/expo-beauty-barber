// src/pages/admin/AdminSeatEditorPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Stage, Layer, Circle, Text, Group, Rect, Line } from "react-konva";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  TextField,
  MenuItem,
  Stack,
  Divider,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import {
  ArrowBack,
  SaveOutlined,
  AddCircleOutline,
  DeleteOutline,
  ZoomIn,
  ZoomOut,
  RestartAlt,
} from "@mui/icons-material";

// Definición de Zonas y Precios
const SEAT_CATEGORIES = {
  VIP: { name: "VIP", color: "#EC4899", defaultPrice: 2500 },
  PREFERENTE: { name: "Preferente", color: "#8B5CF6", defaultPrice: 1500 },
  GENERAL: { name: "General", color: "#3B82F6", defaultPrice: 850 },
};

const AdminSeatEditorPage = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  // Estado del lienzo (Konva Stage)
  const [stageScale, setStageScale] = useState(1);
  const [stagePosition, setStagePosition] = useState({ x: 0, y: 0 });

  // Lista de asientos en el lienzo
  const [seats, setSeats] = useState([
    // Ejemplo inicial
    {
      id: "VIP-A1",
      row: "A",
      number: 1,
      x: 220,
      y: 180,
      category: "VIP",
      price: 2500,
    },
    {
      id: "VIP-A2",
      row: "A",
      number: 2,
      x: 260,
      y: 180,
      category: "VIP",
      price: 2500,
    },
    {
      id: "VIP-A3",
      row: "A",
      number: 3,
      x: 300,
      y: 180,
      category: "VIP",
      price: 2500,
    },
  ]);

  // Asiento seleccionado para editar sus propiedades
  const [selectedSeatId, setSelectedSeatId] = useState(null);

  // Formulario para generador de filas automáticas
  const [generator, setGenerator] = useState({
    rowName: "B",
    seatsCount: 10,
    category: "PREFERENTE",
    startX: 150,
    startY: 240,
  });

  // Manejar arrastre de asientos (Drag End)
  const handleDragEnd = (e, seatId) => {
    const newX = Math.round(e.target.x());
    const newY = Math.round(e.target.y());

    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.id === seatId ? { ...seat, x: newX, y: newY } : seat
      )
    );
  };

  // Generador automático de filas de asientos
  const handleGenerateRow = () => {
    const newSeats = [];
    const spacing = 38; // Espaciado entre asientos
    const cat = SEAT_CATEGORIES[generator.category];

    for (let i = 1; i <= generator.seatsCount; i++) {
      const seatId = `${generator.category}-${generator.rowName}${i}`;
      // Evitar duplicados de ID
      if (!seats.some((s) => s.id === seatId)) {
        newSeats.push({
          id: seatId,
          row: generator.rowName,
          number: i,
          x: Number(generator.startX) + (i - 1) * spacing,
          y: Number(generator.startY),
          category: generator.category,
          price: cat.defaultPrice,
        });
      }
    }

    setSeats([...seats, ...newSeats]);
  };

  // Eliminar asiento seleccionado
  const handleDeleteSelected = () => {
    if (!selectedSeatId) return;
    setSeats(seats.filter((s) => s.id !== selectedSeatId));
    setSelectedSeatId(null);
  };

  // Guardar distribución (Enviar JSON al backend / Lambda)
  const handleSaveLayout = () => {
    const payload = {
      eventId,
      totalSeats: seats.length,
      seatsData: seats,
    };
    console.log("Guardando en DynamoDB:", payload);
    alert(`¡Mapa guardado exitosamente con ${seats.length} asientos!`);
  };

  const selectedSeat = seats.find((s) => s.id === selectedSeatId);

  return (
    <Box
      sx={{
        height: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Barra de herramientas superior */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          border: "1px solid #E2E8F0",
          display: "flex",
          justify: "space-between",
          alignItems: "center",
        }}
      >
        <Stack direction='row' spacing={2} alignItems='center'>
          <IconButton
            onClick={() => navigate("/admin/eventos")}
            sx={{ color: "#64748B" }}
          >
            <ArrowBack />
          </IconButton>
          <Box>
            <Typography variant='h6' fontWeight='bold' color='#0F172A'>
              Diseñador de Asientos (Konva Canvas)
            </Typography>
            <Typography variant='caption' color='#64748B'>
              Evento ID: <strong>{eventId}</strong> | Total Asientos:{" "}
              <strong>{seats.length}</strong>
            </Typography>
          </Box>
        </Stack>

        <Stack direction='row' spacing={1.5}>
          <Button
            variant='contained'
            startIcon={<SaveOutlined />}
            onClick={handleSaveLayout}
            sx={{
              backgroundColor: "#10B981",
              fontWeight: "bold",
              px: 3,
              borderRadius: 2,
              ":hover": { backgroundColor: "#059669" },
            }}
          >
            Guardar Mapa
          </Button>
        </Stack>
      </Paper>

      {/* Área principal: Controles a la izquierda + Canvas Konva a la derecha */}
      <Grid container spacing={2} sx={{ flexGrow: 1, overflow: "hidden" }}>
        {/* PANEL IZQUIERDO: Generador y Controles */}
        <Grid
          item
          xs={12}
          md={4}
          lg={3.5}
          sx={{ height: "100%", overflowY: "auto" }}
        >
          <Stack spacing={2}>
            {/* Generador de Filas */}
            <Card
              elevation={0}
              sx={{ border: "1px solid #E2E8F0", borderRadius: 3 }}
            >
              <CardContent>
                <Typography
                  variant='subtitle1'
                  fontWeight='bold'
                  color='#0F172A'
                  mb={2}
                >
                  Generador de Filas
                </Typography>
                <Grid container spacing={1.5}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size='small'
                      label='Letra Fila'
                      value={generator.rowName}
                      onChange={(e) =>
                        setGenerator({
                          ...generator,
                          rowName: e.target.value.toUpperCase(),
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size='small'
                      type='number'
                      label='Cant. Asientos'
                      value={generator.seatsCount}
                      onChange={(e) =>
                        setGenerator({
                          ...generator,
                          seatsCount: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      size='small'
                      select
                      label='Zona / Categoría'
                      value={generator.category}
                      onChange={(e) =>
                        setGenerator({ ...generator, category: e.target.value })
                      }
                    >
                      {Object.keys(SEAT_CATEGORIES).map((key) => (
                        <MenuItem key={key} value={key}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <Box
                              sx={{
                                width: 12,
                                height: 12,
                                borderRadius: "50%",
                                bgcolor: SEAT_CATEGORIES[key].color,
                              }}
                            />
                            {SEAT_CATEGORIES[key].name} ($
                            {SEAT_CATEGORIES[key].defaultPrice})
                          </Box>
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size='small'
                      type='number'
                      label='Posición X'
                      value={generator.startX}
                      onChange={(e) =>
                        setGenerator({ ...generator, startX: e.target.value })
                      }
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      size='small'
                      type='number'
                      label='Posición Y'
                      value={generator.startY}
                      onChange={(e) =>
                        setGenerator({ ...generator, startY: e.target.value })
                      }
                    />
                  </Grid>
                </Grid>

                <Button
                  fullWidth
                  variant='outlined'
                  startIcon={<AddCircleOutline />}
                  onClick={handleGenerateRow}
                  sx={{
                    mt: 2,
                    color: "#EC4899",
                    borderColor: "#EC4899",
                    fontWeight: "bold",
                    ":hover": {
                      borderColor: "#DB2777",
                      backgroundColor: "#FDF2F8",
                    },
                  }}
                >
                  Generar Fila
                </Button>
              </CardContent>
            </Card>

            {/* Inspeccionar / Editar Asiento Seleccionado */}
            <Card
              elevation={0}
              sx={{ border: "1px solid #E2E8F0", borderRadius: 3 }}
            >
              <CardContent>
                <Typography
                  variant='subtitle1'
                  fontWeight='bold'
                  color='#0F172A'
                  mb={1}
                >
                  Asiento Seleccionado
                </Typography>
                {selectedSeat ? (
                  <Stack spacing={2} sx={{ mt: 1 }}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Chip
                        label={selectedSeat.id}
                        color='primary'
                        sx={{ fontWeight: "bold" }}
                      />
                      <IconButton color='error' onClick={handleDeleteSelected}>
                        <DeleteOutline />
                      </IconButton>
                    </Box>
                    <Typography variant='caption' color='#64748B'>
                      Coordenadas: X={selectedSeat.x}, Y={selectedSeat.y}
                    </Typography>
                  </Stack>
                ) : (
                  <Typography
                    variant='body2'
                    color='#94A3B8'
                    sx={{ py: 2, textStyle: "italic" }}
                  >
                    Haz clic en un asiento del lienzo para ver sus propiedades o
                    eliminarlo.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Stack>
        </Grid>

        {/* PANEL DERECHO: Lienzo Konva Canvas */}
        <Grid item xs={12} md={8} lg={8.5} sx={{ height: "100%" }}>
          <Paper
            elevation={0}
            sx={{
              height: "100%",
              backgroundColor: "#0F172A", // Fondo oscuro para destacar los asientos
              borderRadius: 3,
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Control Flotante de Zoom */}
            <Box
              sx={{
                position: "absolute",
                top: 16,
                right: 16,
                zIndex: 10,
                backgroundColor: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(4px)",
                borderRadius: 2,
                p: 0.5,
              }}
            >
              <IconButton
                sx={{ color: "#FFF" }}
                onClick={() => setStageScale(stageScale * 1.1)}
              >
                <ZoomIn />
              </IconButton>
              <IconButton
                sx={{ color: "#FFF" }}
                onClick={() => setStageScale(stageScale / 1.1)}
              >
                <ZoomOut />
              </IconButton>
              <IconButton
                sx={{ color: "#FFF" }}
                onClick={() => {
                  setStageScale(1);
                  setStagePosition({ x: 0, y: 0 });
                }}
              >
                <RestartAlt />
              </IconButton>
            </Box>

            {/* LIENZO DE KONVA */}
            <Stage
              width={800}
              height={600}
              scaleX={stageScale}
              scaleY={stageScale}
              x={stagePosition.x}
              y={stagePosition.y}
              draggable // Permite mover todo el mapa con clic y arrastre
              onDragEnd={(e) => {
                // Solo si el arrastre es sobre el escenario mismo
                if (e.target === e.target.getStage()) {
                  setStagePosition({ x: e.target.x(), y: e.target.y() });
                }
              }}
              onMouseDown={(e) => {
                // Deseleccionar si hace clic en el fondo oscuro
                if (e.target === e.target.getStage()) {
                  setSelectedSeatId(null);
                }
              }}
            >
              <Layer>
                {/* 1. TARIMA / ESCENARIO MAGISTRAL */}
                <Group x={150} y={40}>
                  <Rect
                    width={450}
                    height={40}
                    fill='#334155'
                    cornerRadius={8}
                    stroke='#475569'
                    strokeWidth={1}
                  />
                  <Text
                    text='ESCENARIO PRINCIPAL / PONENCIA'
                    fontSize={13}
                    fontStyle='bold'
                    fill='#F8FAFC'
                    width={450}
                    align='center'
                    y={14}
                  />
                </Group>

                {/* 2. RENDERIZADO DE ASIENTOS DIBUJADOS */}
                {seats.map((seat) => {
                  const isSelected = seat.id === selectedSeatId;
                  const cat =
                    SEAT_CATEGORIES[seat.category] || SEAT_CATEGORIES.GENERAL;

                  return (
                    <Group
                      key={seat.id}
                      x={seat.x}
                      y={seat.y}
                      draggable // Hace que CADA ASIENTO sea arrastrable individualmente
                      onDragEnd={(e) => handleDragEnd(e, seat.id)}
                      onClick={() => setSelectedSeatId(seat.id)}
                      onTap={() => setSelectedSeatId(seat.id)}
                    >
                      {/* Anillo de selección */}
                      {isSelected && (
                        <Circle
                          radius={18}
                          stroke='#FFFFFF'
                          strokeWidth={2}
                          dash={[4, 4]}
                        />
                      )}

                      {/* Círculo del Asiento */}
                      <Circle
                        radius={14}
                        fill={cat.color}
                        shadowBlur={isSelected ? 10 : 2}
                        shadowColor='#000000'
                      />

                      {/* Etiqueta / Número */}
                      <Text
                        text={`${seat.row}${seat.number}`}
                        fontSize={9}
                        fontStyle='bold'
                        fill='#FFFFFF'
                        align='center'
                        width={20}
                        x={-10}
                        y={-4}
                      />
                    </Group>
                  );
                })}
              </Layer>
            </Stage>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminSeatEditorPage;
