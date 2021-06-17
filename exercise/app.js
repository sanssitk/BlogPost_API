const express = require("express");
const app = express();
const Post = require("./api/models/posts");
const postData = new Post();


// Middleware to allow access-control
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// Middleware to allow access static folder to public
app.use("/uploads", express.static("uploads"))



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

app.listen(3000, () => {
  console.log("Listening on localhost:3000");
});
