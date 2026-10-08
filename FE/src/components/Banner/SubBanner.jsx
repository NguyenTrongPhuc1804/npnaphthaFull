import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function SubBanner({ title, subTitle, bg }) {
  const { t } = useTranslation();

  return (
    <header className="relative isolate overflow-hidden bg-brand-950">
      {bg && (
        <img
          src={bg}
          alt=""
          aria-hidden="true"
          onError={(e) => {
            e.currentTarget.style.display = "none";
          }}
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
        />
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-950 via-brand-900/85 to-brand-700/40" />
      <div className="wrap py-12 lg:py-16">
        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-brand-200">
          <Link to="/" className="hover:text-white">
            {t("content.home")}
          </Link>
          <span className="mx-2 opacity-60">/</span>
          <span className="text-white/90">{title}</span>
        </nav>
        <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        {subTitle && (
          <p className="mt-3 max-w-2xl text-base text-brand-100">{subTitle}</p>
        )}
      </div>
    </header>
  );
}
