import { Box, Typography, Paper } from "@mui/material";
import { DATA, ITask } from "../todo/todo.list";
import { useRef, useState } from "react";

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

const GanttChart = () => {
  const [list, setList] = useState(DATA);
  const [backLog, setBackLog] = useState(DATA[0].tasks);
  const [toDo, setToDo] = useState(DATA[1].tasks);
  const [inProgress, setInProgress] = useState(DATA[2].tasks);
  const [done, setDone] = useState(DATA[3].tasks);

  const dragItem = useRef<{ categoryIndex: number; taskIndex: number } | null>(
    null
  );
  const dragOverItem = useRef<{
    categoryIndex: number;
    taskIndex: number;
  } | null>(null);

  const dragStart = (
    e: React.DragEvent<HTMLDivElement>,
    categoryIndex: number,
    taskIndex: number
  ) => {
    dragItem.current = { categoryIndex, taskIndex };
    console.log("Drag start", e.target);
  };

  const dragEnter = (
    e: React.DragEvent<HTMLDivElement>,
    categoryIndex: number,
    taskIndex: number
  ) => {
    dragOverItem.current = { categoryIndex, taskIndex };
    console.log("Drag enter", e.target);
  };

  const drop = (categoryIndex: number) => {
    if (!dragItem.current) return;

    const newList = [...list];
    const { categoryIndex: dragCategoryIndex, taskIndex: dragTaskIndex } =
      dragItem.current;

    const dragItemContent = newList[dragCategoryIndex].tasks[dragTaskIndex];

    newList[dragCategoryIndex].tasks.splice(dragTaskIndex, 1);

    if (dragOverItem.current) {
      const { categoryIndex: dropCategoryIndex, taskIndex: dropTaskIndex } =
        dragOverItem.current;
      newList[dropCategoryIndex].tasks.splice(
        dropTaskIndex,
        0,
        dragItemContent
      );
    } else {
      newList[categoryIndex].tasks.push(dragItemContent);
    }

    dragItem.current = null;
    dragOverItem.current = null;
    setList(newList);
    setBackLog(newList[0].tasks);
    setToDo(newList[1].tasks);
    setInProgress(newList[2].tasks);
    setDone(newList[3].tasks);
  };

  const ListItem = ({
    task,
    categoryIndex,
    taskIndex,
  }: {
    task: ITask;
    categoryIndex: number;
    taskIndex: number;
  }) => {
    return (
      <Box
        style={ListItemStyle}
        key={task.id}
        draggable
        onDragStart={(e) => dragStart(e, categoryIndex, taskIndex)}
        onDragEnter={(e) => dragEnter(e, categoryIndex, taskIndex)}
        onDragEnd={() => drop(categoryIndex)}
        onDragOver={(e) => e.preventDefault()}
      >
        <Typography variant="h5">{task.title}</Typography>
        <Typography>{task.description}</Typography>
        <Typography>{task.assignee}</Typography>
        <Typography>{task.creator}</Typography>
        <Typography>{task.createdAt}</Typography>
        <Typography>{task.deletedAt}</Typography>
      </Box>
    );
  };

  const CategoryItem = ({
    categoryIndex,
    category,
    tasks,
  }: {
    categoryIndex: number;
    category: string;
    tasks: ITask[];
  }) => {
    return (
      <Paper
        sx={PaperStyle}
        elevation={5}
        onDragEnter={(e) => dragEnter(e, categoryIndex, tasks.length)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => drop(categoryIndex)}
      >
        <Typography sx={CategoryStyle}>{category}</Typography>
        {tasks.map((task, index) => (
          <ListItem
            task={task}
            categoryIndex={categoryIndex}
            taskIndex={index}
            key={task.id}
          />
        ))}
      </Paper>
    );
  };

  return (
    <Box width={"100vw"}>
      <Typography variant="h1" textAlign={"center"}>
        Gantt Chart
      </Typography>
      <Box display={"flex"}>
        <CategoryItem
          categoryIndex={0}
          category={DATA[0].category}
          tasks={backLog}
        />
        <CategoryItem
          categoryIndex={1}
          category={DATA[1].category}
          tasks={toDo}
        />
        <CategoryItem
          categoryIndex={2}
          category={DATA[2].category}
          tasks={inProgress}
        />
        <CategoryItem
          categoryIndex={3}
          category={DATA[3].category}
          tasks={done}
        />
      </Box>
    </Box>
  );
};

export default GanttChart;
