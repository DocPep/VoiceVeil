require("dotenv").config();

const {
  MongoClient,
  ServerApiVersion,
  MONGO_CLIENT_EVENTS,
} = require("mongodb");

const MONOGODB_URL = process.env.MONGODBURL;
const client = new MongoClient(MONOGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const searchControl = {
  searchQuery: async (req, res) => {
    const reqBody = req.query.searchFor;
    const response = {};
    for (let things of reqBody) {
      response[things] = [
        {
          title: `${things}`,
          content: "Content of post 1",
          tags: ["#tag1", "#tag2", "#tag3"],
          postCreator: "postCreator",
          dateOfCreation: new Date(),
          likesCount: 100,
          commentsCount: 250,
          link: "https://google.com",
        },
        {
          title: "Post 2",
          content: "Content of post 2",
          tags: ["#tag1", "#tag2", "#tag3"],
          postCreator: "postCreator",
          dateOfCreation: new Date(),
          likesCount: 100,
          commentsCount: 250,
          link: "https://google.com",
        },
      ];
    }
    console.log(response);
    res.send(response);
  },
};

module.exports = searchControl;
