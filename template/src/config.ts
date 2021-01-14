import Colors from "./components/layout/colors.json";
import { setCssVars } from "@arcanishq/styleguide";
import "./styles/css/dist.css";

const root: HTMLElement = document.querySelector(":root") as any;
setCssVars(Colors as never, root);

declare var __webpack_public_path__: string;
if (process.env.NODE_ENV !== "development") {
  __webpack_public_path__ = (window as any).__webpack_public_path__;
}
