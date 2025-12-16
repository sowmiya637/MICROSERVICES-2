import express from "express";

const app = express();
app.use(express.json());

app.post("/users", (req, res) => {
  res.json({
    message: "User created",
    user: req.body
  });
});

app.listen(3001, () => {
  console.log(" User Service running on 3001");
});
