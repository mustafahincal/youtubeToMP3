// Required packages
import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
dotenv.config();

// Create express server
const app = express();

// Indicate the port number server will run on
const PORT = process.env.PORT || 3000;

// Set template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Needed to parse html data for POST requests
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// GET route
app.get("/", (req, res) => {
  res.render("index");
});

// POST route
app.post("/convert-mp3", async (req, res) => {
  const videoURL = req.body.videoURL;
  const indexOfEqual = videoURL.indexOf("=");
  const videoId = videoURL.substr(indexOfEqual + 1, 11);
  console.log(videoURL);
  console.log(videoId);

  if (videoId === undefined || videoId === "" || videoId === null) {
    return res.render("index", {
      success: false,
      message: "Please enter a youtube video URL",
    });
  } else {
    const fetchAPI = await fetch(
      `https://youtube-mp36.p.rapidapi.com/dl?id=${videoId}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": process.env.API_KEY,
          "x-rapidapi-host": process.env.API_HOST,
        },
      }
    );

    const fetchResponse = await fetchAPI.json();
    console.log(fetchResponse);
    if (fetchResponse.status === "ok")
      return res.render("index", {
        success: true,
        song_title: fetchResponse.title,
        song_link: fetchResponse.link,
      });
    else
      return res.render("index", {
        success: false,
        message: fetchResponse.message,
      });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
