
import React, { useState } from "react";
import { Container, ProblemBox, Button } from "./styles";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const SolutionGenerator = ({ solution , trace, step}) => {
  const [showCode, setShowCode] = useState(true);

  return (
    <Container>
      <h3>AI Solution</h3>

      {showCode && (
        <ProblemBox>
          <SyntaxHighlighter
            language="python"
            style={darcula}
            showLineNumbers
            wrapLines
            lineProps={(lineNumber) => {
              const isActive = trace?.[step]?.line === lineNumber;
              return {
                style: {
                  backgroundColor: isActive ? "#2c2c2c" : "transparent",
                  borderLeft: isActive ? "4px solid lime" : "none",
                  paddingLeft: "10px"
                }
              };
            }}
          >
              {solution}

          </SyntaxHighlighter>

        </ProblemBox>
      )}

      <Button onClick={() => setShowCode((prev) => !prev)}>
        {showCode ? "Hide Code" : "Show Code"}
      </Button>
    </Container>
  );
};

export default SolutionGenerator;

