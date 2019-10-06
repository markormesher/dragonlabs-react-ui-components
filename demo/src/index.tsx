import React from "react";
import * as ReactDOM from "react-dom";
import { App } from "./App";

// "require" forces webpack to include entire stylesheets; "import" only works for named exports
require("./global-styles/Bootstrap.scss");

ReactDOM.render(<App />, document.getElementById("root"));
