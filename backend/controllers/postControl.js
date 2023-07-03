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
        postDate: req.body.createdAt
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
    const post1 = {
      title: "Post 1",
      content: "Content of post 1",
      tags: ["#tag1", "#tag2", "#tag3"],
      postCreator: "postCreator",
      dateOfCreation: new Date(),
      likesCount: 100,
      commentsCount: 250,
      link: "https://google.com"
    }
    const post2 = {
      title: "Post 2",
      content: "Content of post 2",
      tags: ["#tag1", "#tag2", "#tag3"],
      postCreator: "postCreator",
      dateOfCreation: new Date(),
      likesCount: 100,
      commentsCount: 250,
      link: "https://google.com"
    }
    const post3 = {
      title: "Post 3",
      content: "Content of post 3",
      tags: ["#tag1", "#tag2", "#tag3"],
      postCreator: "postCreator",
      dateOfCreation: new Date(),
      likesCount: 100,
      commentsCount: 250,
      link: "https://google.com"
    }
    const post4 = {
      title: "Post 4",
      content: "Content of post 4",
      tags: ["#tag1", "#tag2", "#tag3"],
      postCreator: "postCreator",
      dateOfCreation: new Date(),
      likesCount: 100,
      commentsCount: 250,
      link: "https://google.com"
    }
    const post5 = {
      title: "Post 5",
      content: "Content of post 5",
      tags: ["#tag1", "#tag2", "#tag3"],
      postCreator: "postCreator",
      dateOfCreation: new Date(),
      likesCount: 100,
      commentsCount: 250,
      link: "https://google.com"
    }
    const post6 = {
      title: "Post 6",
      content: "Content of post 6",
      tags: ["#tag1", "#tag2", "#tag3"],
      postCreator: "postCreator",
      dateOfCreation: new Date(),
      likesCount: 100,
      commentsCount: 250,
      link: "https://google.com"
    }

    var allPost = [post1, post2, post3, post4, post5, post6];

    res.send(allPost);
  },
};

module.exports = postControl;
