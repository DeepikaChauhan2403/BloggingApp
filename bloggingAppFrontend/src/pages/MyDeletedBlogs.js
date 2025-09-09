import React, { useEffect, useState } from "react";
import axios from "axios";
import BlogCard from "../components/Blogs/BlogCard";
import Header from "../components/common/Header";

function MyDeletedBlogs() {
    const [myBlogs, setMyBlogs] = useState();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/blog/get-user-deleted-blogs`, {
                headers: {
                    "X-Acciojob": token,
                },
            })
            .then((res) => {
                setMyBlogs(res.data.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, [token]);

    return (
        <>
            <Header />
            <div style={{ padding: "3rem" }}>
                <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Bin</h1>
                {
                myBlogs?.map((blog, key) => (
                    <BlogCard
                        key={key}
                        props={blog}
                        setMyBlogs={setMyBlogs}
                        myBlogs={myBlogs}
                        homepage={false}
                        binpage={true}  />
                ))
                }
            </div>
        </>
    );
}

export default MyDeletedBlogs;