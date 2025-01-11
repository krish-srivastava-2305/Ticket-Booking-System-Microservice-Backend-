import express, { json } from "express";

const app = express();

app.use(json());

app.get("/api/users/get-user", (req, res) => {
    res.send("Hello There");
})

app.listen(3000, () => {
    console.log("Listensing at http://localhost:3000");
})
