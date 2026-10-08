import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function ScrollTop() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t("content.scroll-top")}
      className={`fixed bottom-6 left-4 z-20 flex h-11 w-11 items-center justify-center rounded-full bg-white text-brand-600 shadow-card ring-1 ring-ink-line transition-all duration-200 hover:bg-brand-500 hover:text-white ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <i className="fa-solid fa-arrow-up" />
    </button>
  );
}
