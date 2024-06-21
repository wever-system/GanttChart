export const PaperStyle = {
  width: "25%",
  height: "85vh",
  p: 1,
  m: 1,
  backgroundColor: "#dff9fb",
  display: "flex",
  flexDirection: "column",
};

export const CategoryStyle = {
  width: "100%",
  fontSize: "1.5rem",
  textAlign: "center",
};

export const ListBoxStyle = {
  height: "92%",
  overflowY: "auto",
  scrollbarWidth: "none",
};

export const ListItemStyle = {
  p: 1,
  height: "auto",
  margin: "10px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  backgroundColor: "#fff",
  boxShadow: "0 1px 5px 0 rgba(0,0,0,0.2)",
  cursor: "grab",
};

export const ButtonStyle = {
  width: "100%",
  p: 1,
  fontSize: "1rem",
  backgroundColor: "#f0932b",
  color: "#fff",
  textTransform: "none",
  "&:hover": {
    backgroundColor: "#ffbe76",
  },
};

export const CancelButtonStyle = {
  ...ButtonStyle,
  backgroundColor: "#eb4d4b",
};
