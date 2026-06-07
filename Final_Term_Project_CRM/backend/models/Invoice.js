import mongoose from "mongoose";

const invoiceItemSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    // Snapshot of customer details at time of invoicing
    customerName: { type: String, required: true },
    customerEmail: { type: String, default: "" },
    items: {
      type: [invoiceItemSchema],
      validate: [(v) => v.length > 0, "At least one item is required"],
    },
    total: {
      type: Number,
      required: true,
      min: 0,
    },
    notes: {
      type: String,
      default: "Thank you for your business.",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// Generate a readable invoice number before saving
invoiceSchema.pre("save", async function (next) {
  if (this.invoiceNumber) return next();
  const count = await mongoose.model("Invoice").countDocuments();
  const seq = String(count + 1).padStart(4, "0");
  this.invoiceNumber = `INV-${new Date().getFullYear()}-${seq}`;
  next();
});

const Invoice = mongoose.model("Invoice", invoiceSchema);
export default Invoice;
