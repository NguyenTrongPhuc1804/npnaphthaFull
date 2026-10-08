import React from "react";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "../Header/navItems";
import logo from "../../assets/images/logo-cty.jpg";

const MAP_SRC =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.1062341072443!2d107.11225937508347!3d10.403390189723584!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31757187c9838bd1%3A0xd1a9bd3c97318714!2zQ8O0bmcgVHkgVE5ISCBT4bqjbiBYdeG6pXQgdsOgIFRoxrDGoW5nIE3huqFpIE5QIC0gTkFQSFRIQQ!5e1!3m2!1svi!2s!4v1712996382242!5m2!1svi!2s";

const contactRows = (t) => [
  { icon: "fa-location-dot", text: t("content.Office") },
  { icon: "fa-industry", text: t("content.Factory") },
  { icon: "fa-phone", text: t("content.Phone") },
  {
    icon: "fa-envelope",
    text: "Email: trucphong@npnaphtha.com.vn - trungnghia@npnaphtha.com.vn",
  },
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-brand-950 text-slate-300">
      <div className="wrap grid gap-10 py-14 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-4">
          <div className="flex items-center gap-3">
            <img
              src={logo}
              alt="NP NAPHTHA"
              loading="lazy"
              className="h-12 w-12 rounded-lg object-cover"
            />
            <span className="text-lg font-bold text-white">NP NAPHTHA</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            {t("content.footer-about")}
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className="text-slate-400 transition-colors hover:text-brand-300"
                >
                  {t(item.label)}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-base font-semibold uppercase tracking-wider text-white">
            {t("content.contact-info")}
          </h2>
          <ul className="mt-5 space-y-4 text-sm leading-6">
            {contactRows(t).map((row) => (
              <li key={row.icon} className="flex gap-3">
                <i
                  className={`fa-solid ${row.icon} mt-1 w-4 shrink-0 text-center text-brand-400`}
                  aria-hidden="true"
                />
                <span>{row.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-4">
          <h2 className="text-base font-semibold uppercase tracking-wider text-white">
            {t("content.map")}
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-white/10">
            <iframe
              title="NP NAPHTHA map"
              src={MAP_SRC}
              width="100%"
              height={240}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="wrap py-5 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {t("content.intro-banner")}
        </p>
      </div>
    </footer>
  );
}
