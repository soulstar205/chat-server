require("dotenv").config();
const express = require('express');
const app = express();
const cors = require("cors");
const axios = require('axios')
app.use(express.json());
app.use(cors());

// app.post("/authenticate", async (req, res) => {
//   const { username } = req.body;
//   try {
//     const response = await fetch("https://api.chatengine.io/users/", {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//         'private-key': process.env.CHAT_ENGINE_PRIVATE_KEY,
//       },
//       body: JSON.stringify({ username: username, secret: username, firstname: username }),
//     });
//     if (!response.ok) {
//       throw new Error('Request failed with status: ' + response.status);
//     }
//     const data = await response.json();
//     res.status(response.status).json(data);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

app.post("/signup", async (req, res) => {
  const { username, secret, email, first_name, last_name } = req.body;

  // Store a user-copy on Chat Engine!
  try {
    
    const response = await axios.post(
      "https://api.chatengine.io/users/",
      { username, secret, email, first_name, last_name },
      { headers: { "Private-Key": process.env.CHAT_ENGINE_PRIVATE_KEY } }
    );
    return res.status(response.status).json(response.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

app.post("/login", async (req, res) => {
  const { username, secret } = req.body;

  // Fetch this user from Chat Engine in this project!
  try {
    const r = await axios.get("https://api.chatengine.io/users/me/", {
      headers: {
        "Project-ID": process.env.CHAT_ENGINE_PROJECT_ID,
        "User-Name": username,
        "User-Secret": secret,
      },
    });
    return res.status(r.status).json(r.data);
  } catch (e) {
    return res.status(e.response.status).json(e.response.data);
  }
});

// Docs at rest.chatengine.io
// vvv On port 3001!
app.listen(3001);
