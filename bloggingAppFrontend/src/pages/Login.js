import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Header from "../components/common/Header";

function Login() {
    const [loginId, setLoginId] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            window.location.href = "/homepage";
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const loginObj = {
            loginId,
            password,
        };

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/user/login`, loginObj)
            .then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem("token", res.data.data.token); // saving token in local storage 
                    localStorage.setItem("name", res.data.data.name);
                    localStorage.setItem("email", res.data.data.email);
                    localStorage.setItem("username", res.data.data.username);
                    window.location.href = "/homepage";
                } else {
                    alert("ERROR" + res.data.message);
                }
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <>
            <Header />
            <div style={{ padding: "3rem" }}>
                <Form onSubmit={handleSubmit}>
                    <h1
                        style={{
                            marginBottom: "40px",
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        Login into Blog App
                    </h1>
                    <Form.Group className="mb-3" controlId="loginId">
                        <Form.Label>Login ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter LoginId"
                            onChange={(e) => setLoginId(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    {/* Button and register link in one row */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: "20px",
                            flexWrap: "wrap",
                            gap: "10px",
                        }}
                    >
                        <Button type="submit">Login</Button>
                        <div style={{ textAlign: "center" }}>
                            <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                                Didn't have an account?{" "}
                            </span>
                            <a
                                href="/"
                                style={{
                                    fontSize: "1.1rem",
                                    fontWeight: "600",
                                    textDecoration: "none",
                                    color: "#1976d2",
                                }}
                            >
                                Register
                            </a>
                        </div>
                    </div>

                </Form>
            </div>
        </>
    );
};

export default Login;