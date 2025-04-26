// import React, { useState } from "react";

// const Visualizer = ({ trace }) => {
//   const [step, setStep] = useState(0);
//   const current = trace[step] || {};
//   console.log("Visualizer loaded with trace:", trace);
  


//   return (
//     <div style={{ marginTop: "20px", background: "#1e1e1e", color: "#fff", padding: "20px", borderRadius: "8px" }}>
//       <h4>Step {step + 1} of {trace.length}</h4>
//       <p><strong>Executing Line:</strong> {current?.line}</p>
//       <pre><strong>Variables:</strong> {JSON.stringify(
//         Object.fromEntries(
//           Object.entries(current?.locals || {}).filter(
//             ([key]) => !key.startsWith("__") && typeof current.locals[key] !== "function"
//           )
//         ),
//         null,
//         2
//       )}</pre>


//       <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>⏮ Prev</button>
//       <button onClick={() => setStep(s => Math.min(trace.length - 1, s + 1))} disabled={step === trace.length - 1}>Next ⏭</button>
//     </div>
//   );
// };

// export default Visualizer;

import React, { useState } from "react";

function extractReturnValue(trace) {
  const last = trace[trace.length - 1];
  if (!last || !last.locals) return "unknown";
  const values = Object.values(last.locals);
  return values.length ? values[values.length - 1] : "unknown";
}

const Visualizer = ({ trace }) => {
  const [step, setStep] = useState(0);
  const current = trace[step] || {};
  console.log("Visualizer loaded with trace:", trace);

  const cleanedLocals = Object.fromEntries(
    Object.entries(current?.locals || {}).filter(
      ([key]) => !key.startsWith("__") && typeof current.locals[key] !== "function"
    )
  );

  return (
    <div style={{ marginTop: "20px", background: "#1e1e1e", color: "#fff", padding: "20px", borderRadius: "8px" }}>
      <h4>Step {step + 1} of {trace.length}</h4>
      <p><strong>Executing Line:</strong> {current?.line}</p>
      <pre><strong>Variables:</strong> {JSON.stringify(cleanedLocals, null, 2)}</pre>

      <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0}>⏮ Prev</button>
      <button onClick={() => setStep(s => Math.min(trace.length - 1, s + 1))} disabled={step === trace.length - 1}>Next ⏭</button>

      {step === trace.length - 1 && (
        <div style={{ marginTop: "20px", color: "#0f0", fontWeight: "bold" }}>
          ✅ Final Output: {extractReturnValue(trace)}
        </div>
      )}
    </div>
  );
};

export default Visualizer;

