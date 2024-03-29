import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Avatar,
  IconButton,
  Typography,
  Card,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { closeDialog } from "../../redux/reducer/DialogSlice";

export function DialogWithImage() {
  const dispatch = useDispatch();
  const { showDialog, dialogImage } = useSelector((state) => state.dialogSlice);
  const handleOpen = () => dispatch(closeDialog());

  return (
    <>
      <Dialog size="xl" open={showDialog} handler={handleOpen}>
        <DialogBody>
          <img
            alt="nature"
            className="lg:h-[600px] h-[300px] w-full rounded-lg object-cover object-center"
            src={dialogImage}
          />
        </DialogBody>
        <DialogFooter className="justify-end">
          <Button
            onClick={handleOpen}
            size="sm"
            variant="outlined"
            color="blue-gray"
            className="mr-5 flex items-center"
          >
            Đóng
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
