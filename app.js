const express = require("express");
const app = express();
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const API_KEY = process.env.API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
app.set("view engine", "ejs");
app.listen(3000);

app.get("/", (req, res) => {
  res.render("ai");
});

app.post("/ai-prompt", async (req, res) => {
  const prompt = req.body.prompt;

  if (!prompt || !prompt.trim()) {
    return res.json({
      text: "Please enter a prompt.",
    });
  }

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();

  console.log(response);

  res.json({
    text: text,
  });
});
