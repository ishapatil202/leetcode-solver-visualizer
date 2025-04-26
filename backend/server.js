// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const problemRoutes = require('./routes/problemRoutes');
// const aiRoutes = require('./routes/aiRoutes');

// const app = express();
// app.use(express.json());
// app.use(cors());


// const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// console.log(OPENAI_API_KEY)

// app.get("/", (req, res) => {
//     res.send("Backend API is working!");
// });

// app.post("/solve", async (req, res) => {
//     const { problemStatement } = req.body;
    
//     // Validation check
//     if (!problemStatement || typeof problemStatement !== "string") {
//         return res.status(400).json({ error: "Invalid problem statement" });
//     }

//     try {
//         const response = await axios.post(
//             "https://api.openai.com/v1/chat/completions",
//             {
//                 model: "gpt-4o-mini",
//                 store: true,
//                 messages: [
//                     { role: "system", content: "You are an AI that solves LeetCode problems." },
//                     { role: "user", content: `Solve this LeetCode problem:\n\n${problemStatement}` }
//                 ]
//             },
//             {
//                 headers: { Authorization: `Bearer ${OPENAI_API_KEY}` }
//             }
//         );
//         console.log(response.data); // Debug the response data
//         res.json({ solution: response.data.choices[0].message.content });
//     } catch (error) {
//         console.error("Error:", error.response ? error.response.data : error.message); // Log error details
//         res.status(500).json({ error: "Failed to generate solution" });
//     }
// });

// app.use('/api', problemRoutes);

// app.use('/api/ai', aiRoutes);

// app.listen(5000, () => console.log("Server running on port 5000"));

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const aiRoutes = require("./routes/aiRoutes");

const app = express();
app.use(express.json());
app.use(cors());

console.log("✅ Loaded API key:", process.env.OPENROUTER_API_KEY);


app.get("/", (req, res) => {
  res.send("Backend API is working!");
});

// Use only the AI route
app.use("/api/ai", aiRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));

