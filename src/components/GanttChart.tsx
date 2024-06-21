import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Paper, Button } from "@mui/material";
import { DATA, IData, ITask } from "../todo/todo.list";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "@hello-pangea/dnd";
import {
  PaperStyle,
  CategoryStyle,
  ListItemStyle,
  ListBoxStyle,
  ButtonStyle,
} from "../assets/styles/globalStyles";
import FormDialog from "./FormDialog";

interface DragDropProps {
  result: DropResult;
  columns: {
    [key: string]: {
      name: string;
      items: ITask[];
    };
  };
  setColumns: React.Dispatch<
    React.SetStateAction<{ [key: string]: { name: string; items: ITask[] } }>
  >;
}

const tasks: IData[] = DATA;
const backLog = tasks[0].tasks;
const todo = tasks[1].tasks;
const inProgress = tasks[2].tasks;
const done = tasks[3].tasks;

const taskStatus = {
  backLog: {
    name: "Backlog",
    items: backLog,
  },
  todo: {
    name: "Todo",
    items: todo,
  },
  inProgress: {
    name: "In Progress",
    items: inProgress,
  },
  done: {
    name: "Done",
    items: done,
  },
};

const onDragEnd = ({ result, columns, setColumns }: DragDropProps) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems,
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems,
      },
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems,
      },
    });
  }
};

const encodeState = (state: object) => {
  const json = JSON.stringify(state);
  const base64 = btoa(encodeURIComponent(json));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
};

const decodeState = (encodedState: string) => {
  const base64 = encodedState.replace(/-/g, "+").replace(/_/g, "/");
  const json = decodeURIComponent(atob(base64));
  return JSON.parse(json);
};

const GanttChart = () => {
  const { encodedState } = useParams();
  const navigate = useNavigate();

  const [columns, setColumns] = useState(
    encodedState ? decodeState(encodedState) : taskStatus
  );

  const [open, setOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleClickOpen = (columnId: string) => {
    setSelectedCategory(columnId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (newTask: ITask, columnId: string) => {
    const column = columns[columnId];
    const updatedItems = [...column.items, newTask];
    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems,
      },
    });
    handleClose();
  };

  useEffect(() => {
    navigate(`/${encodeState(columns)}`);
  }, [columns, navigate]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#7ed6df",
      }}
    >
      <Typography variant="h1" textAlign={"center"}>
        Gantt Chart
      </Typography>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <DragDropContext
          onDragEnd={(result: DropResult) =>
            onDragEnd({ result, columns, setColumns })
          }
        >
          {Object.entries(columns as object).map(
            ([columnId, column], _index) => {
              return (
                <Paper sx={PaperStyle} elevation={5} key={columnId}>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Typography variant="h4" sx={CategoryStyle}>
                      {column.name}
                    </Typography>
                  </Box>
                  <Box sx={ListBoxStyle}>
                    <Droppable droppableId={columnId} key={columnId}>
                      {(provided, snapshot) => {
                        return (
                          <>
                            <Box
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              sx={{
                                backgroundColor: snapshot.isDraggingOver
                                  ? "#c7ecee"
                                  : "inherit",
                                mt: 1,
                                py: 1,
                                height: "auto",
                                minHeight: "96%",
                                borderRadius: "15px",
                              }}
                            >
                              {column.items.map(
                                (item: ITask, index: number) => {
                                  return (
                                    <Draggable
                                      key={item.id}
                                      draggableId={item.id.toString()}
                                      index={index}
                                    >
                                      {(provided) => {
                                        return (
                                          <Box
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            sx={ListItemStyle}
                                          >
                                            <Typography variant="h6">
                                              {item.title}
                                            </Typography>
                                            <Typography>
                                              {item.description}
                                            </Typography>
                                            <Typography>
                                              {item.assignee}
                                            </Typography>
                                            <Typography>
                                              {item.creator}
                                            </Typography>
                                            <Typography>
                                              {item.createdAt}
                                            </Typography>
                                            <Typography>
                                              {item.deletedAt}
                                            </Typography>
                                          </Box>
                                        );
                                      }}
                                    </Draggable>
                                  );
                                }
                              )}
                              {provided.placeholder}
                            </Box>
                          </>
                        );
                      }}
                    </Droppable>
                  </Box>
                  <Button
                    sx={ButtonStyle}
                    onClick={() => handleClickOpen(columnId)}
                  >
                    + Add Item
                  </Button>
                </Paper>
              );
            }
          )}
        </DragDropContext>
      </Box>
      <FormDialog
        open={open}
        handleClose={handleClose}
        columnId={selectedCategory}
        onSubmit={(newTask: ITask, columnId: string) =>
          onSubmit(newTask, columnId)
        }
      />
    </Box>
  );
};

export default GanttChart;
