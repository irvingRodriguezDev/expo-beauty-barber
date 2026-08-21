// src/components/admin/konva/RectTableNode.jsx
import React from "react";
import { Group, Rect, Circle, Text } from "react-konva";

export const RectTableNode = ({
  element,
  isSelected,
  onSelect,
  onChange,
  categoryColor = "#8B5CF6",
}) => {
  const {
    id,
    x,
    y,
    width = 100,
    height = 60,
    seatsX = 3, // Sillas arriba y abajo
    seatsY = 1, // Sillas a los costados
    label,
    rotation = 0,
  } = element;

  const renderSeats = () => {
    const seats = [];
    const seatRadius = 8;
    const offset = 14;

    // Sillas arriba y abajo
    const stepX = width / (seatsX + 1);
    for (let i = 1; i <= seatsX; i++) {
      // Arriba
      seats.push(
        <Circle
          key={`${id}-top-${i}`}
          x={stepX * i}
          y={-offset}
          radius={seatRadius}
          fill={categoryColor}
        />
      );
      // Abajo
      seats.push(
        <Circle
          key={`${id}-bottom-${i}`}
          x={stepX * i}
          y={height + offset}
          radius={seatRadius}
          fill={categoryColor}
        />
      );
    }

    // Sillas a la izquierda y derecha
    const stepY = height / (seatsY + 1);
    for (let j = 1; j <= seatsY; j++) {
      // Izquierda
      seats.push(
        <Circle
          key={`${id}-left-${j}`}
          x={-offset}
          y={stepY * j}
          radius={seatRadius}
          fill={categoryColor}
        />
      );
      // Derecha
      seats.push(
        <Circle
          key={`${id}-right-${j}`}
          x={width + offset}
          y={stepY * j}
          radius={seatRadius}
          fill={categoryColor}
        />
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
      {isSelected && (
        <Rect
          x={-20}
          y={-20}
          width={width + 40}
          height={height + 40}
          stroke='#3B82F6'
          strokeWidth={2}
          dash={[5, 5]}
          cornerRadius={6}
        />
      )}

      {renderSeats()}

      {/* Tablero de la Mesa */}
      <Rect
        width={width}
        height={height}
        fill='#334155'
        stroke='#475569'
        strokeWidth={2}
        cornerRadius={6}
      />

      <Text
        text={label || id}
        fontSize={11}
        fontStyle='bold'
        fill='#FFFFFF'
        align='center'
        width={width}
        y={height / 2 - 6}
      />
    </Group>
  );
};
