import React from "react";
import { Outlet } from "react-router-dom";
import { SideNav } from "../../layout/Dashboard/SideNav/SideNav";
import NavBarAdmin from "../../layout/Dashboard/NavBar/NavBarAdmin";
import ModalComponent from "../../components/Modal/ModalComponent";

export default function AdminTheme() {
  return (
    <div className="min-h-screen bg-ink-soft">
      <SideNav />
      <div className="flex min-h-screen min-w-0 flex-col lg:pl-64">
        <NavBarAdmin />
        <main className="min-w-0 flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
      <ModalComponent />
    </div>
  );
}
