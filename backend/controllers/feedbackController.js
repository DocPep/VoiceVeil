require("dotenv").config();

const {
  MongoClient,
  ServerApiVersion,
  MONGO_CLIENT_EVENTS,
  ObjectId,
} = require("mongodb");

const MONOGODB_URL = process.env.MONGODBURL;
const client = new MongoClient(MONOGODB_URL, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const feedbackController = {
  postFeedback: async (req, res) => {
    await client.connect();
    console.log("Connected to DB");

    try {
      const feedbackCollection = client.db().collection("feedback");
      await feedbackCollection.insertOne({ feedback: req.body.feedback });
      res.send("Added feedback");
      console.log("Added feedback");
    } catch (error) {
      res.send(error);
      console.log(error);
    } finally {
      await client.close();
      console.log("Connection closed");
    }
  },
};

module.exports = feedbackController;
