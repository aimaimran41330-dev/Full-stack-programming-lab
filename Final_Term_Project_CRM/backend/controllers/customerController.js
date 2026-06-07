import { validationResult } from "express-validator";
import Customer from "../models/Customer.js";

// @desc    Get all customers (supports ?search= and ?status=)
// @route   GET /api/customers
// @access  Private
export const getCustomers = async (req, res, next) => {
  try {
    const { search, status } = req.query;
    const query = {};

    // Search by name (case-insensitive). Also matches email/company for convenience.
    if (search && search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [{ name: regex }, { email: regex }, { company: regex }];
    }

    // Filter by status
    if (status && ["Lead", "Active", "Inactive"].includes(status)) {
      query.status = status;
    }

    const customers = await Customer.find(query).sort({ createdAt: -1 });

    res.json({ success: true, count: customers.length, data: customers });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single customer
// @route   GET /api/customers/:id
// @access  Private
export const getCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res.json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

// @desc    Create a customer
// @route   POST /api/customers
// @access  Private
export const createCustomer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const customer = await Customer.create({
      ...req.body,
      createdBy: req.user?._id,
    });

    res.status(201).json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

// @desc    Update a customer
// @route   PUT /api/customers/:id
// @access  Private
export const updateCustomer = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(400)
        .json({ success: false, message: errors.array()[0].msg });
    }

    const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    res.json({ success: true, data: customer });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete a customer
// @route   DELETE /api/customers/:id
// @access  Private
export const deleteCustomer = async (req, res, next) => {
  try {
    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    res.json({ success: true, message: "Customer deleted", data: { id: req.params.id } });
  } catch (error) {
    next(error);
  }
};

// @desc    Dashboard stats (counts by status)
// @route   GET /api/customers/stats/summary
// @access  Private
export const getStats = async (req, res, next) => {
  try {
    const total = await Customer.countDocuments();
    const active = await Customer.countDocuments({ status: "Active" });
    const leads = await Customer.countDocuments({ status: "Lead" });
    const inactive = await Customer.countDocuments({ status: "Inactive" });

    res.json({
      success: true,
      data: { total, active, leads, inactive },
    });
  } catch (error) {
    next(error);
  }
};
