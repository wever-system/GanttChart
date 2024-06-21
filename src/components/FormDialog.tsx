import React, { useEffect, useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { ITask } from "../todo/todo.list"; // Adjust the import path accordingly
import {
  ButtonStyle,
  CancelButtonStyle,
  CategoryStyle,
} from "../assets/styles/globalStyles";

interface FormDialogProps {
  open: boolean;
  handleClose: () => void;
  columnId: string;
  onSubmit: (task: ITask, columnId: string) => void;
}

const FormDialog = ({
  open,
  handleClose,
  columnId,
  onSubmit,
}: FormDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    creator: "",
    createdAt: "",
    deletedAt: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    const newTask: ITask = {
      id: Math.floor(Math.random() * 1000) + 1,
      ...formData,
    };
    onSubmit(newTask, columnId);
  };

  const dateFormat = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  useEffect(() => {
    if (!open) {
      setFormData({
        title: "",
        description: "",
        assignee: "",
        creator: "",
        createdAt: dateFormat(),
        deletedAt: "",
      });
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={CategoryStyle}>Create Task</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please fill out the form below to create a new task.
        </DialogContentText>
        <Typography>Title</Typography>
        <TextField
          autoFocus
          id="title"
          type="text"
          size="small"
          fullWidth
          required
          value={formData.title}
          onChange={handleChange}
        />
        <Typography>Description</Typography>
        <TextField
          id="description"
          type="text"
          size="small"
          fullWidth
          value={formData.description}
          onChange={handleChange}
        />
        <Typography>Assignee</Typography>
        <TextField
          id="assignee"
          type="text"
          size="small"
          fullWidth
          required
          value={formData.assignee}
          onChange={handleChange}
        />
        <Typography>Creator</Typography>
        <TextField
          id="creator"
          type="text"
          size="small"
          fullWidth
          required
          value={formData.creator}
          onChange={handleChange}
        />
        <Typography>Created At</Typography>
        <TextField
          id="createdAt"
          type="text"
          size="small"
          fullWidth
          value={dateFormat()}
          onChange={handleChange}
        />
        <Typography>Deleted At</Typography>
        <TextField
          id="deletedAt"
          type="text"
          size="small"
          fullWidth
          value={formData.deletedAt}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={CancelButtonStyle}>
          Cancel
        </Button>
        <Button onClick={handleSubmit} sx={ButtonStyle}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialog;
