const express = require("express");
const cors = require("cors");
const Datastore = require("nedb");
const multer = require("multer");
const path = require("path");
const app = express();

app.use(express.json());
app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

let storage = multer.diskStorage({
  destination: "./uploads",
  filename: function (req, file, cb) {
    cb(
      null,
      Date.now() + file.originalname.slice(file.originalname.indexOf("."))
    );
  },
});

let database = new Datastore("database.db");
database.loadDatabase();

// Check File Type
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

// app.use(express.static(path.join(__dirname, '/uploads'),{index:false,extensions:['gif','png','jpg','jpeg']}))

let upload = multer({
  storage,
  limits: { fileSize: 1000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

const PORT = process.env.PORT || 5000;
const HOST = process.env.HOST || `http://localhost:${PORT}`;
app.listen(PORT, () =>
  console.log(`server running on port ${PORT} on host ${HOST}`)
);

app.post("/api/uploadImage/", upload.single("image"), (req, res) => {
  try {
    res
      .status(200)
      .json({
        msg: `successfully uploaded`,
        img_url: `${HOST}/api/${req.file.path}`,
      });
  } catch (err) {
    res.json({ err: err.message });
  }
});

app.get("/api/uploads/:id", (req, res) => {
  try {
    res.status(200).sendFile(path.join(__dirname, "/uploads/", req.params.id));
  } catch (err) {
    res.json({ err: err.message });
  }
});

app.post("/api/metaData/", async (req, res) => {
  try {
    let data = req.body;
    console.log(`data`, data);
    database.insert(data);
    res.json({ msg: "success", url: `${HOST}/api/getMetaData/${data.id}` });
  } catch (error) {
    res.json(error);
  }
});

app.get("/api/getMetaData/:id", async (req, res) => {
  try {
    database.find({ id: req.params.id }, function (err, docs) {
      res.json(docs[0]);
    });
  } catch (error) {
    res.json(error);
  }
});

// console.log(`imgBuffer`, imgBuffer)
// document.getElementById("my-img").src = URL.createObjectURL(
//   new Blob([imgBuffer.buffer], { type: "image/png" }
// ))
