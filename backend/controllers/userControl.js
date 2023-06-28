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
      const collection = client.db().collection("Voices");

      const duplicateEmailCheck = await collection.findOne({ email: email });
      const duplicateUserNameCheck = await collection.findOne({ userID: username });

      if (duplicateEmailCheck) {
        res.send("An account is already registered with this email address!");
      } else if (duplicateUserNameCheck) {
        res.send(
          "User ID is already taken :( Please choose a different User ID"
        );
      } else {
        const result = await collection.insertOne(userData);
        console.log("Account data saved:", result.insertedId);
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
      const collection = client.db().collection("Voices");

      const emailCheck = await collection.findOne({ userID: username});
      if(!emailCheck) {
        res.send("An account with this username does not exist!")
      } else {
        const checkPassword = await bcrypt.compare(password, emailCheck.password);
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
};

module.exports = userControl;
