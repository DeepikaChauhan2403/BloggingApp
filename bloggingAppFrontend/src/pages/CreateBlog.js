
// import React, { useState } from "react";
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";
// import axios from "axios";
// import Header from "../components/common/Header";

// function CreateBlog() {
//   const [title, setTitle] = useState();
//   const [textBody, setTextBody] = useState();

//   const token = localStorage.getItem("token");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const blogObj = {
//       title,
//       textBody,
//     };

//     axios
//       .post(`${process.env.REACT_APP_BACKEND_URL}/blog/create-blog`, blogObj, {
//         headers: {
//           "X-Acciojob": token,
//         },
//       })
//       .then((res) => {
//         if (res.data.status === 201) {
//           window.location.href = "/my-blogs";
//         } else {
//           alert(res.data.message);
//         }
//       })
//       .catch((err) => {
//         alert("ERROR : " + err);
//       });
//   };

//   return (
//     <>
//       <Header />
//       <div style={{ padding: "3rem" }}>
//         <Form onSubmit={handleSubmit}>
//           <h1
//             style={{
//               marginBottom: "40px",
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             Create a Blog
//           </h1>
//           <Form.Group className="mb-3" controlId="title">
//             <Form.Label>Title</Form.Label>
//             <Form.Control
//               type="text"
//               placeholder="Enter Title"
//               onChange={(e) => setTitle(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group className="mb-3" controlId="textbody">
//             <Form.Label>Text Body</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={5}
//               placeholder="Enter Text Body"
//               onChange={(e) => setTextBody(e.target.value)}
//             />
//           </Form.Group>
//           <Button type="submit" style={{ marginTop: "20px" }}>
//             Create Blog
//           </Button>
//         </Form>
//       </div>
//     </>
//   );
// }

// export default CreateBlog;


import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Fade,
} from "@mui/material";
import axios from "axios";
import Header from "../components/common/Header";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [textBody, setTextBody] = useState("");
  const [showForm, setShowForm] = useState(true);

  const token = localStorage.getItem("token");

  const handleSubmit = (e) => {
    e.preventDefault();

    const blogObj = { title, textBody };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/blog/create-blog`, blogObj, {
        headers: { "X-Acciojob": token },
      })
      .then((res) => {
        if (res.data.status === 201) {
          window.location.href = "/my-blogs";
        } else {
          alert(res.data.message);
        }
      })
      .catch((err) => {
        alert("ERROR : " + err);
      });
  };

  return (
    <>
      <Header />
      <div style={{ padding: "3rem" }}>
        <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Homepage</h1>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Fade in={showForm}>
            <Paper
              elevation={4}
              sx={{
                // maxWidth: 600,
                width: "90%",
                p: 4,
                borderRadius: "16px",
                backgroundColor: "#f4f6f8",
              }}
            >
              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sx={{
                    mb: 3,
                    "& .MuiInputBase-root": {
                      backgroundColor: "#ffffff",
                    },
                  }}
                />

                <TextField
                  label="Text Body"
                  variant="outlined"
                  fullWidth
                  required
                  multiline
                  rows={6}
                  value={textBody}
                  onChange={(e) => setTextBody(e.target.value)}
                  sx={{
                    mb: 3,
                    "& .MuiInputBase-root": {
                      backgroundColor: "#ffffff",
                    },
                  }}
                />

                {/* <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}> */}
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
                  <Button
                    type="submit"
                    variant="contained"
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
                    Create Blog
                  </Button>

                  <Typography variant="body2" color="text.secondary">
                    Note: A blog can only be edited within 30 minutes of posting.
                  </Typography>
                  {/* </Box> */}
                </div>

              </Box>
            </Paper>
          </Fade>
        </Box>
      </div>
    </>
  );
}

export default CreateBlog;

