const express = require("express");

const { listAuth } = require("../constants/authConstants");
const {
  createContact,
  getAllContact,
  deleteContact,
  getDetailContact,
  deleteAllContact,
  updateContact,
} = require("../controllers/ContactController");

const contactRouter = express.Router();
//create
contactRouter.post("/create", createContact);
//update
contactRouter.put("/update/:id", updateContact);
//get all
contactRouter.get("/all", getAllContact);
//delete
contactRouter.delete("/delete/:id", deleteContact);

contactRouter.post("/deleteAll", deleteAllContact);
//get detail
contactRouter.get("/detail/:slug", getDetailContact);

module.exports = contactRouter;
