const express = require("express");
const app = express();
const Post = require("./api/models/posts");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${getExt(file.mimetype)}`);
  },
});

const getExt = (mimeType) => {
  switch (mimeType) {
    case "image/png":
      return ".png";
    case "image/jpeg":
      return ".jpeg";
  }
};

var upload = multer({ storage: storage });

const postData = new Post();

// middleware to convert json to javascript objects
app.use(express.json());

// Middleware to allow access-control
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Middleware to allow access static folder to public
app.use("/uploads", express.static("uploads"));

app.get("/api/posts", (req, res) => {
  res.status(200).send(postData.get());
});

app.get("/api/posts/:post_id", (req, res) => {
  const postId = req.params.post_id;
  const foundPost = postData.getIndividualPost(postId);
  if (foundPost) {
    res.status(200).send(foundPost);
  } else {
    res.status(404).send("Not Found");
  }
});

app.post("/api/posts", upload.single("post-image"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  const newPost = {
    "id": `${Date.now()}`,
    "title": req.body.title,
    "content": req.body.content,
    "post_image": req.file.path,
    "added_date": `${Date.now()}`
  }
  postData.add(newPost);
  res.status(201).send("Ok");
});

app.listen(3000, () => {
  console.log("Listening on localhost:3000");
});
