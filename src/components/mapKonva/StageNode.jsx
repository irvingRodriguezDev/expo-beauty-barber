// src/components/admin/konva/StageNode.jsx
import React from "react";
import { Group, Rect, Text } from "react-konva";

export const StageNode = ({ element, isSelected, onSelect, onChange }) => {
  const {
    id,
    x,
    y,
    width = 350,
    height = 50,
    label = "ESCENARIO PRINCIPAL",
    rotation = 0,
  } = element;

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
          x={-6}
          y={-6}
          width={width + 12}
          height={height + 12}
          stroke='#3B82F6'
          strokeWidth={2}
          dash={[4, 4]}
          cornerRadius={6}
        />
      )}

      <Rect
        width={width}
        height={height}
        fill='#1E293B'
        stroke='#475569'
        strokeWidth={2}
        cornerRadius={8}
        shadowBlur={6}
      />

      <Text
        text={label}
        fontSize={12}
        fontStyle='bold'
        fill='#F8FAFC'
        align='center'
        width={width}
        y={height / 2 - 6}
      />
    </Group>
  );
};
