import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GanttChart from "./components/GanttChart";

const router = createBrowserRouter([
  {
    path: "/:encodedState?",
    element: <GanttChart />,
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
