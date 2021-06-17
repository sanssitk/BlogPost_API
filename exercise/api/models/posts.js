const PATH = "./data.json";
const fs = require("fs");
const path = require("path");
class Post {
  get() {
    // Get Posts
    return this.readData();
  }

  getIndividualPost(postId) {
    // get individual posts
    const posts = this.readData();
    const foundPost = posts.find((post) => post.id == postId);
    return foundPost;
  }

  add(newPost) {
    // add new post
    const currentPosts = this.readData();
    currentPosts.unshift(newPost);
    this.storeData(currentPosts);
  }

  readData() {
    let rawdata = fs.readFileSync(PATH);
    let posts = JSON.parse(rawdata);
    return posts;
  }

  storeData(rawData) {
    let data = JSON.stringify(rawData);
    fs.writeFileSync(PATH, data);
  }
}

module.exports = Post;
