import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { I18nextProvider } from "react-i18next";
import i18n from "./tranlation/i18n.js";
import { HelmetProvider } from "react-helmet-async";
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeProvider>
      <I18nextProvider i18n={i18n}>
        <HelmetProvider>
          <App />
        </HelmetProvider>
      </I18nextProvider>
    </ThemeProvider>
  </Provider>
);
