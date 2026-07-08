import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { About } from "./pages/About";
import { Experience } from "./pages/Experience";
import { Home } from "./pages/Home";
import { Projects } from "./pages/Projects";
import { Research } from "./pages/Research";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/research" element={<Research />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
