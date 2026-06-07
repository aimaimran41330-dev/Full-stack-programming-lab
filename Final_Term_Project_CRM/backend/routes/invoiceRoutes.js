import express from "express";
import {
  createInvoice,
  getInvoices,
  getInvoice,
  downloadInvoicePDF,
} from "../controllers/invoiceController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.use(protect);

router.route("/").get(getInvoices).post(createInvoice);
router.get("/:id", getInvoice);
router.get("/:id/pdf", downloadInvoicePDF);

export default router;
