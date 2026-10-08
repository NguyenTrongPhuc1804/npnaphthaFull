import React from "react";
import {
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
    <Dialog
      size="xl"
      open={showModal}
      className="flex max-h-[90vh] flex-col overflow-hidden rounded-2xl"
    >
      <DialogHeader className="shrink-0 justify-between border-b border-ink-line px-6 py-4">
        <h2 className="text-xl font-bold text-ink sm:text-2xl">{title}</h2>
        <button
          type="button"
          onClick={handleClose}
          aria-label="Đóng"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-ink-muted transition-colors hover:bg-ink-soft hover:text-ink"
        >
          <i className="fa-solid fa-xmark text-lg" />
        </button>
      </DialogHeader>
      <DialogBody className="flex-1 overflow-y-auto px-4 sm:px-6">
        {body}
      </DialogBody>
      <DialogFooter className="shrink-0 gap-3 border-t border-ink-line px-6 py-4">
        <button type="button" onClick={handleClose} className="btn-ghost">
          Hủy
        </button>
        {typeof callBack !== "boolean" && (
          <button type="button" onClick={callBack} className="btn-primary">
            Lưu
          </button>
        )}
      </DialogFooter>
    </Dialog>
  );
}
