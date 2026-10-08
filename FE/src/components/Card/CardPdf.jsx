import React from "react";
import { useTranslation } from "react-i18next";

export default function CardPdf({ data }) {
  const { t } = useTranslation();

  return (
    <a
      href={data?.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <div className="aspect-[4/3] overflow-hidden bg-ink-soft">
        {data?.image && (
          <img
            src={data.image}
            alt={data?.name || ""}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="line-clamp-2 text-base font-semibold leading-snug text-ink group-hover:text-brand-700">
          {data?.name}
        </h3>
        <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-brand-600">
          <i className="fa-regular fa-file-pdf" aria-hidden="true" />
          {t("content.download")}
        </span>
      </div>
    </a>
  );
}
