const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl.js");
const app = express();

mongoose.connect("mongodb://localhost/urlshortner", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const shortURLs = await ShortUrl.find();
  res.render("index", { shortURLs: shortURLs });
});

app.post("/shortURLs", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullURL });
  res.redirect("/");
});

app.get("/:shortUrl", async (req, res) => {
  const shortURL = await shortURL.findOne({ short: req.params.shortURL });
  if (shosrtURL == null) return res.sendStatus(404);

  shortURL.clicks++;
  shortURL.save();

  res.redirect(shortURL.full);
});

app.listen(process.env.PORT || 5000);
