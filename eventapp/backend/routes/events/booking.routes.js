const express = require("express");
const router = express.Router();
const Booking = require("../../models/events/booking.model");
const Occasion = require("../../models/events/occasion.model");

//Book occasion
router.post("/bookoccasion", async (req, res) => {
  try {
    const newbooking = new Booking(req.body);
    await newbooking.save();

    res.status(200).json({
      status: true,
      message: "Occasion booked successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

//get all bookings for admin
router.get("/getallbookings", async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate(["occasion", "user"])
      .sort({ createdAt: -1 });
    res.status(200).json({
      status: true,
      bookings,
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

//get all bookings for user by user id
router.get("/getallbookings/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const bookings = await Booking.find({ user: userID })
      .populate("occasion")
      .sort({ createdAt: -1 });

    if (bookings.length == 0) {
      return res.status(400).json({
        status: false,
        message: "No bookings found",
      });
    } else {
      res.status(200).json({
        status: true,
        bookings,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

//cancle booking
router.delete("/deletebooking/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(400).json({
        status: false,
        message: "Booking not found",
      });
    } else {
      const occasion = await Occasion.findById(booking.occasion);
      occasion.bookedTimeSlots.pull(booking.bookedTimeSlots);
      await occasion.save();
      await Booking.findByIdAndDelete(id);
    }

    res.status(200).json({
      status: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

//get all bookings for occasion by booking id
router.get("/getoccasionbookings/:id", async (req, res) => {
  try {
    const occasionID = req.params.id;
    const bookings = await Booking.find({ occasion: occasionID });
    var temp = [];
    for (var booking of bookings) {
      if (booking.bookingStatus == "Confirmed") {
        temp.push(booking.bookedTimeSlots);
      }
    }
    if (bookings.length == 0) {
      return res.status(400).json({
        status: false,
        bookings: temp,
        message: "No bookings found",
      });
    } else {
      res.status(200).json({
        status: true,
        bookings: temp,
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

//change booking status to confirmed
router.patch("/confirmBooking/:id", async (req, res) => {
  try {
    const bookongID = req.params.id;

    const booking = await Booking.findById(bookongID);

    if (booking) {
      booking.bookingStatus = "Confirmed";
      await booking.save();

      //save booking time slots to occasion
      const occasion = await Occasion.findById(booking.occasion);
      occasion.bookedTimeSlots.push(booking.bookedTimeSlots);
      await occasion.save();
      return res.status(200).json({
        status: true,
        message: "Booking confirmed",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Booking not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});

//change booking status to declined
router.patch("/declineBooking/:id", async (req, res) => {
  try {
    const bookongID = req.params.id;

    const booking = await Booking.findById(bookongID);

    if (booking) {
      booking.bookingStatus = "Declined";
      await booking.save();
      return res.status(200).json({
        status: true,
        message: "Booking declined",
      });
    } else {
      return res.status(404).json({
        status: false,
        message: "Booking not found",
      });
    }
  } catch (error) {
    return res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});
module.exports = router;
