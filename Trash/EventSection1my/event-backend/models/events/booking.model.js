const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    occasion: { type: mongoose.Schema.Types.ObjectID, ref: "occasions" },
    user: { type: mongoose.Schema.Types.ObjectID, ref: "users" },
    bookedTimeSlots: { from: { type: String }, to: { type: String } },
    totalHours: { type: Number },
    totalAmount: { type: Number },
    driverRequired: { type: Boolean },
    bookingStatus: { type: String, default: "Pending" },
  },
  { timestamps: true, versionKey: false }
);

const bookingModel = mongoose.model("bookings", bookingSchema);
module.exports = bookingModel;
