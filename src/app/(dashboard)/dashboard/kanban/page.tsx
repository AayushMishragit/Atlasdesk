"use client";

import { useEffect, useState } from "react";
import type { DragEvent } from "react";

type Card = {
  id: string;
  title: string;
};

type Column = {
  id: string;
  title: string;
  cards: Card[];
};

type DraggedCard = {
  cardId: string;
  sourceColumnId: string;
};

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    cards: [
      {
        id: "card-1",
        title: "Design homepage",
      },
      {
        id: "card-2",
        title: "Create wireframes",
      },
      {
        id: "card-3",
        title: "Write documentation",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    cards: [
      {
        id: "card-4",
        title: "Build dashboard",
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    cards: [
      {
        id: "card-5",
        title: "Set up project",
      },
    ],
  },
];

export default function Home() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedCard, setDraggedCard] = useState<DraggedCard | null>(null);
  const [dragOverColumnId, setDragOverColumnId] = useState<string | null>(null);

  useEffect(() => {
    const savedBoard = window.localStorage.getItem("trello-board");

    if (!savedBoard) {
      return;
    }

    try {
      const parsedBoard: Column[] = JSON.parse(savedBoard);
      setColumns(parsedBoard);
    } catch {
      window.localStorage.removeItem("trello-board");
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("trello-board", JSON.stringify(columns));
  }, [columns]);

  function handleDragStart(
    event: DragEvent<HTMLElement>,
    cardId: string,
    sourceColumnId: string,
  ): void {
    setDraggedCard({
      cardId,
      sourceColumnId,
    });

    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", cardId);
  }

  function handleDragOver(
    event: DragEvent<HTMLElement>,
    columnId: string,
  ): void {
    event.preventDefault();

    event.dataTransfer.dropEffect = "move";
    setDragOverColumnId(columnId);
  }

  function handleDrop(
    event: DragEvent<HTMLElement>,
    targetColumnId: string,
  ): void {
    event.preventDefault();

    if (!draggedCard) {
      return;
    }

    const { cardId, sourceColumnId } = draggedCard;

    if (sourceColumnId === targetColumnId) {
      resetDragState();
      return;
    }

    let cardToMove: Card | undefined;

    const columnsWithoutCard = columns.map((column) => {
      if (column.id !== sourceColumnId) {
        return column;
      }

      cardToMove = column.cards.find((card) => card.id === cardId);

      return {
        ...column,
        cards: column.cards.filter((card) => card.id !== cardId),
      };
    });

    if (!cardToMove) {
      resetDragState();
      return;
    }

    const updatedColumns = columnsWithoutCard.map((column) => {
      if (column.id !== targetColumnId) {
        return column;
      }

      return {
        ...column,
        cards: [...column.cards, cardToMove as Card],
      };
    });

    setColumns(updatedColumns);
    resetDragState();
  }

  function handleDragEnd(): void {
    resetDragState();
  }

  function handleDragLeave(
    event: DragEvent<HTMLElement>,
    columnId: string,
  ): void {
    const currentTarget = event.currentTarget;
    const relatedTarget = event.relatedTarget;

    if (
      relatedTarget instanceof Node &&
      currentTarget.contains(relatedTarget)
    ) {
      return;
    }

    if (dragOverColumnId === columnId) {
      setDragOverColumnId(null);
    }
  }

  function resetDragState(): void {
    setDraggedCard(null);
    setDragOverColumnId(null);
  }

  return (
    <main className="min-h-screen overflow-x-auto bg-[#172b4d] p-6">
      <div className="mx-auto flex min-w-max items-start gap-5">
        {columns.map((column) => {
          const isDragOver = dragOverColumnId === column.id;

          return (
            <section
              key={column.id}
              onDragOver={(event) => handleDragOver(event, column.id)}
              onDrop={(event) => handleDrop(event, column.id)}
              onDragLeave={(event) => handleDragLeave(event, column.id)}
              className={[
                "w-72 shrink-0 rounded-lg bg-[#ebecf0] p-4 transition",
                isDragOver ? "ring-2 ring-blue-500" : "",
              ].join(" ")}
            >
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-[#172b4d]">
                  {column.title}
                </h2>

                <span className="rounded-full bg-slate-300 px-2 py-1 text-xs font-medium text-slate-700">
                  {column.cards.length}
                </span>
              </div>

              <div className="min-h-20 space-y-3">
                {column.cards.map((card) => {
                  const isDragging = draggedCard?.cardId === card.id;

                  return (
                    <article
                      key={card.id}
                      draggable
                      onDragStart={(event) =>
                        handleDragStart(event, card.id, column.id)
                      }
                      onDragEnd={handleDragEnd}
                      className={[
                        "rounded-md bg-white p-4 text-[#172b4d]",
                        "select-none shadow-sm transition",
                        "hover:bg-slate-50",
                        isDragging
                          ? "cursor-grabbing opacity-40"
                          : "cursor-grab",
                      ].join(" ")}
                    >
                      {card.title}
                    </article>
                  );
                })}

                {column.cards.length === 0 && (
                  <div className="rounded-md border-2 border-dashed border-slate-300 p-5 text-center text-sm text-slate-500">
                    Drop a card here
                  </div>
                )}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
