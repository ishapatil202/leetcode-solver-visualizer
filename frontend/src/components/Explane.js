// import React, { useEffect, useState } from "react";
// import styled from "styled-components";

// const StepContainer = styled.div`
//   margin-top: 1rem;
//   background-color: #1e1e1e;
//   padding: 1rem;
//   border-radius: 10px;
//   color: #fff;
//   font-family: 'Courier New', monospace;
// `;

// const Step = styled.div`
//   margin-bottom: 0.5rem;
//   opacity: ${({ visible }) => (visible ? 1 : 0)};
//   transition: opacity 0.5s ease-in-out;
// `;

// const CodeExplanation = ({ steps }) => {
//   const [visibleSteps, setVisibleSteps] = useState([]);

//   useEffect(() => {
//     if (!steps || steps.length === 0) return;

//     let index = 0;
//     const interval = setInterval(() => {
//       setVisibleSteps(prev => [...prev, steps[index]]);
//       index++;
//       if (index >= steps.length) clearInterval(interval);
//     }, 1000); // show one step every 1 sec

//     return () => clearInterval(interval);
//   }, [steps]);

//   return (
//     <StepContainer>
//       {visibleSteps.map((step, i) => (
//         <Step key={i} visible={true}>
//           {step}
//         </Step>
//       ))}
//     </StepContainer>
//   );
// };

// export default CodeExplanation;
