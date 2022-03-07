import React from "react";
import ReactDOM from "react-dom";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import { PartialTheme, ThemeProvider } from "@fluentui/react";

initializeIcons();

const theme: PartialTheme = {
  palette: {
    themeDarker: "#d7afcb",
    black: "#f8f8f8",
    neutralTertiaryAlt: "#000000",
    themeDark: "#c996ba",
    neutralDark: "#f4f4f4",
    themeDarkAlt: "#bf86ae",
    neutralPrimary: "#ffffff",
    neutralQuaternaryAlt: "#000000",
    themePrimary: "#b87ba5",
    neutralPrimaryAlt: "#dadada",
    neutralLight: "#000000",
    themeSecondary: "#a26c92",
    neutralSecondary: "#d0d0d0",
    neutralLighter: "#000000",
    themeTertiary: "#6e4a63",
    neutralTertiary: "#c8c8c8",
    neutralLighterAlt: "#000000",
    themeLight: "#372532",
    white: "#000000",
    themeLighter: "#1d141a",
    themeLighterAlt: "#070507",
  },
};

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
