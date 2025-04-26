import React, { useState } from "react";
import { Container, Button } from "./styles";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeEditor = () => {
    const [code, setCode] = useState(`print("Hello, World!")`);
    const [output, setOutput] = useState("");

    const runCode = async () => {
        try {
            const response = await fetch("http://localhost:5000/api/execute", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ code })
            });

            const data = await response.json();
            setOutput(data.output);
        } catch (error) {
            console.error("Error running code", error);
        }
    };

    return (
        <Container>
            <h3>Code Editor</h3>
            <textarea
                rows="6"
                cols="50"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ width: "100%", padding: "10px", fontSize: "14px" }}
            />
            <Button onClick={runCode}>Run Code</Button>

            {output && (
                <div>
                    <h4>Output:</h4>
                    <SyntaxHighlighter language="text" style={darcula}>
                        {output}
                    </SyntaxHighlighter>
                </div>
            )}
        </Container>
    );
};

export default CodeEditor;
