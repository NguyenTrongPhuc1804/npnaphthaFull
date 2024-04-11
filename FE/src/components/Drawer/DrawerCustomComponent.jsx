import React, { useState } from "react";
import { Drawer } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer } from "../../redux/reducer/DrawerSlice";

export default function DrawerCustomComponent() {
  const dispatch = useDispatch();
  const { title, showDrawer, body } = useSelector((state) => state.drawerSlice);
  const hideDrawer = () => {
    dispatch(closeDrawer());
  };
  return (
    <Drawer open={showDrawer} onClose={hideDrawer} className="p-4 !pl-0 ">
      {/* <div className="flex items-center justify-between pl-6">
        <Typography variant="h6" color="red">
          Danh mục
        </Typography>
        <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div> */}
      <p>{title}</p>
      {body}
    </Drawer>
  );
}
