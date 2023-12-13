import React from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Typography from "@mui/material/Typography";
import logo from "./images/logo.jpg";
import ImportData from "./pages/ImportData";
import FileUploader from "./components/FileUploader";
import Output from "./pages/Output";
import CChart from "./pages/CChart";
import Box from "@mui/material/Box";
import ProgramOverview from './pages/ProgramOverview';
import InstructionPage from './pages/InstructionPage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Box className="header-container">
          <img className="logo" src={logo} alt="Logo" />
          <Typography variant="h6" className="header-title">
            <b>HSYE INSTITUTE EPIDEMIC SURVEILLANCE TOOL</b>
          </Typography>
        </Box>
        <Navbar />
        <Routes>
          <Route path="importData" element={<ImportData />} />
          <Route path="c-Chart" element={<CChart />} />
          <Route path="output" element={<Output />} />
          <Route path="programOverview" element={<ProgramOverview />} />
          <Route path="instructions" element={<InstructionPage />} />
        </Routes>
      </BrowserRouter>
      <FileUploader />
    </>
  );
}

export default App;
