import React, { useEffect, useState } from "react";
import {
    Card,
    CardContent,
    Typography,
    Avatar,
    Grid,
    Box,
    Divider,
    Button,
    Paper,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import axios from "axios";
import Header from "../components/common/Header";

const ProfileCard = () => {
    const [userDetails, setUserDetails] = useState();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/user/profile`, {
                headers: {
                    "X-Acciojob": token,
                },
            })
            .then((res) => {
                setUserDetails(res.data.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, [token]);



    return (
        <>
            <Header />
            <div style={{ padding: "3rem" }}>
                <h1 style={{ textAlign: "center", marginBottom: "40px" }}>My Profile</h1>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <Paper
                        elevation={4}
                        sx={{
                            width: "60%",
                            p: 4,
                            borderRadius: "16px",
                            backgroundColor: "#f4f6f8",
                        }}
                    >
                        <Card>
                            <CardContent>
                                <Box display="flex" justifyContent="center" mb={2}>
                                    <Avatar
                                        sx={{ bgcolor: deepPurple[500], width: 72, height: 72 }}
                                    >
                                        {userDetails?.name.charAt(0)}
                                    </Avatar>
                                </Box>

                                <Typography variant="h5" align="center" gutterBottom>
                                    {userDetails?.name}
                                </Typography>

                                <Divider sx={{ mb: 2 }} />
                                <Grid container direction="column" spacing={2}>
                                    <Grid item>
                                        <Typography variant="subtitle2" color="textSecondary" fontSize={16} fontWeight="bold">
                                            Email:
                                        </Typography>
                                        <Typography fontSize={18} fontWeight={500}>
                                            {userDetails?.email}
                                        </Typography>
                                    </Grid>

                                    <Grid item>
                                        <Typography variant="subtitle2" color="textSecondary" fontSize={16} fontWeight="bold">
                                            Username:
                                        </Typography>
                                        <Typography fontSize={18} fontWeight={500}>
                                            {userDetails?.username}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Paper>
                </Box>
            </div>
        </>
    );
}


export default ProfileCard;