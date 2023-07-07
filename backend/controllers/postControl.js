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

const postControl = {
  createPost: async (req, res) => {
    await client.connect();
    console.log("Connected to DB");
    const postCollection = client.db().collection("Posts");
    const Universe = client.db().collection("Universe");

    try {
      var universeObject = await Universe.findOne({});
      await Universe.updateOne(
        { _id: universeObject._id },
        {
          $set: {
            universalPostCounter: universeObject.universalPostCounter + 1,
          },
        }
      );
      universeObject = await Universe.findOne({});

      const result = await postCollection.insertOne({
        postTitle: req.body.title,
        postContent: req.body.content,
        postTags: req.body.tags,
        likes: 0,
        comments: [],
        postNumber: universeObject.universalPostCounter,
        postCreator: req.body.createdBy,
        postDate: req.body.createdAt,
      });

      console.log(
        "Post saved to database",
        result.insertedId,
        `Post number ${universeObject.universalPostCounter}`
      );

      res.send("Post created successfully :)");
    } catch (error) {
      console.log(error);
      res.send("There was an error in saving the post. Please try again");
    } finally {
      await client.close();
      console.log("Connection closed");
    }
  },
  getFeedPosts: async (req, res) => {
    const username = req.query.username;

    await client.connect();
    console.log("Connected to DB");

    const accounts = client.db().collection("Accounts");
    const posts = client.db().collection("Posts");

    try {
      const userIsChorusTo = (await accounts.findOne({ userID: username }))
        .chorusToList;

      const feedPosts = await posts
        .aggregate([
          { $match: { postCreator: { $in: userIsChorusTo } } },
          {
            $addFields: {
              postDate: {
                $toDate: "$postDate",
              },
            },
          },
          { $sort: { postDate: -1 } },
          { $limit: 10 },
        ])
        .toArray();

      res.send(feedPosts);
    } catch (error) {
      console.error(error);
      res.send(error);
    } finally {
      await client.close();
      console.log("Disconnected from DB");
    }
  },
  getPost: async (req, res) => {
    const postID = req.query.postID;
    console.log("Post ID: " + postID);
    await client.connect();
    console.log("Connected to DB");

    const posts = client.db().collection("Posts");
    try {
      const post = await posts.findOne({ _id: new ObjectId(postID) });
      res.send(post);
    } catch (err) {
      console.log(err);
      res.send(err.message);
    } finally {
      await client.close();
      console.log("Disconnected from DB");
    }
  },
  updatePost: async (req, res) => {
    await client.connect();
    console.log("Connected to DB to update post");
    const postCollection = client.db().collection("Posts");
    try {
      const postID = req.body.post._id;
      console.log(req.body.post.comments);
      const result = await postCollection.updateOne(
        { _id: new ObjectId(postID) },
        { $set: { comments: req.body.post.comments } }
      );
      console.log(`${result.modifiedCount} document(s) updated.`);
    } catch (error) {
      console.error(error);
      res.send(error);
    } finally {
      await client.close();
      console.log("Disconnected from DB");
    }
  },
};

module.exports = postControl;
