import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function CardBlogV2({ item }) {
  const { t } = useTranslation();

  return (
    <article className="group h-full">
      <Link
        to={`/blog/${item?.slug}`}
        className="flex h-full flex-col overflow-hidden rounded-2xl border border-ink-line bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
      >
        <div className="aspect-[16/10] overflow-hidden bg-ink-soft">
          {item?.image && (
            <img
              src={item.image}
              alt={item?.title || ""}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-5">
          <time
            dateTime={item?.createdAt}
            className="text-xs font-semibold uppercase tracking-wider text-brand-600"
          >
            {moment(item?.createdAt).format("DD/MM/YYYY")}
          </time>
          <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-700">
            {item?.title}
          </h3>
          <span className="mt-auto inline-flex items-center gap-2 pt-4 text-sm font-semibold text-brand-600">
            {t("content.read-more")}
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
