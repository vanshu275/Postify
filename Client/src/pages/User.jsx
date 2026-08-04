import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getProfile } from "../api/profileApi";

import UserHeader from "../components/user/UserHeader"
import UserTabs from "../components/user/UserTabs";
import MyPosts from "../components/profile/MyPosts";
import SavedPosts from "../components/profile/SavedPosts";

const User = () => {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [activeTab, setActiveTab] = useState("posts");

    useEffect(() => {
        fetchUser();
    }, [username])
    const fetchUser = async () => {
        const res = await getProfile(username);
        setUser(res.data)
    }


    if (!user) {
        return (
            <div className="py-20 text-center text-zinc-400">
                Loading Profile...
            </div>
        );
    }

    return (
        <div>
            <UserHeader user={user} />
            <UserTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />
             
            {activeTab === "posts" && <MyPosts />}

            {activeTab === "saved" && <SavedPosts />}
        </div>
    )
}

export default User
