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
    const searchWord = req.query.searchWord;
    const response = {};

    await client.connect();
    console.log("Connected to DB");

    try {
      const queryPosts = client.db().collection("Posts");
      if (reqBody.includes("posts")) {
        const query = {
          $or: [
            { postTitle: { $regex: searchWord, $options: "i" } },
            { postContent: { $regex: searchWord, $options: "i" } },
          ],
        };

        const options = {
          limit: 50,
        };

        const result = await queryPosts.find(query, options).toArray();
        response["posts"] = result;
      }
      if (reqBody.includes("tags")) {
        const query = {
          $or: [{ postTags: { $regex: "#" + searchWord, $options: "i" } }],
        };

        const options = {
          limit: 50,
        };

        const result = await queryPosts.find(query, options).toArray();
        response["tags"] = result;
      }
      if (reqBody.includes("accounts")) {
        const queryAccounts = client.db().collection("Accounts");
        const query = {
          $or: [{ userID: { $regex: searchWord, $options: "i" } }],
        };

        const options = {
          limit: 50,
        };

        const result = await queryAccounts.find(query, options).toArray();
        response["accounts"] = result;
      }

      res.send(response);
    } catch (error) {
      console.log(error);
      res.send(error);
    } finally {
      await client.close();
      console.log("Disconnected from DB");
    }
  },
};

module.exports = searchControl;
