import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import axios from "axios";
import BlogCard from "../components/Blogs/BlogCard";

function Homepage() {
    const [homeBlogs, setHomeBlogs] = useState();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/blog/homepage-blogs`, {
                headers: {
                    "X-Acciojob": token,
                },
            })
            .then((res) => {
                setHomeBlogs(res.data.data);
            })
            .catch((err) => {
                alert(err);
            });
    }, [token]);


    return (
        <>
            <Header />
            <div style={{ padding: "3rem" }}>
                <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Homepage</h1>
                {
                    homeBlogs?.map((blog) => (
                        <BlogCard
                            props={blog}
                            homepage={true} 
                            binpage={false} />
                    ))
                }
            </div>
        </>
    )
}

export default Homepage;