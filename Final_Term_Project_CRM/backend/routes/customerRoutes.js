import express from "express";
import { body } from "express-validator";
import {
  getCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getStats,
} from "../controllers/customerController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

// All customer routes require authentication
router.use(protect);

const customerValidation = [
  body("name").trim().notEmpty().withMessage("Customer name is required"),
  body("email").isEmail().withMessage("Valid email is required"),
  body("phone").trim().notEmpty().withMessage("Phone number is required"),
  body("status")
    .optional()
    .isIn(["Lead", "Active", "Inactive"])
    .withMessage("Invalid status"),
];

router.get("/stats/summary", getStats);

router
  .route("/")
  .get(getCustomers)
  .post(customerValidation, createCustomer);

router
  .route("/:id")
  .get(getCustomer)
  .put(customerValidation, updateCustomer)
  .delete(deleteCustomer);

export default router;
