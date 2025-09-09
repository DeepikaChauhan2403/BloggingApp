import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Header from "../components/common/Header";


function Register() {
    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            window.location.href = "/homepage";
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const userObj = {
            name,
            username,
            password,
            email,
        };

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/user/register`, userObj)
            .then((res) => {
                if (res.data.status === 201) {
                    window.location.href = "/login";
                } else {
                    alert(res.data.message);
                }
            })
            .catch((err) => {
                alert("error" + err);
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
                        Register into Blog App
                    </h1>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Name"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter Email"
                            onChange={(e) => setEmail(e.target.value)}
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

                    {/* Button and login link in one row */}
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
                        <Button type="submit">Register</Button>
                        <div style={{ textAlign: "center" }}>
                            <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>
                                Already registered?{" "}
                            </span>
                            <a
                                href="/login"
                                style={{
                                    fontSize: "1.1rem",
                                    fontWeight: "600",
                                    textDecoration: "none",
                                    color: "#1976d2",
                                }}
                            >
                                Login
                            </a>
                        </div>
                    </div>

                </Form>
            </div>
        </>
    );

};

export default Register;