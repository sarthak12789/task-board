import React from "react";
import Card from "./Card";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

export default function Column({ columnId, title, cards, updateCard }) {
  return (
    <div className="column" style={{ minWidth: "220px" }}>
      <div className="column-header">
        <div className="column-title">{title}</div>
        <div className="column-count">{cards.length}</div>
      </div>

      <SortableContext items={cards.map((c) => c.id)} strategy={verticalListSortingStrategy}>
        <div
          className="column-body"
          style={{
            minHeight: "80px",
            padding: "8px",
            borderRadius: "6px",
            background: "#f8f9fa",
            transition: "all 200ms ease-in-out",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          {cards.length > 0
            ? cards.map((card) => (
                <Card key={card.id} card={card} columnId={columnId} updateCard={updateCard} />
              ))
            : (
              <div
                style={{
                  minHeight: "60px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#999",
                  fontStyle: "italic",
                }}
              >
                Drop here
              </div>
            )}
        </div>
      </SortableContext>
    </div>
  );
}
