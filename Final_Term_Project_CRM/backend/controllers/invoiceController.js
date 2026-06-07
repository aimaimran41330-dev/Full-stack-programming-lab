import PDFDocument from "pdfkit";
import Invoice from "../models/Invoice.js";
import Customer from "../models/Customer.js";

// @desc    Create an invoice for a customer
// @route   POST /api/invoices
// @access  Private
export const createInvoice = async (req, res, next) => {
  try {
    const { customerId, items, notes } = req.body;

    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "Customer is required" });
    }
    if (!Array.isArray(items) || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "At least one item is required" });
    }

    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    // Compute total on the server (never trust client total)
    const total = items.reduce(
      (sum, it) => sum + Number(it.quantity || 0) * Number(it.price || 0),
      0
    );

    const invoice = await Invoice.create({
      customer: customer._id,
      customerName: customer.name,
      customerEmail: customer.email,
      items,
      total,
      notes: notes || "Thank you for your business.",
      createdBy: req.user?._id,
    });

    res.status(201).json({ success: true, data: invoice });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all invoices
// @route   GET /api/invoices
// @access  Private
export const getInvoices = async (req, res, next) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json({ success: true, count: invoices.length, data: invoices });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single invoice
// @route   GET /api/invoices/:id
// @access  Private
export const getInvoice = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }
    res.json({ success: true, data: invoice });
  } catch (error) {
    next(error);
  }
};

// @desc    Download an invoice as a PDF
// @route   GET /api/invoices/:id/pdf
// @access  Private
export const downloadInvoicePDF = async (req, res, next) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }

    const doc = new PDFDocument({ size: "A4", margin: 50 });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=${invoice.invoiceNumber}.pdf`
    );
    doc.pipe(res);

    const accent = "#3a44b5";
    const muted = "#666666";

    // Header
    doc
      .fillColor(accent)
      .fontSize(26)
      .text("INVOICE", 50, 50, { align: "left" });
    doc
      .fillColor(muted)
      .fontSize(10)
      .text("Nexus CRM", 50, 82)
      .text("Customer Relationship Management");

    doc
      .fillColor("#000")
      .fontSize(10)
      .text(`Invoice #: ${invoice.invoiceNumber}`, 350, 55, { align: "right" })
      .text(
        `Date: ${new Date(invoice.createdAt).toLocaleDateString()}`,
        350,
        70,
        { align: "right" }
      );

    // Bill To
    doc
      .moveTo(50, 120)
      .lineTo(545, 120)
      .strokeColor("#dddddd")
      .stroke();
    doc
      .fillColor(muted)
      .fontSize(11)
      .text("BILL TO", 50, 135);
    doc
      .fillColor("#000")
      .fontSize(12)
      .text(invoice.customerName, 50, 152);
    if (invoice.customerEmail) {
      doc.fillColor(muted).fontSize(10).text(invoice.customerEmail, 50, 170);
    }

    // Table header
    const tableTop = 210;
    doc.fillColor(accent).rect(50, tableTop, 495, 24).fill();
    doc.fillColor("#fff").fontSize(10);
    doc.text("Description", 60, tableTop + 7);
    doc.text("Qty", 330, tableTop + 7, { width: 50, align: "right" });
    doc.text("Price", 400, tableTop + 7, { width: 60, align: "right" });
    doc.text("Amount", 470, tableTop + 7, { width: 65, align: "right" });

    // Table rows
    let y = tableTop + 30;
    doc.fillColor("#000").fontSize(10);
    invoice.items.forEach((item) => {
      const amount = item.quantity * item.price;
      doc.text(item.description, 60, y, { width: 260 });
      doc.text(String(item.quantity), 330, y, { width: 50, align: "right" });
      doc.text(`$${item.price.toFixed(2)}`, 400, y, {
        width: 60,
        align: "right",
      });
      doc.text(`$${amount.toFixed(2)}`, 470, y, { width: 65, align: "right" });
      y += 22;
    });

    // Total
    doc.moveTo(330, y + 5).lineTo(545, y + 5).strokeColor("#dddddd").stroke();
    doc
      .fillColor(accent)
      .fontSize(13)
      .text("TOTAL", 330, y + 15, { width: 80, align: "right" });
    doc.text(`$${invoice.total.toFixed(2)}`, 410, y + 15, {
      width: 125,
      align: "right",
    });

    // Notes / footer
    doc
      .fillColor(muted)
      .fontSize(10)
      .text(invoice.notes, 50, y + 70, { width: 495 });

    doc.end();
  } catch (error) {
    next(error);
  }
};
