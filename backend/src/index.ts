import { connectDatabase } from "./db/connection.js";
import app from "./app.js";
//connection and listener

const PORT = process.env.PORT || 5001;

connectDatabase()
  .then(() => {
    app.listen(PORT, () => console.log("Service is listening on port 5001 and connect to DB 🙌"));
  })
  .catch((err) => {
    console.log(err);
  });
