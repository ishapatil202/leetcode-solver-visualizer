// import React, { useState } from "react";
// import axios from "axios";
// import { Container, Input, Button} from "./styles";

// const ProblemFetcher = ({ onFetchSolution }) => {
//     const [problemId, setProblemId] = useState("");

//     const fetchSolution = async () => {
//         try {
//             const response = await axios.post("http://localhost:5000/api/ai/solve", {
//               description: problemId
//             });

//             // const rawCode = response.data.code || "";
//             // const cleanCode = rawCode.replace(/```(?:python)?|```/g, "").trim();

//             onFetchSolution(response.data.code);
//         } catch (error) {
//             console.error("Error fetching solution", error);
//         const errMsg =
//             error.response?.data?.error ||
//             error.message ||
//             "Unknown error occurred";
  
//         alert("⚠️ AI Error: " + errMsg);
//         }
//     };

//     return (
//         <Container>
//             <h2>Problem Solver</h2>
//             <Input
//                 type="text"
//                 placeholder="Enter Problem ID (e.g., two-sum)"
//                 value={problemId}
//                 onChange={(e) => setProblemId(e.target.value)}
//             />
//             <Button onClick={fetchSolution}>Get Solution</Button>
//         </Container>
//     );
// };

// export default ProblemFetcher;


import React, { useState } from "react";
import axios from "axios";
import { Container, Input, Button } from "./styles";

const ProblemFetcher = ({ onFetchSolution }) => {
  const [problemId, setProblemId] = useState("");

  const fetchSolution = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/ai/solve", {
        description: problemId,
      });

      const rawCode = response.data.solution || "";
      const cleanCode = rawCode.replace(/```(?:python)?|```/g, "").trim();
      onFetchSolution(cleanCode, response.data.trace);
    } catch (error) {
      console.error("Error fetching solution", error);
      const errMsg =
        error.response?.data?.error ||
        error.message ||
        "Unknown error occurred";
      alert("⚠️ AI Error: " + errMsg);
    }
  };

  return (
    <Container>
      <h2>Problem Solver</h2>
      <Input
        type="text"
        placeholder="Enter LeetCode ID (e.g., LC4)"
        value={problemId}
        onChange={(e) => setProblemId(e.target.value)}
      />
      <Button onClick={fetchSolution}>Get Solution</Button>
    </Container>
  );
};

export default ProblemFetcher;
