import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Projects from "./pages/projects";
import Project from "./pages/projects/Project";
import ProjectStats from "./pages/projects/Stats";
import AddProject from "./pages/projects/Add";
import Commits from "./pages/projects/Commits";
import Meetings from "./pages/meetings";
import ArrangeMeeting from "./pages/meetings/arrange";
import Tasks from "./pages/projects/tasks";
import AddTask from "./pages/projects/tasks/Add";
import Task from "./pages/projects/tasks/task";
import Students from "./pages/students";
import GoogleDrive from "pages/integrations/clouddrive/google";
import GoogleCalendar from "pages/integrations/planner/google";
import GitHub from "pages/integrations/gitrepo/github";
import Profile from "pages/profile";
import Integrations from "pages/profile/integrations";
import 'bootstrap/dist/css/bootstrap.min.css';
import "css/style.css"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/profile" >
            <Route path=":accountId/">
              <Route index element={<Profile />} />
              <Route path="settings" element={<Home />} />
              <Route path="integrations" element={<Integrations />} />
            </Route>
          </Route>
          <Route path="projects/" >
            <Route index element={<Projects />} />
            <Route path=":projectId/">
              <Route index element={<Project />} />
              <Route path="commits" element={<Commits />} />
              <Route path="stats" element={<ProjectStats />} />
              <Route path="tasks" >
                <Route index element={<Tasks />} />
                <Route path=":taskId/">
                  <Route index element={<Task />} />
                </Route>
                <Route path="add" element={<AddTask />} />
              </Route>
            </Route>
            <Route path="add" element={<Home />} />
          </Route>
          <Route path="meetings" >
            <Route index element={<Meetings />} />
            <Route path="arrange" element={<ArrangeMeeting />} />
          </Route>
          <Route path="scientificleadership/add" element={<AddProject />} />
          <Route path="integration/" >
            <Route path="googlecalendar" >
              <Route index element={<GoogleCalendar />} />
              <Route path="success" element={<Home />} />
            </Route>
            <Route path="googledrive" >
              <Route index element={<GoogleDrive />} />
              <Route path="success" element={<Home />} />
            </Route>
            <Route path="github" >
              <Route index element={<GitHub />} />
              <Route path="success" element={<Home />} />
            </Route>
          </Route>
          <Route path="scientificleadership/add" element={<AddProject />} />
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