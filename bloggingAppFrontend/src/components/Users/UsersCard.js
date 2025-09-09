// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';

// function UserCard({ props }) {
//     const token = localStorage.getItem("token");

//     const handleFollow = (userId) => {
//         const followObj = { followingUserId: userId };

//         axios.post(
//             `${process.env.REACT_APP_BACKEND_URL}/follow/follow-user`,
//             followObj,
//             {
//                 headers: {
//                     "X-Acciojob": token,
//                 },
//             }
//         )
//             .then((res) => {
//                 alert("Successfully followed!");
//                 window.location.reload();
//             })
//             .catch((err) => {
//                 alert(err);
//             });
//     };

//     const handleUnfollow = (userId) => {
//         const followObj = { followingUserId: userId };

//         axios.post(
//             `${process.env.REACT_APP_BACKEND_URL}/follow/unfollow-user`,
//             followObj,
//             {
//                 headers: {
//                     "X-Acciojob": token,
//                 },
//             }
//         )
//             .then((res) => {
//                 alert("Successfully unfollowed!");
//                 window.location.reload();
//             })
//             .catch((err) => {
//                 alert(err);
//             });
//     }

//     return (
//         <Card style={{ width: '18rem', margin: '10px' }}>
//             <Card.Body>
//                 <Card.Title>{props.name}</Card.Title>
//                 <Card.Text>{props.username}</Card.Text>
//                 <Card.Text>{props.email}</Card.Text>
//                 {
//                     props.follow ? (
//                         <>
//                             <Button variant="danger" onClick={() => handleUnfollow(props._id)}>Unfollow</Button>
//                         </>
//                     ) : (
//                         <>
//                             <Button variant="primary" onClick={() => handleFollow(props._id)}>Follow</Button>
//                         </>)
//                 }
//             </Card.Body>
//         </Card>
//     );
// }

// export default UserCard;


import React from 'react';
import axios from 'axios';
import {
    Card,
    CardContent,
    Typography,
    Button,
    Avatar,
    Box,
    Grow,
    Stack
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function UserCard({ props }) {
    const token = localStorage.getItem("token");

    const handleFollow = (userId) => {
        const followObj = { followingUserId: userId };

        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/follow/follow-user`,
            followObj,
            {
                headers: {
                    "X-Acciojob": token,
                },
            }
        )
            .then(() => {
                alert("Successfully followed!");
                window.location.reload();
            })
            .catch((err) => {
                alert(err);
            });
    };

    const handleUnfollow = (userId) => {
        const followObj = { followingUserId: userId };

        axios.post(
            `${process.env.REACT_APP_BACKEND_URL}/follow/unfollow-user`,
            followObj,
            {
                headers: {
                    "X-Acciojob": token,
                },
            }
        )
            .then(() => {
                alert("Successfully unfollowed!");
                window.location.reload();
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <Grow in timeout={500}>
            <Card
                sx={{
                    width: 300,
                    m: 2,
                    p: 1,
                    borderRadius: 3,
                    boxShadow: 4,
                    transition: "transform 0.3s, background-color 0.3s",
                    backgroundColor: "#f5faff	",
                    "&:hover": {
                        transform: "scale(1.01)",
                        backgroundColor: "#e3f2fd",
                    },
                }}
            >
                <CardContent>
                    <Stack spacing={2} alignItems="center">
                        <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main' }}>
                            <PersonIcon />
                        </Avatar>
                        <Box textAlign="center">
                            <Typography variant="h6" fontWeight="bold">
                                {props.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                @{props.username}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {props.email}
                            </Typography>
                        </Box>

                        {props.follow ? (
                            <Button
                                variant="contained"
                                color="error"
                                fullWidth
                                onClick={() => handleUnfollow(props._id)}
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                            >
                                Unfollow
                            </Button>
                        ) : (
                            <Button
                                variant="contained"
                                color="primary"
                                fullWidth
                                onClick={() => handleFollow(props._id)}
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                            >
                                Follow
                            </Button>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        </Grow>
    );
}

export default UserCard;
