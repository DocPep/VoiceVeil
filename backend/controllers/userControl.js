const bcrypt = require("bcrypt");
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

const userControl = {
  registerUser: async (req, res) => {
    const { username, email, password } = req.body;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const userData = {
      userID: username,
      email: email,
      password: encryptedPassword,
    };

    await client.connect();
    console.log("Connected to DB");

    try {
      const registerUserCollection = client.db().collection("Voices");
      const accountDetails = client.db().collection("Accounts");

      const duplicateEmailCheck = await registerUserCollection.findOne({
        email: email,
      });
      const duplicateUserNameCheck = await registerUserCollection.findOne({
        userID: username,
      });

      if (duplicateEmailCheck) {
        res.send("An account is already registered with this email address!");
      } else if (duplicateUserNameCheck) {
        res.send(
          "User ID is already taken :( Please choose a different User ID"
        );
      } else {
        const result1 = await registerUserCollection.insertOne(userData);

        const accountData = {
          userID: username,
          email: email,
          chorusVoices: 0,
          chorusList: [],
          chorusTo: 0,
          chorusToList: [],
          trusteeCount: 0,
          postsCount: 0,
          postList: [],
        };

        const result2 = await accountDetails.insertOne(accountData);

        console.log(
          "Account data saved: ",
          result1.insertedId,
          " ",
          result2.insertedId
        );
        res
          .status(200)
          .send(
            "User succesfully registered! Please login with the registered details :)"
          );
      }
    } catch (error) {
      console.error("Error saving account data:", error);
      res.status(500).send("Error saving account data");
    } finally {
      await client.close();
      console.log("Connection closed");
    }
  },
  loginUser: async (req, res) => {
    const { username, password } = req.body;

    await client.connect();
    console.log("Connected to DB");

    try {
      const registerUserCollection = client.db().collection("Voices");

      const emailCheck = await registerUserCollection.findOne({
        userID: username,
      });
      if (!emailCheck) {
        res.send("An account with this username does not exist!");
      } else {
        const checkPassword = await bcrypt.compare(
          password,
          emailCheck.password
        );
        if (checkPassword) {
          res.send("Login successful! :)");
        } else {
          res.send("The password you entered is incorrect! :(");
        }
      }
    } catch (error) {
    } finally {
      await client.close();
      console.log("Connection closed");
    }
  },
  getUserData: async (req, res) => {
    const username = req.query.username;

    await client.connect();
    console.log("Connected to DB");

    const accountDetails = client.db().collection("Accounts");

    try {
      const accountData = await accountDetails.findOne({ userID: username });

      console.log("Account data fetched");

      res.send(accountData);
    } catch (error) {
      console.log("Error fetching account data", error);
      res.status(500).send("Error fetching account data");
    }
  },
};

module.exports = userControl;
