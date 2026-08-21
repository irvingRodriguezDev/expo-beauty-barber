// src/components/admin/konva/RoundTableNode.jsx
import React from "react";
import { Group, Circle, Text } from "react-konva";

export const RoundTableNode = ({
  element,
  isSelected,
  onSelect,
  onChange,
  categoryColor = "#EC4899",
}) => {
  const {
    id,
    x,
    y,
    radius = 40,
    seatsCount = 6,
    label,
    rotation = 0,
  } = element;

  // Algoritmo para distribuir sillas en circunferencia
  const renderSeats = () => {
    const seats = [];
    const seatRadius = 8; // Tamaño de cada silla
    const distanceToTable = radius + 14; // Distancia del centro a las sillas

    for (let i = 0; i < seatsCount; i++) {
      const angle = (i * 2 * Math.PI) / seatsCount;
      const seatX = distanceToTable * Math.cos(angle);
      const seatY = distanceToTable * Math.sin(angle);

      seats.push(
        <Group key={`${id}-seat-${i + 1}`} x={seatX} y={seatY}>
          <Circle
            radius={seatRadius}
            fill={categoryColor}
            stroke='#FFFFFF'
            strokeWidth={1}
          />
          <Text
            text={`${i + 1}`}
            fontSize={8}
            fill='#FFFFFF'
            align='center'
            x={-4}
            y={-3}
          />
        </Group>
      );
    }
    return seats;
  };

  return (
    <Group
      id={id}
      x={x}
      y={y}
      rotation={rotation}
      draggable
      onClick={onSelect}
      onTap={onSelect}
      onDragEnd={(e) => {
        onChange({
          ...element,
          x: Math.round(e.target.x()),
          y: Math.round(e.target.y()),
        });
      }}
    >
      {/* Indicador de Selección */}
      {isSelected && (
        <Circle
          radius={radius + 26}
          stroke='#3B82F6'
          strokeWidth={2}
          dash={[5, 5]}
        />
      )}

      {/* Sillas alrededor */}
      {renderSeats()}

      {/* Mesa (Círculo Central) */}
      <Circle
        radius={radius}
        fill='#334155'
        stroke='#475569'
        strokeWidth={2}
        shadowBlur={4}
      />

      {/* Etiqueta de la Mesa */}
      <Text
        text={label || id}
        fontSize={11}
        fontStyle='bold'
        fill='#FFFFFF'
        align='center'
        x={-radius}
        y={-5}
        width={radius * 2}
      />
    </Group>
  );
};
