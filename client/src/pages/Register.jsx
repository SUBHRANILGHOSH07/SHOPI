import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const [username,setUsername] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      alert("Passwords don't match!!... Please try again");
      setPassword("");
      setConfirmPassword("");
      return;
    }
  
    if (username === "" || password === "" || email === "" || confirmPassword === "") {
      alert("Please fill all the fields");
      return;
    }
  
    const API_URL = "http://localhost:5000/api/auth/register";
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
  
    try {
      const response = await axios.post(API_URL, {
        username,
        email,
        password,
      }, config);
  
      console.log("Registration successful:", response.data);
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.response ? err.response.data : err.message);
      alert(`Registration failed: ${err.response ? err.response.data.message : err.message}`);
    }
  };
  
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input onChange={(e)=>{setUsername(e.target.value)}} placeholder="username" />
          <Input onChange={(e)=>{setEmail(e.target.value)}} placeholder="email" />
          <Input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="password" />
          <Input type="password" onChange={(e)=>{setConfirmPassword(e.target.value)}} placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
