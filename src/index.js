import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Projects from "./pages/projects";
import Project from "./pages/projects/Project";
import Commits from "./pages/projects/Commits";
import Meetings from "./pages/meetings";
import Tasks from "./pages/tasks";
import Students from "./pages/students";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects/" >
            <Route index element={<Projects />} />
            <Route path=":projectId/">
            <Route index element={<Project />} />
              <Route path="commits" element={<Commits />} />
              <Route path="tasks" element={<Tasks />} >
                <Route path="add" element={<Home />} />
              </Route>
            </Route>
            <Route path="add" element={<Home />} />
          </Route>
          <Route path="meetings/" >
            <Route index element={<Meetings />} />
            <Route path="arrange" element={<Home />} />
          </Route>
          <Route path="scientificleadership/add" element={<Home />} />
          <Route path="students/" >
            <Route index element={<Students />} />
            <Route path="add" element={<Home />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);