/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const defaultColors = require("tailwindcss/colors");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: [
        '"Be Vietnam Pro"',
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        '"Segoe UI"',
        "Roboto",
        "sans-serif",
      ],
    },
    extend: {
      colors: {
        // màu cũ vẫn được giữ để các component hiện tại không bị ảnh hưởng
        redct: "#e53935",
        colorPrimary: "#3a9ef1",
        // Material Tailwind không có sẵn thang slate nên bổ sung lại
        slate: defaultColors.slate,
        // thang màu thương hiệu (xanh dương NP NAPHTHA)
        // đồng thời ghi đè "blue" để các component Material Tailwind (color="blue") cùng tông
        blue: {
          50: "#eff7ff",
          100: "#dbeefe",
          200: "#bfe0fe",
          300: "#93cbfd",
          400: "#5fb0f8",
          500: "#3a9ef1",
          600: "#2182dc",
          700: "#1c69b8",
          800: "#1c5895",
          900: "#1b4a78",
        },
        brand: {
          50: "#eff7ff",
          100: "#dbeefe",
          200: "#bfe0fe",
          300: "#93cbfd",
          400: "#5fb0f8",
          500: "#3a9ef1",
          600: "#2182dc",
          700: "#1c69b8",
          800: "#1c5895",
          900: "#1b4a78",
          950: "#0f2c4a",
        },
        // màu chữ / nền trung tính
        ink: {
          DEFAULT: "#0f2238",
          muted: "#5b6b7e",
          line: "#e5eaf0",
          soft: "#f4f7fb",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.04), 0 4px 16px rgba(16,24,40,.06)",
        "card-hover": "0 10px 32px rgba(16,24,40,.14)",
      },
    },
  },
  plugins: [],
});
