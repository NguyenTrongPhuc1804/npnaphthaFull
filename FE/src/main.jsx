import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "@fontsource/be-vietnam-pro/400.css";
import "@fontsource/be-vietnam-pro/500.css";
import "@fontsource/be-vietnam-pro/600.css";
import "@fontsource/be-vietnam-pro/700.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { I18nextProvider } from "react-i18next";
import i18n from "./tranlation/i18n.js";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@material-tailwind/react";
// Màu mặc định của các component Material Tailwind (admin) theo tông thương hiệu
const mtTheme = {
  button: { defaultProps: { color: "blue" } },
  checkbox: { defaultProps: { color: "blue" } },
  input: { defaultProps: { color: "blue" } },
  textarea: { defaultProps: { color: "blue" } },
  select: { defaultProps: { color: "blue" } },
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <HelmetProvider>
      <ThemeProvider value={mtTheme}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </ThemeProvider>
    </HelmetProvider>
  </Provider>
);
