// src/components/admin/konva/InteractiveMapCanvas.jsx
import React from "react";
import { Stage, Layer } from "react-konva";
import { RoundTableNode } from "./RoundTableNode";
import { RectTableNode } from "./RectTableNode";

const SEAT_CATEGORIES = {
  VIP: "#EC4899",
  PREFERENTE: "#8B5CF6",
  GENERAL: "#3B82F6",
};

export const InteractiveMapCanvas = ({
  elements,
  selectedId,
  onSelectElement,
  onUpdateElement,
}) => {
  return (
    <Stage width={900} height={650} draggable>
      <Layer>
        {elements.map((el) => {
          const isSelected = el.id === selectedId;
          const categoryColor = SEAT_CATEGORIES[el.category] || "#10B981";

          switch (el.type) {
            case "ROUND_TABLE":
              return (
                <RoundTableNode
                  key={el.id}
                  element={el}
                  isSelected={isSelected}
                  onSelect={() => onSelectElement(el.id)}
                  onChange={onUpdateElement}
                  categoryColor={categoryColor}
                />
              );

            case "RECT_TABLE":
              return (
                <RectTableNode
                  key={el.id}
                  element={el}
                  isSelected={isSelected}
                  onSelect={() => onSelectElement(el.id)}
                  onChange={onUpdateElement}
                  categoryColor={categoryColor}
                />
              );

            default:
              return null;
          }
        })}
      </Layer>
    </Stage>
  );
};
