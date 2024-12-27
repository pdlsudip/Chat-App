import "dotenv/config";
import connectDB from "./db/connectdb";
import app from "./app";

const port = process.env.PORT || 3000;
connectDB().then(() => {
  console.log("Connected Successfuly");
  app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port} `);
  });
});

