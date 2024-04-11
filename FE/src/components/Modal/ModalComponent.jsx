import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/reducer/ModalSlice";

export default function ModalComponent() {
  const dispatch = useDispatch();
  const { showModal, body, callBack, title } = useSelector(
    (state) => state.modalSlice
  );
  const handleClose = () => dispatch(closeModal());
  return (
    <div className="-z-10 ">
      <Dialog size="lg" className="" open={showModal}>
        <DialogHeader>
          <div className="w-full justify-between flex items-center">
            <p className="text-3xl font-semibold ">{title}</p>
            <Button className="py-2 px-3" color="red" onClick={handleClose}>
              X
            </Button>
          </div>
        </DialogHeader>
        <DialogBody>{body}</DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleClose}
            className="mr-1"
          >
            <span>Hủy</span>
          </Button>
          <Button variant="gradient" onClick={callBack}>
            <span>Lưu</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}
