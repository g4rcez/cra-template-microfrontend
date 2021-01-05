import React, { Profiler } from "react";
import ReactDOM from "react-dom";
import Colors from "./components/layout/colors.json";
import { setCssVars, SubTitle } from "@arcanishq/styleguide";
import "./styles/css/dist.css";

const root: HTMLElement = document.querySelector(":root") as any;

setCssVars(Colors as never, root);

ReactDOM.render(
  <React.StrictMode>
    <Profiler>
      <SubTitle>Hack The Planet</SubTitle>
    </Profiler>
  </React.StrictMode>,
  document.getElementById("root")
);
