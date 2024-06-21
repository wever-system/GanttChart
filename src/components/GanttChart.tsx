import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";
import { DATA, IData, ITask } from "../todo/todo.list";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

interface DragDropProps {
  result: any;
  columns: any;
  setColumns: any;
}

const PaperStyle = {
  width: "25%",
  height: "auto",
  padding: "10px",
  margin: "10px",
};

const CategoryStyle = {
  fontSize: "1.5rem",
  textAlign: "center",
};

const ListItemStyle = {
  backgroundColor: "#f9f9f9",
  padding: "10px",
  margin: "10px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  cursor: "grab",
};

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
  return btoa(JSON.stringify(state));
};

const decodeState = (encodedState: string) => {
  return JSON.parse(atob(encodedState));
};

const GanttChart = () => {
  const { encodedState } = useParams();
  const navigate = useNavigate();

  const [columns, setColumns] = useState(
    encodedState ? decodeState(encodedState) : taskStatus
  );

  useEffect(() => {
    navigate(`/${encodeState(columns)}`);
  }, [columns, navigate]);

  return (
    <Box>
      <Typography variant="h1" textAlign={"center"}>
        Gantt Chart
      </Typography>
      <Box style={{ display: "flex", justifyContent: "space-between" }}>
        <DragDropContext
          onDragEnd={(result: any) =>
            onDragEnd({ result, columns, setColumns })
          }
        >
          {Object.entries(columns as object).map(
            ([columnId, column], _index) => {
              return (
                <Paper sx={PaperStyle} elevation={5} key={columnId}>
                  <Typography variant="h4" sx={CategoryStyle}>
                    {column.name}
                  </Typography>
                  <Droppable droppableId={columnId} key={columnId}>
                    {(provided: any) => {
                      return (
                        <Box
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          sx={{
                            minHeight: 500,
                            padding: 1,
                          }}
                        >
                          {column.items.map((item: ITask, index: number) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id.toString()}
                                index={index}
                              >
                                {(provided: any) => {
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
                                      <Typography>{item.assignee}</Typography>
                                      <Typography>{item.creator}</Typography>
                                      <Typography>{item.createdAt}</Typography>
                                      <Typography>{item.deletedAt}</Typography>
                                    </Box>
                                  );
                                }}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </Box>
                      );
                    }}
                  </Droppable>
                </Paper>
              );
            }
          )}
        </DragDropContext>
      </Box>
    </Box>
  );
};

export default GanttChart;
