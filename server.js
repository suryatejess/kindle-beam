const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const folderPath = path.join(__dirname, "for-kindle");
  //   console.log(folderPath);
  filesList = fs.readdirSync(folderPath);
  //   console.log(filesList);
  //   res.send(`this is home page, and the current directory is at ${__dirname}`);
  console.log("home request received");
  res.render("home", { filesList: filesList });
});

// app.get("/download/:fileName", (req, res) => {
//   const { fileName } = req.params;

//   const folderPath = path.join(__dirname, "for-kindle");
//   const filePath = path.join(folderPath, req.params.filename);

//   // Check if the file exists before trying to download
//   if (fs.existsSync(filePath)) {
//     res.download(filePath); // triggers file download
//   } else {
//     res.status(404).send("File not found.");
//   }
// });

app.get("/download/:filename", (req, res) => {
  const { filename } = req.params;

  if (!filename) {
    return res.status(400).send(`File with name ${filename} is missing.`);
  }

  const folderPath = path.join(__dirname, "for-kindle");
  const filePath = path.join(folderPath, filename);

  if (fs.existsSync(filePath)) {
    res.download(filePath); // triggers file download
  } else {
    res.status(404).send("File not found.");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
