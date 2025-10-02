import React, { useState } from "react";
import { useSortable, defaultAnimateLayoutChanges } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Card({ card, columnId, updateCard }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(card.title);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: card.id,
    data: { type: "card", card, columnId },
    animateLayoutChanges: (args) =>
      defaultAnimateLayoutChanges({ ...args, wasDragging: true }),
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 999 : "auto",
    boxShadow: isDragging ? "0 8px 20px rgba(0,0,0,0.3)" : "none",
    background: "#fff",
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "6px",
    cursor: isDragging ? "grabbing" : "grab",
    userSelect: "none",
  };

  const handleSave = () => {
    setIsEditing(false);
    updateCard(columnId, card.id, text);
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {isEditing ? (
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
          style={{ width: "100%", padding: "4px", fontSize: "14px" }}
        />
      ) : (
        <div onDoubleClick={() => setIsEditing(true)}>
          {card.title}
        </div>
      )}
    </div>
  );
}
