import styled from "styled-components";

export const Container = styled.div`
    max-width: 800px;
    margin: auto;
    padding: 20px;
    text-align: center;
`;

export const Input = styled.input`
    padding: 10px;
    width: 80%;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

export const Button = styled.button`
    padding: 10px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin: 5px;

    &:hover {
        background: #0056b3;
    }
`;

export const ProblemBox = styled.div`
    margin-top: 20px;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 5px;
    text-align: left;
`;
