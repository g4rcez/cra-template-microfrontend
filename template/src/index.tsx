import React from "react";
import ReactDOM from "react-dom";
import Colors from "./components/layout/colors.json";
import { setCssVars } from "@arcanishq/styleguide";
import "./styles/css/dist.css";

const root: HTMLElement = document.querySelector(":root") as any;

setCssVars(Colors as never, root);

ReactDOM.render(
  <React.StrictMode>
    <h1>Hack The Planet</h1>
  </React.StrictMode>,
  document.getElementById("root")
);
