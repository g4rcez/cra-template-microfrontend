import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./config";
import { Routes } from "./routes";

const root = document.getElementById("root");

ReactDOM.render(
  <StrictMode>
    <Routes />
  </StrictMode>,
  root
);
