import express from 'express';
const app = express();
app.use(express.json());
//connection and listener
app.listen(5000, () => console.log("Service is listening on port 5000"));
//# sourceMappingURL=index.js.map