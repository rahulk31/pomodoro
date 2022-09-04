import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home/HomePage";
import Tasks from "./pages/Tasks/Tasks";
import SingleTask from "./pages/SingleTask/SingleTask";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/task/:taskId" element={<SingleTask />} />
      </Routes>
    </>
  );
}

export default App;
