import React, { useState } from "react";
import Column from "./Column";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export default function Board({ columns, columnTitles, columnOrder, updateCard }) {
  const [localColumns, setLocalColumns] = useState(columns);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over) return;

    const sourceColumnId = active.data.current.columnId;
    const destColumnId = over.data.current?.columnId;
    if (!sourceColumnId || !destColumnId) return;

    if (sourceColumnId === destColumnId) {
      const oldIndex = active.data.current.sortable.index;
      const newIndex = over.data.current.sortable.index;
      const newColumn = arrayMove(localColumns[sourceColumnId], oldIndex, newIndex);

      setLocalColumns(prev => ({
        ...prev,
        [sourceColumnId]: newColumn,
      }));
    } else {
      const sourceCards = [...localColumns[sourceColumnId]];
      const destCards = [...localColumns[destColumnId]];

      const [moved] = sourceCards.splice(active.data.current.sortable.index, 1);
      destCards.splice(over.data.current.sortable.index ?? destCards.length, 0, moved);

      setLocalColumns(prev => ({
        ...prev,
        [sourceColumnId]: sourceCards,
        [destColumnId]: destCards,
      }));
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="board-wrap">
        <div className="board">
          {columnOrder.map(key => (
            <Column
              key={key}
              columnId={key}
              title={columnTitles[key]}
              cards={localColumns[key] || []}
              updateCard={updateCard} // pass down
            />
          ))}
        </div>
      </div>
    </DndContext>
  );
}
