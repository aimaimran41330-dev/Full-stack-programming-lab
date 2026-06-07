import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import User from "../models/User.js";
import Customer from "../models/Customer.js";
import Invoice from "../models/Invoice.js";

dotenv.config();

const demoUser = {
  name: "Admin User",
  email: "admin@crm.com",
  password: "admin123",
};

// 18 customers covering all three statuses for the search/filter feature
const customers = [
  { name: "Sarah Johnson", email: "sarah.johnson@techflow.com", phone: "+1-202-555-0143", company: "TechFlow Inc.", status: "Active", address: "120 Market St, San Francisco, CA", notes: "Renewed annual contract." },
  { name: "Michael Chen", email: "m.chen@brightlabs.io", phone: "+1-415-555-0198", company: "Bright Labs", status: "Lead", address: "88 King St, Seattle, WA", notes: "Requested product demo." },
  { name: "Aisha Khan", email: "aisha.khan@novacorp.com", phone: "+92-300-1234567", company: "Nova Corp", status: "Active", address: "Clifton Block 5, Karachi", notes: "Key enterprise account." },
  { name: "David Miller", email: "david.miller@quanta.co", phone: "+44-20-7946-0321", company: "Quanta Co.", status: "Inactive", address: "10 Downing Ave, London", notes: "Churned last quarter." },
  { name: "Emily Davis", email: "emily.davis@pixelpush.com", phone: "+1-312-555-0177", company: "PixelPush", status: "Active", address: "200 Lake Shore Dr, Chicago, IL", notes: "Upsell opportunity for Q3." },
  { name: "Omar Farooq", email: "omar.farooq@zenithsoft.com", phone: "+92-321-9876543", company: "Zenith Software", status: "Lead", address: "Gulberg III, Lahore", notes: "Sent proposal, awaiting reply." },
  { name: "Laura Martinez", email: "laura.m@greenleaf.org", phone: "+1-305-555-0122", company: "GreenLeaf NGO", status: "Active", address: "5th Ave, Miami, FL", notes: "Non-profit discount applied." },
  { name: "James Wilson", email: "j.wilson@apexmedia.com", phone: "+1-718-555-0190", company: "Apex Media", status: "Inactive", address: "Brooklyn, New York, NY", notes: "Payment overdue, paused." },
  { name: "Fatima Noor", email: "fatima.noor@bluewave.pk", phone: "+92-333-4561234", company: "BlueWave", status: "Active", address: "DHA Phase 6, Karachi", notes: "Monthly retainer client." },
  { name: "Robert Brown", email: "robert.brown@coreplus.com", phone: "+1-602-555-0166", company: "CorePlus", status: "Lead", address: "Phoenix, AZ", notes: "Met at trade show." },
  { name: "Sophia Lee", email: "sophia.lee@mapletech.ca", phone: "+1-416-555-0155", company: "Maple Tech", status: "Active", address: "Toronto, ON, Canada", notes: "Expanding to two new teams." },
  { name: "Hassan Raza", email: "hassan.raza@orbit.pk", phone: "+92-345-7778899", company: "Orbit Systems", status: "Lead", address: "F-7, Islamabad", notes: "Interested in invoicing module." },
  { name: "Olivia Taylor", email: "olivia.taylor@summit.co", phone: "+1-503-555-0133", company: "Summit Co.", status: "Inactive", address: "Portland, OR", notes: "Contract expired." },
  { name: "Daniel Garcia", email: "daniel.garcia@vertex.es", phone: "+34-91-555-0188", company: "Vertex SL", status: "Active", address: "Madrid, Spain", notes: "Spanish localization needed." },
  { name: "Hira Sheikh", email: "hira.sheikh@lumen.pk", phone: "+92-301-2223344", company: "Lumen Digital", status: "Active", address: "Bahria Town, Rawalpindi", notes: "Referral from Nova Corp." },
  { name: "Christopher Moore", email: "chris.moore@ironclad.com", phone: "+1-214-555-0144", company: "IronClad", status: "Lead", address: "Dallas, TX", notes: "Comparing vendors." },
  { name: "Nadia Ali", email: "nadia.ali@crestline.com", phone: "+971-50-555-0123", company: "Crestline", status: "Active", address: "Business Bay, Dubai", notes: "Regional reseller." },
  { name: "William Anderson", email: "will.anderson@harbortech.com", phone: "+1-617-555-0111", company: "Harbor Tech", status: "Inactive", address: "Boston, MA", notes: "Re-engagement planned." },
];

const importData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany();
    await Customer.deleteMany();
    await Invoice.deleteMany();

    // Create demo user (password is hashed by the User model pre-save hook)
    const user = await User.create(demoUser);

    // Attach createdBy and insert customers (use create so hooks/validators run)
    const withUser = customers.map((c) => ({ ...c, createdBy: user._id }));
    await Customer.insertMany(withUser);

    console.log("✅ Data imported successfully");
    console.log(`   • 1 demo user  -> ${demoUser.email} / ${demoUser.password}`);
    console.log(`   • ${customers.length} customers seeded`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Seed error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    await User.deleteMany();
    await Customer.deleteMany();
    await Invoice.deleteMany();
    console.log("🗑️  All data destroyed");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
