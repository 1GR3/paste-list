const express = require("express");
const app = express();
const fs = require("fs");
const fetch = require("node-fetch");

app.use(express.json());

app.post("/api/saveEntry", async (req, res) => {
  const entry = req.body;

  try {
    const ACCESS_TOKEN =
      "sl.Bh-IcmPLJFAF6rk2lwdomWbcpOm_uSZUY3ffnuesmkgMvP-pVHNSUOUgs-rqFSZogKHAuJ24RPNQkJ6uepjsYkJ6ogzpdib1GNQ931QTWqdvqLrueLqIWNu5XabuUEnkHHey5Ls";

    // Read the file content
    const fileContent = fs.readFileSync("PasteList.json");

    const response = await fetch(
      "https://content.dropboxapi.com/2/files/upload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
          "Content-Type": "text/plain",
          "Dropbox-API-Arg": JSON.stringify({
            path: "/PasteList.json",
            mode: "overwrite",
          }),
        },
        body: fileContent,
      }
    );

    if (response.ok) {
      console.log("Entry saved to file successfully.");
      res.sendStatus(200);
    } else {
      console.error("Error saving entry to file:", response.statusText);
      res
        .status(response.status)
        .json({ error: "Failed to save entry to file" });
    }
  } catch (error) {
    console.error("Error saving entry to file:", error);
    res.status(500).json({ error: "Failed to save entry to file" });
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
