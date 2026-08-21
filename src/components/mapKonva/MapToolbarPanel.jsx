// src/components/admin/konva/MapToolbarPanel.jsx
import React from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Stack,
  TextField,
  MenuItem,
  IconButton,
  Divider,
  Chip,
  Grid,
} from "@mui/material";
import {
  RadioButtonUnchecked,
  CropSquare,
  TheaterComedy,
  DeleteOutline,
  AddCircleOutline,
  RotateRight,
} from "@mui/icons-material";

const SEAT_CATEGORIES = {
  VIP: { name: "VIP", color: "#EC4899", price: 2500 },
  PREFERENTE: { name: "Preferente", color: "#8B5CF6", price: 1500 },
  GENERAL: { name: "General", color: "#3B82F6", price: 850 },
};

export const MapToolbarPanel = ({
  selectedElement,
  onAddElement,
  onUpdateElement,
  onDeleteElement,
}) => {
  return (
    <Stack spacing={2} sx={{ height: "100%", overflowY: "auto", pr: 0.5 }}>
      {/* 1. PALETA DE ELEMENTOS */}
      <Card elevation={0} sx={{ border: "1px solid #E2E8F0", borderRadius: 3 }}>
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant='subtitle2'
            fontWeight='bold'
            color='#0F172A'
            mb={1.5}
          >
            Añadir Elemento
          </Typography>

          <Stack spacing={1}>
            <Button
              variant='outlined'
              fullWidth
              startIcon={<RadioButtonUnchecked />}
              onClick={() => onAddElement("ROUND_TABLE")}
              sx={{
                justifyContent: "flex-start",
                color: "#334155",
                borderColor: "#CBD5E1",
              }}
            >
              Mesa Redonda
            </Button>

            <Button
              variant='outlined'
              fullWidth
              startIcon={<CropSquare />}
              onClick={() => onAddElement("RECT_TABLE")}
              sx={{
                justifyContent: "flex-start",
                color: "#334155",
                borderColor: "#CBD5E1",
              }}
            >
              Mesa Rectangular
            </Button>

            <Button
              variant='outlined'
              fullWidth
              startIcon={<TheaterComedy />}
              onClick={() => onAddElement("STAGE")}
              sx={{
                justifyContent: "flex-start",
                color: "#334155",
                borderColor: "#CBD5E1",
              }}
            >
              Escenario / Tarima
            </Button>
          </Stack>
        </CardContent>
      </Card>

      {/* 2. INSPECTOR Y EDITOR DE PROPIEDADES */}
      <Card
        elevation={0}
        sx={{ border: "1px solid #E2E8F0", borderRadius: 3, flexGrow: 1 }}
      >
        <CardContent sx={{ p: 2 }}>
          <Typography
            variant='subtitle2'
            fontWeight='bold'
            color='#0F172A'
            mb={1.5}
          >
            Propiedades
          </Typography>

          {selectedElement ? (
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Chip
                  label={selectedElement.id}
                  color='primary'
                  size='small'
                  sx={{ fontWeight: "bold" }}
                />
                <IconButton
                  color='error'
                  size='small'
                  onClick={() => onDeleteElement(selectedElement.id)}
                >
                  <DeleteOutline />
                </IconButton>
              </Box>

              {/* Etiqueta / Nombre */}
              <TextField
                fullWidth
                size='small'
                label='Etiqueta'
                value={selectedElement.label || ""}
                onChange={(e) =>
                  onUpdateElement({ ...selectedElement, label: e.target.value })
                }
              />

              {/* Ajustes específicos para MESAS */}
              {selectedElement.type !== "STAGE" && (
                <>
                  <TextField
                    fullWidth
                    size='small'
                    select
                    label='Categoría / Zona'
                    value={selectedElement.category || "GENERAL"}
                    onChange={(e) =>
                      onUpdateElement({
                        ...selectedElement,
                        category: e.target.value,
                      })
                    }
                  >
                    {Object.keys(SEAT_CATEGORIES).map((key) => (
                      <MenuItem key={key} value={key}>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 1 }}
                        >
                          <Box
                            sx={{
                              width: 10,
                              height: 10,
                              borderRadius: "50%",
                              bgcolor: SEAT_CATEGORIES[key].color,
                            }}
                          />
                          {SEAT_CATEGORIES[key].name}
                        </Box>
                      </MenuItem>
                    ))}
                  </TextField>

                  {selectedElement.type === "ROUND_TABLE" && (
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size='small'
                          type='number'
                          label='Radio (px)'
                          value={selectedElement.radius || 40}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              radius: Number(e.target.value),
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size='small'
                          type='number'
                          label='Cant. Sillas'
                          value={selectedElement.seatsCount || 6}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              seatsCount: Number(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                  )}

                  {selectedElement.type === "RECT_TABLE" && (
                    <Grid container spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size='small'
                          type='number'
                          label='Sillas Largo'
                          value={selectedElement.seatsX || 3}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              seatsX: Number(e.target.value),
                            })
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size='small'
                          type='number'
                          label='Sillas Ancho'
                          value={selectedElement.seatsY || 1}
                          onChange={(e) =>
                            onUpdateElement({
                              ...selectedElement,
                              seatsY: Number(e.target.value),
                            })
                          }
                        />
                      </Grid>
                    </Grid>
                  )}
                </>
              )}

              {/* Controles de Posición y Rotación */}
              <Divider sx={{ my: 1 }} />
              <Typography variant='caption' color='#64748B' fontWeight='bold'>
                TRANSFORMACIÓN
              </Typography>

              <Grid container spacing={1}>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size='small'
                    type='number'
                    label='X'
                    value={selectedElement.x || 0}
                    onChange={(e) =>
                      onUpdateElement({
                        ...selectedElement,
                        x: Number(e.target.value),
                      })
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size='small'
                    type='number'
                    label='Y'
                    value={selectedElement.y || 0}
                    onChange={(e) =>
                      onUpdateElement({
                        ...selectedElement,
                        y: Number(e.target.value),
                      })
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    size='small'
                    type='number'
                    label='Rotación (°)'
                    value={selectedElement.rotation || 0}
                    onChange={(e) =>
                      onUpdateElement({
                        ...selectedElement,
                        rotation: Number(e.target.value),
                      })
                    }
                  />
                </Grid>
              </Grid>

              <Button
                variant='outlined'
                size='small'
                startIcon={<RotateRight />}
                onClick={() =>
                  onUpdateElement({
                    ...selectedElement,
                    rotation: ((selectedElement.rotation || 0) + 45) % 360,
                  })
                }
              >
                Girar 45°
              </Button>
            </Stack>
          ) : (
            <Typography
              variant='body2'
              color='#94A3B8'
              sx={{ py: 3, textAlign: "center", fontStyle: "italic" }}
            >
              Selecciona un elemento en el lienzo para modificar sus parámetros.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Stack>
  );
};
