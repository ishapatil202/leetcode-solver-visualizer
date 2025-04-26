
// import React, { useState } from "react";
// import ProblemFetcher from "./components/ProblemFetcher";
// import SolutionGenerator from "./components/SolutionGenerator";
// import Visualizer from "./components/Visualizer";

// const App = () => {
//   const [solution, setSolution] = useState(null);
//   const [showVisualization, setShowVisualization] = useState(false);
//   const exampleArray = [9, 6, 3, 7, 2, 4];

//   return (
//     <div style={{ padding: "20px" }}>
//       <h1>AI Code Solver + Visualization</h1>
//       <ProblemFetcher
//         onFetchSolution={(codeString) => {
//           setSolution(codeString);
//           if (codeString.toLowerCase().includes("bubble")) {
//             setShowVisualization(true);
//           } else {
//             setShowVisualization(false);
//           }
//         }}
//       />
//       {solution && <SolutionGenerator solution={solution} />}
//       {showVisualization && <Visualizer inputArray={exampleArray} />}
//     </div>
//   );
// };

// export default App;
import React, { useState } from "react";
import ProblemFetcher from "./components/ProblemFetcher";
import SolutionGenerator from "./components/SolutionGenerator";
import Visualizer from "./components/Visualizer";

const App = () => {
  const [solution, setSolution] = useState(null);
  const [trace, setTrace] = useState([]);
  const [showVisualization, setShowVisualization] = useState(false);
  return (
    <div style={{ padding: "20px" }}>
      <h1>AI Code Solver + Visualization</h1>

      <ProblemFetcher
        onFetchSolution={(codeString, traceResult) => {
          console.log("✅ AI Code:", codeString);
          console.log("🐍 Trace from backend:", traceResult);
          setSolution(codeString);
          setTrace(traceResult);
          setShowVisualization(true);
        }}
      />

      {solution && <SolutionGenerator solution={solution} trace={trace} />}
      {showVisualization && trace?.length > 0 && <Visualizer trace={trace} />}
    </div>
  );
};

export default App;
