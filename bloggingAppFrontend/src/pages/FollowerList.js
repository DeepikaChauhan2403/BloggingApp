import React, { useEffect, useState } from "react";
import Header from "../components/common/Header";
import axios from "axios";
import UserCard from "../components/Users/UsersCard";

function FollowerList() {
    const [followerList, setFollowerList] = useState();
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}/follow/follower-list`, {
                headers: {
                    "X-Acciojob": token,
                },
            })
            .then((res) => {
                axios
                    .get(`${process.env.REACT_APP_BACKEND_URL}/follow/following-list`, {
                        headers: {
                            "X-Acciojob": token,
                        },
                    })
                    .then((res2) => {
                        let followingMap = new Map();

                        res2.data.data.forEach((user) => {
                            followingMap.set(user.username, true);
                        });

                        let allUserDetails = [];

                        res.data.data.forEach((user) => {
                            if (followingMap.get(user.username)) {
                                let userObj = {
                                    _id: user._id,
                                    username: user.username,
                                    name: user.name,
                                    email: user.email,
                                    follow: true,
                                };

                                allUserDetails.push(userObj);
                            }
                            else {
                                let userObj = {
                                    _id: user._id,
                                    username: user.username,
                                    name: user.name,
                                    email: user.email,
                                    follow: false,
                                };

                                allUserDetails.push(userObj);
                            }
                        });

                        setFollowerList(allUserDetails);
                    })
                    .catch((err) => {
                        alert(err);
                    });
            })
            .catch((err) => {
                alert(err);
            })
    }, [token]);


    return (
        <>
            <Header />
            <div style={{ padding: "3rem" }}>
                <h1 style={{ textAlign: "center", marginBottom: "40px" }}>Follower List</h1>
                <div style={{ display: "flex" }}>
                    {
                        followerList?.map((user) => (
                            <UserCard props={user} />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default FollowerList;