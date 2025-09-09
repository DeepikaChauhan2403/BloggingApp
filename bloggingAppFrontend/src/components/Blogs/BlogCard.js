import {
    Card,
    CardContent,
    Typography,
    TextField,
    Button,
    Box,
    Fade,
    Stack,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import axios from "axios";
import { useState } from "react";
import formatDateAndTime from "../../Utils/DateTimeUtils";

function BlogCard({ props, setMyBlogs, myBlogs, homepage, binpage }) {
    const [isEdit, setIsEdit] = useState(false);
    const [newTitle, setNewTitle] = useState("");
    const [newTextBody, setNewTextBody] = useState("");
    const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);

    const token = localStorage.getItem("token");

    const moveToBin = (blogId) => {
        axios
            .delete(
                `${process.env.REACT_APP_BACKEND_URL}/blog/delete-blog/${blogId}`,
                {
                    headers: {
                        "X-Acciojob": token,
                    },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    alert(res.data.message);
                    const updatedBlogs = myBlogs.filter((blog) => blog._id !== blogId);
                    setMyBlogs(updatedBlogs);
                }
            })
            .catch((err) => {
                alert("Error: " + err);
            });
    };

    const restoreBlog = (blogId) => {
        axios
            .get(
                `${process.env.REACT_APP_BACKEND_URL}/blog/restoreDeleted-blog/${blogId}`,
                {
                    headers: {
                        "X-Acciojob": token,
                    },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    alert(res.data.message);
                    const updatedBlogs = myBlogs.filter((blog) => blog._id !== blogId);
                    setMyBlogs(updatedBlogs);
                }
            })
            .catch((err) => {
                alert("Error: " + err);
            });
    };

    const handleDeleteBlog = (blogId) => {
        axios
            .delete(
                `${process.env.REACT_APP_BACKEND_URL}/blog/delete-blog-permanent/${blogId}`,
                {
                    headers: {
                        "X-Acciojob": token,
                    },
                }
            )
            .then((res) => {
                if (res.data.status === 200) {
                    alert(res.data.message);
                    const updatedBlogs = myBlogs.filter((blog) => blog._id !== blogId);
                    setMyBlogs(updatedBlogs);
                }
            })
            .catch((err) => {
                alert("Error: " + err);
            });
    };

    const handleSubmit = (e, blogId) => {
        e.preventDefault();
        const updatedBlog = {
            blogId,
            title: newTitle,
            textBody: newTextBody,
        };

        axios
            .put(
                `${process.env.REACT_APP_BACKEND_URL}/blog/edit-blog`,
                updatedBlog,
                {
                    headers: {
                        "X-Acciojob": token,
                    },
                }
            )
            .then((res) => {
                alert(res.data.message);
                setIsEdit(false);
                window.location.reload();
            })
            .catch((err) => {
                alert("Error: " + err);
            });
    };

    const isEditable = (creationDateTime) => {
        const created = new Date(creationDateTime);
        const now = new Date();
        const diffMs = now - created;
        const diffMins = diffMs / (1000 * 60);
        return diffMins <= 30; // true if blog is ≤ 30 mins old
    };

    const getDaysLeftToRestore = (deletionDateTime) => {
        const deletionDate = new Date(deletionDateTime);
        const now = new Date();
        const diffInMs = now - deletionDate;
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
        const daysLeft = 30 - diffInDays;

        return daysLeft > 0
            ? `${daysLeft} day${daysLeft !== 1 ? "s" : ""} left to restore`
            : "Restoration period expired";
    }

    return (
        <>
            <Card
                sx={{
                    width: "100%",
                    mb: 3,
                    boxShadow: 4,
                    transition: "transform 0.3s, background-color 0.3s",
                    backgroundColor: "#f5faff	",
                    display: "flex",
                    flexDirection: "column",
                    wordWrap: "break-word",
                    overflow: "visible",
                    "&:hover": {
                        transform: "scale(1.01)",
                        backgroundColor: "#e3f2fd",
                    },
                }}
            >

                <CardContent>
                    <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="h6" fontWeight="bold">
                            {props.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {formatDateAndTime(new Date(props.creationDateTime))}
                        </Typography>
                    </Box>

                    <Typography variant="body1" mb={2}>
                        {props.textBody}
                    </Typography>

                    {homepage && (
                        <Typography variant="subtitle2" color="text.secondary" textAlign="right">
                            - by {props.username}
                        </Typography>
                    )}

                    {binpage && (
                        <Typography sx={{ mt: 1, fontSize: "14px", color: "#757575" }}>
                            {getDaysLeftToRestore(props.deletionDateTime)}
                        </Typography>
                    )}

                    {!homepage && (
                        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
                            {binpage ? (
                                <Button
                                    onClick={() => restoreBlog(props._id)} // You can replace this with your restore function
                                    sx={{
                                        backgroundColor: "#4caf50",
                                        color: "#fff",
                                        borderRadius: "8px",
                                        paddingX: 2.5,
                                        paddingY: 1,
                                        textTransform: "none",
                                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                        "&:hover": {
                                            backgroundColor: "#388e3c",
                                        },
                                    }}
                                >
                                    Restore Blog
                                </Button>
                            ) : (
                                isEditable(props.creationDateTime) && (
                                    <Button
                                        onClick={() => setIsEdit(!isEdit)}
                                        sx={{
                                            backgroundColor: "#1976d2",
                                            color: "#fff",
                                            borderRadius: "8px",
                                            paddingX: 2.5,
                                            paddingY: 1,
                                            textTransform: "none",
                                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                            "&:hover": {
                                                backgroundColor: "#1565c0",
                                            },
                                        }}
                                    >
                                        {isEdit ? "Cancel" : "Edit Blog"}
                                    </Button>
                                )
                            )}


                            {binpage ? (
                                // Show 'Delete Blog' if in Bin Page
                                <Button
                                    onClick={() => {
                                        setSelectedBlogId(props._id);
                                        setOpenConfirmDialog(true);
                                    }}
                                    sx={{
                                        backgroundColor: "#f44336",
                                        color: "#fff",
                                        borderRadius: "8px",
                                        paddingX: 2.5,
                                        paddingY: 1,
                                        textTransform: "none",
                                        fontWeight: "bold",
                                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                        "&:hover": {
                                            backgroundColor: "#d32f2f",
                                        },
                                    }}
                                >
                                    Delete Blog
                                </Button>
                            ) : (
                                // Show 'Move to Bin' if not in Bin Page
                                <Button
                                    onClick={() => {
                                        setSelectedBlogId(props._id);
                                        setOpenConfirmDialog(true);
                                    }}
                                    sx={{
                                        backgroundColor: "#ffa000",
                                        color: "#fff",
                                        borderRadius: "8px",
                                        paddingX: 2.5,
                                        paddingY: 1,
                                        textTransform: "none",
                                        fontWeight: "bold",
                                        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                                        "&:hover": {
                                            backgroundColor: "#ff8f00",
                                        },
                                    }}
                                >
                                    Move to Bin
                                </Button>
                            )}
                        </Stack>
                    )}


                    {isEdit && (
                        <Fade in={isEdit}>
                            <Box
                                component="form"
                                onSubmit={(e) => handleSubmit(e, props._id)}
                                mt={3}
                            >
                                <TextField
                                    fullWidth
                                    label="Title"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                    margin="normal"
                                    required
                                />
                                <TextField
                                    fullWidth
                                    label="Text Body"
                                    value={newTextBody}
                                    onChange={(e) => setNewTextBody(e.target.value)}
                                    multiline
                                    rows={4}
                                    margin="normal"
                                    required
                                />
                                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                                    Save Changes
                                </Button>
                            </Box>
                        </Fade>
                    )}
                </CardContent>
            </Card>

            {/* <Dialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
                PaperProps={{
                    sx: {
                        minHeight: "180px",
                        padding: 1,
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: "bold", marginBottom: "40px" }}>
                    Are you sure you want to delete this blog?
                </DialogTitle>

                <DialogActions
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingX: 3,
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => setOpenConfirmDialog(false)}
                        sx={{
                            backgroundColor: "#1976d2",
                            color: "#fff",
                            borderRadius: "8px",
                            paddingX: 2.5,
                            paddingY: 1,
                            textTransform: "none",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            "&:hover": {
                                backgroundColor: "#1565c0",
                            },
                        }}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={() => {
                            moveToBin(selectedBlogId);
                            setOpenConfirmDialog(false);
                        }}
                        sx={{
                            backgroundColor: "#f44336",
                            color: "#fff",
                            borderRadius: "8px",
                            paddingX: 2.5,
                            paddingY: 1,
                            textTransform: "none",
                            fontWeight: "bold",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            "&:hover": {
                                backgroundColor: "#d32f2f",
                            },
                        }}
                    >
                        Yes, Delete
                    </Button>
                </DialogActions>
            </Dialog> */}

            <Dialog
                open={openConfirmDialog}
                onClose={() => setOpenConfirmDialog(false)}
                PaperProps={{
                    sx: {
                        minHeight: "180px",
                        padding: 1,
                    },
                }}
            >
                <DialogTitle sx={{ fontWeight: "bold", marginBottom: "40px" }}>
                    {binpage
                        ? "Are you sure you want to delete this blog?"
                        : "Are you sure you want to move this blog to the bin? Once moved, it can be restored within 30 days."}
                </DialogTitle>

                <DialogActions
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingX: 3,
                    }}
                >
                    <Button
                        variant="contained"
                        onClick={() => setOpenConfirmDialog(false)}
                        sx={{
                            backgroundColor: "#1976d2",
                            color: "#fff",
                            borderRadius: "8px",
                            paddingX: 2.5,
                            paddingY: 1,
                            textTransform: "none",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            "&:hover": {
                                backgroundColor: "#1565c0",
                            },
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={() => {
                            if (binpage) {
                                handleDeleteBlog(selectedBlogId);
                            } else {
                                moveToBin(selectedBlogId);
                            }
                            setOpenConfirmDialog(false);
                        }}
                        sx={{
                            backgroundColor: "#f44336",
                            color: "#fff",
                            borderRadius: "8px",
                            paddingX: 2.5,
                            paddingY: 1,
                            textTransform: "none",
                            fontWeight: "bold",
                            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                            "&:hover": {
                                backgroundColor: "#d32f2f",
                            },
                        }}
                    >
                        {binpage ? "Yes, Delete" : "Yes, Move to Bin"}
                    </Button>
                </DialogActions>
            </Dialog>


        </>
    );
}

export default BlogCard;
