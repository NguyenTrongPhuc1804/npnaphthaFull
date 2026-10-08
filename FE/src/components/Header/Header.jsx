import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Drawer from "../Drawer/DrawerComponent";
import LanguageSwitch from "./LanguageSwitch";
import { NAV_ITEMS } from "./navItems";
import { showDrawer } from "../../redux/reducer/LoadingSlice";
import logo from "../../assets/images/logo-cty.jpg";

export default function Header() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { isOpenDrawer } = useSelector((state) => state.loadingSlice);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeDrawer = () => dispatch(showDrawer(false));

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-30 border-b bg-white/90 backdrop-blur transition-shadow duration-200 ${
          scrolled ? "border-ink-line shadow-card" : "border-transparent"
        }`}
      >
        <div className="wrap flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link
            to="/"
            className="flex shrink-0 items-center"
            aria-label="NP NAPHTHA"
          >
            <img
              src={logo}
              alt="NP NAPHTHA"
              width={64}
              height={64}
              className="h-12 w-12 rounded-lg object-cover lg:h-14 lg:w-14"
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.end}
                    className={({ isActive }) =>
                      `relative rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors ${
                        isActive
                          ? "text-brand-600 after:absolute after:inset-x-3.5 after:-bottom-0.5 after:h-0.5 after:rounded-full after:bg-brand-500"
                          : "text-ink hover:bg-brand-50 hover:text-brand-700"
                      }`
                    }
                  >
                    {t(item.label)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <LanguageSwitch className="hidden sm:inline-flex" />
            <Link
              to="/contact"
              className="btn-primary hidden !py-2.5 lg:inline-flex"
            >
              {t("content.contact-now")}
            </Link>
            <button
              type="button"
              onClick={() => dispatch(showDrawer(!isOpenDrawer))}
              aria-label={
                isOpenDrawer ? t("content.close-menu") : t("content.open-menu")
              }
              aria-expanded={isOpenDrawer}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-ink-line text-ink transition-colors hover:bg-brand-50 lg:hidden"
            >
              <i
                className={`fa-solid ${
                  isOpenDrawer ? "fa-xmark" : "fa-bars"
                } text-lg`}
              />
            </button>
          </div>
        </div>
      </header>
      <Drawer closeDrawer={closeDrawer} />
    </>
  );
}
