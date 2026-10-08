import React from "react";
import { useTranslation } from "react-i18next";
import vietnamFlag from "../../assets/images/vietnam.png";
import usFlag from "../../assets/images/united-states.png";

const LANGS = [
  { code: "vi", label: "VI", flag: vietnamFlag, name: "Tiếng Việt" },
  { code: "en", label: "EN", flag: usFlag, name: "English" },
];

export default function LanguageSwitch({ className = "" }) {
  const { i18n, t } = useTranslation();
  const current = i18n.language?.startsWith("en") ? "en" : "vi";

  const changeLanguage = (code) => {
    i18n.changeLanguage(code);
    localStorage.setItem("lng", code);
  };

  return (
    <div
      role="group"
      aria-label={t("content.language")}
      className={`inline-flex rounded-full border border-ink-line bg-ink-soft p-1 ${className}`}
    >
      {LANGS.map((lang) => {
        const active = current === lang.code;
        return (
          <button
            key={lang.code}
            type="button"
            title={lang.name}
            aria-pressed={active}
            onClick={() => changeLanguage(lang.code)}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
              active
                ? "bg-white text-brand-700 shadow-sm"
                : "text-ink-muted hover:text-ink"
            }`}
          >
            <img src={lang.flag} alt="" className="h-4 w-4 rounded-full object-cover" />
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
