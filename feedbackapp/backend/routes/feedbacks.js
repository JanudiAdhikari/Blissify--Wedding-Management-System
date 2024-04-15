const router = require("express").Router();
const Feedback = require("../models/Feedback");



http://localhost:8070/feedback/add
router.route("/add").post((req, res) => {
    const email = req.body.email;
    const feedback_id = Number(req.body.feedback_id);
    const response = req.body.response;

    if (isNaN(feedback_id)) {
        return res.status(400).json({ message: "Invalid feedback ID. Please provide a valid number." });
    }
    const newFeedback = new Feedback({
        email,
        feedback_id,
        response,
    });

    newFeedback.save()
        .then(() => {
            res.json("Response Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error adding response");
        });
});

http://localhost:8070/feedback/display
router.route("/").get((req, res) => {
    Feedback.find()
        .then((feedbacks) => {
            res.json(feedbacks);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send("Error fetching feedbacks");
        });
});

http://localhost:8070/feedback/update
router.route("/update/:id").put(async (req, res) => {
    const userId = req.params.id;
    const { email, feedback_id, response } = req.body;

    const updateFeedback = {
        email,
        feedback_id,
        response,
    };

    try {
        const updated = await Feedback.findByIdAndUpdate(userId, updateFeedback);
        res.status(200).send({ status: "Feedback updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating data", error: err.message });
    }
});

http://localhost:8070/feedback/
router.route("/delete/:id").delete(async (req, res) => {
    const userId = req.params.id;

    try {
        await Feedback.findByIdAndDelete(userId);
        res.status(200).send({ status: "Feedback deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with deleting feedback", error: err.message });
    }
});

// Get a specific feedback by ID
router.route("/get/:id").get(async (req, res) => {
    const userId = req.params.id;

    try {
        const feedback = await Feedback.findById(userId);
        if (feedback) {
            res.status(200).send({ status: "Feedback fetched", feedback });
        } else {
            res.status(404).send({ status: "Feedback not found" });
        }
    } catch (err) {
        console.log(err.message);
        res.status(500).send({ status: "Error with fetching feedback", error: err.message });
    }
});

module.exports = router;