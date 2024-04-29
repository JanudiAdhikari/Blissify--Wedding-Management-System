const router = require("express").Router();
const multer = require("multer");
const Media = require("../models/media");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
});

const upload = multer({ storage: storage });

router.post("/upload", upload.array("files"), (req, res) => {
    const { AlbumID, EventID, CoupleID, Description, Date_Uploaded, MediaType, P_ID } = req.body;

    const filePaths = req.files.map(file => file.path);

    const newMedia = new Media({
        AlbumID,
        EventID,
        CoupleID,
        Description,
        Date_Uploaded,
        MediaType,
        P_ID,
        files: filePaths
    });

    newMedia.save().then(() => {
        res.json("Media Uploaded Successfully");
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error uploading media" });
    });
});


router.post("/add", (req, res) => {
    const { AlbumID, EventID, CoupleID, AlbumName, Description, Date_Uploaded, P_ID } = req.body;

    const newMedia = new Media({
        AlbumID,
        EventID,
        CoupleID,
        AlbumName,
        Description,
        Date_Uploaded,
        P_ID
    });

    newMedia.save().then(() => {
        res.json("Media Added Successfully");
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error adding media" });
    });
});

router.get("/", (req, res) => {
    Media.find().then((media) => {
        res.json(media);
    }).catch((err) => {
        console.log(err);
        res.status(500).json({ error: "Error fetching media" });
    });
});

router.put("/update/:id", async (req, res) => {
    const { AlbumID, EventID, CoupleID, AlbumName, Description, Date_Uploaded, P_ID } = req.body;
    const { id } = req.params;

    const updateMedia = {
        AlbumID,
        EventID,
        CoupleID,
        AlbumName,
        Description,
        Date_Uploaded,
        P_ID
    };

    try {
        const updatedMedia = await Media.findByIdAndUpdate(id, updateMedia, { new: true });
        res.json({ message: "Media updated successfully", updatedMedia });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error updating media" });
    }
});

router.delete("/delete/:id", async (req, res) => {
    const { id } = req.params;

    try {
        await Media.findByIdAndDelete(id);
        res.json({ message: "Media deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error deleting media" });
    }
});

router.get("/get/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const media = await Media.findById(id);
        res.json({ media });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Error fetching media" });
    }
});

module.exports = router;
