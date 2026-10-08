import moment from "moment";
import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// Thẻ tin nổi bật (lớn)
export default function CardBlogV1({ item }) {
  const { t } = useTranslation();
  if (!item) return null;

  return (
    <article className="group">
      <Link
        to={`/blog/${item.slug}`}
        className="relative block overflow-hidden rounded-3xl bg-brand-950 shadow-card"
      >
        <div className="aspect-[16/9] lg:aspect-[16/8]">
          {item.image && (
            <img
              src={item.image}
              alt={item.title || ""}
              decoding="async"
              className="h-full w-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
            />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
          <time
            dateTime={item.createdAt}
            className="inline-block rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold text-white"
          >
            {moment(item.createdAt).format("DD/MM/YYYY")}
          </time>
          <h3 className="mt-3 line-clamp-2 text-xl font-bold leading-snug text-white sm:text-2xl lg:text-3xl">
            {item.title}
          </h3>
          <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-brand-200">
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
