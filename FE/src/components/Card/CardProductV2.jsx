import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

export default function CardProductV2({ data }) {
  const { t } = useTranslation();
  const { listAllCategory } = useSelector((state) => state.categorySlice);
  const categoryName = listAllCategory?.data?.find(
    (c) => c.slug === data?.type
  )?.name;

  return (
    <article className="group h-full">
      <Link
        to={`/product/${data?.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-ink-soft">
          {data?.image ? (
            <img
              src={data.image}
              alt={data?.name || ""}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-brand-300">
              <i className="fa-regular fa-image text-4xl" aria-hidden="true" />
            </div>
          )}
          {categoryName && (
            <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-700 shadow-sm">
              {categoryName}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col p-4">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug text-ink transition-colors group-hover:text-brand-700">
            {data?.name}
          </h3>
          <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-brand-600">
            {t("content.view-detail")}
            <i
              className="fa-solid fa-arrow-right text-xs transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
}
