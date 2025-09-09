import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import axios from "axios";
import UserCard from "../components/Users/UsersCard";

function FollowingList() {
    const [followingList, setFollowingList] = useState();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/follow/following-list`, {
                headers: {
                    "X-Acciojob": token,
                },
            })
            .then((res) => {
                let followingListArr = [];
                res.data.data.forEach((user) => {
                    const userObj = {
                        _id: user._id,
                        username: user.username,
                        name: user.name,
                        email: user.email,
                        follow: true,
                    };

                    followingListArr.push(userObj);
                });

                setFollowingList(followingListArr);
            })
            .catch((err) => {
                alert(err);
            })
    }, [token]);


    return (
        <>
            <Header />
            <div style={{ padding: "3rem" }}>
                <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Following List</h1>
                <div style={{ display: "flex" }}>
                    {
                        followingList?.map((user) => (
                            <UserCard props={user} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default FollowingList;