import React from "react";
import { Drawer } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "../../redux/reducer/DrawerSlice";

export default function DrawerCustomComponent() {
  const dispatch = useDispatch();
  const { title, showDrawer, body } = useSelector((state) => state.drawerSlice);
  const hideDrawer = () => dispatch(closeDrawer());

  return (
    <Drawer
      open={showDrawer}
      onClose={hideDrawer}
      className="overflow-y-auto p-6"
      overlayProps={{ className: "fixed inset-0 bg-ink/50 backdrop-blur-sm" }}
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-bold text-ink">{title}</h2>
        <button
          type="button"
          onClick={hideDrawer}
          aria-label="Đóng"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-muted hover:bg-ink-soft hover:text-ink"
        >
          <i className="fa-solid fa-xmark text-lg" />
        </button>
      </div>
      {body}
    </Drawer>
  );
}
