import React from "react";
import { Drawer } from "@material-tailwind/react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import LanguageSwitch from "../Header/LanguageSwitch";
import { NAV_ITEMS } from "../Header/navItems";
import logo from "../../assets/images/logo-cty.jpg";

export default function DrawerComponent({ closeDrawer }) {
  const { t } = useTranslation();
  const { isOpenDrawer } = useSelector((state) => state.loadingSlice);

  return (
    <Drawer
      open={isOpenDrawer}
      onClose={closeDrawer}
      placement="right"
      size={320}
      className="flex flex-col bg-white p-0 lg:hidden"
      overlayProps={{ className: "fixed inset-0 bg-ink/50 backdrop-blur-sm" }}
    >
      <div className="flex h-16 items-center justify-between border-b border-ink-line px-5">
        <img src={logo} alt="NP NAPHTHA" className="h-10 w-10 rounded-lg object-cover" />
        <button
          type="button"
          onClick={closeDrawer}
          aria-label={t("content.close-menu")}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-line text-ink hover:bg-brand-50"
        >
          <i className="fa-solid fa-xmark text-lg" />
        </button>
      </div>

      <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                onClick={closeDrawer}
                className={({ isActive }) =>
                  `block rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-brand-50 text-brand-700"
                      : "text-ink hover:bg-ink-soft"
                  }`
                }
              >
                {t(item.label)}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="space-y-4 border-t border-ink-line p-5">
        <LanguageSwitch className="w-full justify-center sm:hidden" />
        <Link to="/contact" onClick={closeDrawer} className="btn-primary w-full">
          {t("content.contact-now")}
        </Link>
      </div>
    </Drawer>
  );
}
