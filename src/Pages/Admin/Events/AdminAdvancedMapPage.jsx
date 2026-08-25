// src/pages/admin/AdminAdvancedMapPage.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Paper,
  Typography,
  Button,
  Grid,
  Stack,
  IconButton,
} from "@mui/material";
import { ArrowBack, SaveOutlined } from "@mui/icons-material";
import { Stage, Layer } from "react-konva";

import { MapToolbarPanel } from "../../../components/mapKonva/MapToolbarPanel";
import { RoundTableNode } from "../../../components/mapKonva/RoundTableNode";
import { RectTableNode } from "../../../components/mapKonva/RectTableNode";
import { StageNode } from "../../../components/mapKonva/StageNode";

const SEAT_CATEGORIES = {
  VIP: "#EC4899",
  PREFERENTE: "#8B5CF6",
  GENERAL: "#3B82F6",
};

export const AdminAdvancedMapPage = () => {
  const { id: eventId } = useParams();
  const navigate = useNavigate();

  const [selectedId, setSelectedId] = useState(null);
  const [elements, setElements] = useState([
    {
      id: "STAGE-1",
      type: "STAGE",
      x: 200,
      y: 30,
      width: 350,
      height: 50,
      label: "ESCENARIO / PONENCIA",
      rotation: 0,
    },
    {
      id: "M-1",
      type: "ROUND_TABLE",
      x: 250,
      y: 200,
      radius: 35,
      seatsCount: 6,
      label: "M-1",
      category: "VIP",
      rotation: 0,
    },
    {
      id: "M-2",
      type: "RECT_TABLE",
      x: 450,
      y: 200,
      width: 100,
      height: 60,
      seatsX: 3,
      seatsY: 1,
      label: "M-2",
      category: "PREFERENTE",
      rotation: 0,
    },
  ]);

  // Handler para agregar nuevos elementos
  const handleAddElement = (type) => {
    const count = elements.filter((e) => e.type === type).length + 1;
    let newElement = {
      id: `${type}-${count}`,
      type,
      x: 100 + count * 10,
      y: 100 + count * 10,
      rotation: 0,
    };

    if (type === "ROUND_TABLE") {
      newElement = {
        ...newElement,
        radius: 35,
        seatsCount: 6,
        label: `M-${count}`,
        category: "GENERAL",
      };
    } else if (type === "RECT_TABLE") {
      newElement = {
        ...newElement,
        width: 100,
        height: 60,
        seatsX: 3,
        seatsY: 1,
        label: `M-${count}`,
        category: "GENERAL",
      };
    } else if (type === "STAGE") {
      newElement = {
        ...newElement,
        width: 350,
        height: 50,
        label: "ESCENARIO",
      };
    }

    setElements([...elements, newElement]);
    setSelectedId(newElement.id);
  };

  // Actualizar elemento modificado
  const handleUpdateElement = (updatedElement) => {
    setElements((prev) =>
      prev.map((el) => (el.id === updatedElement.id ? updatedElement : el))
    );
  };

  // Eliminar elemento
  const handleDeleteElement = (id) => {
    setElements((prev) => prev.filter((el) => el.id !== id));
    setSelectedId(null);
  };

  // Guardar en backend (DynamoDB / Lambda)
  const handleSave = () => {
    const payload = { eventId, mapData: elements };
    console.log("Payload simplificado para DynamoDB:", payload);
    alert("¡Distribución del mapa guardada exitosamente!");
  };

  const selectedElement = elements.find((e) => e.id === selectedId);

  return (
    <Box
      sx={{
        height: "calc(100vh - 100px)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Encabezado */}
      <Paper
        elevation={0}
        sx={{
          p: 2,
          mb: 2,
          borderRadius: 3,
          border: "1px solid #E2E8F0",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Stack direction='row' spacing={2} alignItems='center'>
          <IconButton
            onClick={() => navigate("/admin/eventos")}
            sx={{ color: "#64748B" }}
          >
            <ArrowBack />
          </IconButton>
          <Typography variant='h6' fontWeight='bold'>
            Editor Interactivo de Recinto
          </Typography>
        </Stack>
        <Button
          variant='contained'
          startIcon={<SaveOutlined />}
          onClick={handleSave}
          sx={{ backgroundColor: "#10B981", fontWeight: "bold" }}
        >
          Guardar Mapa
        </Button>
      </Paper>

      {/* Grid Principal */}
      <Grid container spacing={2} sx={{ flexGrow: 1, overflow: "hidden" }}>
        {/* Panel Lateral Izquierdo */}
        <Grid item xs={12} md={4} lg={3} sx={{ height: "100%" }}>
          <MapToolbarPanel
            selectedElement={selectedElement}
            onAddElement={handleAddElement}
            onUpdateElement={handleUpdateElement}
            onDeleteElement={handleDeleteElement}
          />
        </Grid>

        {/* Lienzo Konva */}
        <Grid item xs={12} md={8} lg={9} sx={{ height: "100%" }}>
          <Paper
            elevation={0}
            sx={{
              height: "100%",
              backgroundColor: "#0F172A",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <Stage
              width={1340}
              height={700}
              draggable
              onMouseDown={(e) => {
                if (e.target === e.target.getStage()) setSelectedId(null);
              }}
            >
              <Layer>
                {elements.map((el) => {
                  const isSelected = el.id === selectedId;
                  const catColor = SEAT_CATEGORIES[el.category] || "#10B981";

                  if (el.type === "ROUND_TABLE") {
                    return (
                      <RoundTableNode
                        key={el.id}
                        element={el}
                        isSelected={isSelected}
                        onSelect={() => setSelectedId(el.id)}
                        onChange={handleUpdateElement}
                        categoryColor={catColor}
                      />
                    );
                  }
                  if (el.type === "RECT_TABLE") {
                    return (
                      <RectTableNode
                        key={el.id}
                        element={el}
                        isSelected={isSelected}
                        onSelect={() => setSelectedId(el.id)}
                        onChange={handleUpdateElement}
                        categoryColor={catColor}
                      />
                    );
                  }
                  if (el.type === "STAGE") {
                    return (
                      <StageNode
                        key={el.id}
                        element={el}
                        isSelected={isSelected}
                        onSelect={() => setSelectedId(el.id)}
                        onChange={handleUpdateElement}
                      />
                    );
                  }
                  return null;
                })}
              </Layer>
            </Stage>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
