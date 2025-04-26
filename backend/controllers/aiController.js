
// const axios = require("axios");

// const generateSolution = async (req, res) => {
//   let { description } = req.body;

//   if (!description || typeof description !== "string") {
//     return res.status(400).json({ error: "Invalid problem description" });
//   }

//   // 🧠 If input is "LC4", expand it to a proper LeetCode prompt
//   const match = description.match(/lc\s*(\d+)/i);
//   if (match) {
//     const problemNumber = match[1];
//     description = `LeetCode Problem ${problemNumber}`;
//   }

//   // 📦 Final strict prompt (forces Python code)
//   const prompt = `
// Solve the following problem in Python 3:
// ${description}

// Return ONLY the Python code. Do NOT include any extra text, explanations, comments, or formatting.
// Just return the raw Python code. NO markdown or anything else.
// `.trim();

//   try {
//     const response = await axios.post(
//       "https://openrouter.ai/api/v1/chat/completions",
//       {
//         model: "openai/gpt-3.5-turbo",
//         messages: [
//           { role: "system", content: "You are a Python coding assistant." },
//           { role: "user", content: prompt },
//         ],
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.OPENROUTER_API_KEY.trim()}`,
//           "HTTP-Referer": "http://localhost:3000",
//           "X-Title": "LeetCode-Solver",
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     let raw = response.data.choices[0].message.content.trim();

//     // Clean up the response to remove any unwanted explanations or markdown
//     const cleaned = raw.replace(/^.*?def /, 'def '); // Strip any unwanted text before the code

//     console.log("🧾 Cleaned Code Output:\n", cleaned);

//     const tracerRes = await axios.post("http://localhost:8000/trace", {
//       code: cleaned,
//     });

//     res.json({ 
//       solution: cleaned , 
//       trace: tracerRes.data.trace});

//   } catch (error) {
//     console.error("❌ OpenRouter API Error:", error?.response?.data || error.message);

//     res.status(500).json({
//       error: error?.response?.data?.error || error.message || "Unknown error",
//     });
//   }
// };

// module.exports = { generateSolution };


const axios = require("axios");

const generateSolution = async (req, res) => {
  let { description } = req.body;

  if (!description || typeof description !== "string") {
    return res.status(400).json({ error: "Invalid problem description" });
  }

  // 🧠 If input is like "LC4", expand it
  const match = description.match(/lc\s*(\d+)/i);
  if (match) {
    const problemNumber = match[1];
    description = `LeetCode Problem ${problemNumber}`;
  }

  // 🧠 Updated Prompt: force executable code with print()
  const prompt = `
Solve the following problem in Python 3:
${description}

Include a sample function call at the end using print() so the solution can be executed.

Return ONLY the Python code. Do NOT include any explanations, comments, or markdown formatting.
`.trim();

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a Python coding assistant." },
          { role: "user", content: prompt },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY.trim()}`,
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "LeetCode-Solver",
          "Content-Type": "application/json",
        },
      }
    );

    let raw = response.data.choices[0].message.content.trim();

    // 🧼 Clean unwanted markdown if any
    const cleaned = raw.replace(/```(?:python)?|```/g, "").trim();

    console.log("🧾 Cleaned Code Output:\n", cleaned);

    // 🐍 Call Python tracer
    const tracerRes = await axios.post("http://localhost:8000/trace", {
      code: cleaned,
    });

    console.log("📈 Trace from tracer service:", tracerRes.data);

    // 📨 Send both solution + trace to frontend
    res.json({
      solution: cleaned,
      trace: tracerRes.data.trace || [],
    });

  } catch (error) {
    console.error("❌ OpenRouter API Error:", error?.response?.data || error.message);

    res.status(500).json({
      error: error?.response?.data?.error || error.message || "Unknown error",
    });
  }
};

module.exports = { generateSolution };
