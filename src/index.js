import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="projects/" element={<Home />}>
            <Route path=":projectId/" element={<Home />} >
              <Route path="commits" element={<Home />} />
              <Route path="tasks" element={<Home />} >
                <Route path="add" element={<Home />} />
              </Route>
            </Route>
            <Route path="add" element={<Home />} />
          </Route>
          <Route path="meetings/" element={<Home />}>
            <Route path="add" element={<Home />} />
          </Route>
          <Route path="scientificleadership/add" element={<Home />} />
          <Route path="students/" element={<Home />}>
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