import React from "react";
import ReactDOM from "react-dom";
import Container from "@material-ui/core/Container";
import "./index.css";
import App from "./App";

ReactDOM.render(
  <React.StrictMode>
    <Container maxWidth="sm">
      <App />
    </Container>
  </React.StrictMode>,
  document.getElementById("root")
);
