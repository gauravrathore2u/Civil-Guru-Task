const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cron = require("node-cron");
var cookieParser = require("cookie-parser");
const { createServer } = require("http");
const { Server } = require("socket.io");
const userModel = require("./model/userModel.js");
const userRouter = require("./routes/userRoute.js");
const cartRouter = require("./routes/cartRoute.js")
const sendMail = require("./utils/nodemailer.js");
const cartModel = require("./model/cartModel.js");
dotenv.config();

const app = express();

const server = createServer(app);
const corsOptions = {
  origin: '*', // Replace with your React app's origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
};
const io = new Server(server, {
  cors: corsOptions, // Use the same corsOptions as defined above
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGODB_URL).then((con) => {
  // console.log(con.connection);
  console.log("db is successfully connected");
});

app.get("/api/v1/", async (req, res) => {
  try {
    let token = req.headers?.token;
    if (token) {
      let resp = await userModel.updateOne(
        { email: req.body.email },
        { $set: { lastLogin: new Date() } }
      );
      res.status(200).json({
        result: 1,
        data: "welcome User",
      });
    }
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ result: -1, msg: "Internal server error", error: error.message });
  }
});

app.use("/api/v1/user", userRouter);
app.use("/api/v1/cart", cartRouter);



//Soket :- for notifications
let devices = {};
io.on("connection", (socket) => {
  console.log("a user connected");

  //   socket.on("test", (msg)=>{
  //     console.log(msg);
  //     io.to(socket.id).emit("testreturn","return message hhh")
  //   })

  socket.on("newDevice", async (token) => {
    await findandsetuser(token, socket.id);
  });

  const cronExpression = '0 9 * * *';   //daily 9 AM
  cron.schedule(cronExpression, () => sendNotification(io));


  //Functinality for cart notification after 5 min of visiting cart page (let assum we have product in cart)
  setTimeout(() => {
    let cart = cartModel.find({isNotification:false});
    for(let i=0; i<cart?.lenght; i++) {
      io.to(devices[cart[i]?.email]).emit("cartNotification", "Please make payment");
    };
  }, 300000);
});

const findandsetuser = async (token, id) => {
  try {
    let resp = await userModel.findOne({ token });
    devices[resp?.email] = id;

    return true;
  } catch (error) {
    return false;
  }
};

const sendNotification = async (io) => {
  console.log("cron job run at " + new Date());

  //Push Notification functinality for the users not visited since last 5 days
  const fiveDaysAgo = new Date();
  fiveDaysAgo.setDate(fiveDaysAgo.getDate() - 5); // the date 5 days ago
  let users = await userModel.find({ lastLogin: { $lt: fiveDaysAgo } });

  let mailArr = [];   //array to send bulk mail using nodemailer

  users.forEach((item) => {
    mailArr.push(item?.email);
    io.to(devices[item?.email]).emit(
      "notification",
      "Hi! You have't visited us for past 5 days!!"
    );
  });


  //send mails using nodemailer for not visiting since last 5 days
  let mailSubject = "Hi User! Attention";
  let mailTxt = "Hi! You have't visited us for past 5 days!!"
  sendMail(mailArr, mailSubject, mailTxt);
};




const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`App is running on ${PORT}.....`);
});
