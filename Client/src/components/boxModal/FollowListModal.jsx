import { Modal } from "@mantine/core";
import { useEffect, useState } from "react";
import {
    getFollowers,
    getFollowing,
} from "../../api/followApi";
import { defaultProfile } from "../../constants/profile";

const FollowListModal = ({
    opened,
    onClose,
    userId,
    type,
}) => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!opened || !userId) return;

        const fetchUsers = async () => {
            try {
                setLoading(true);

                const data =
                    type === "followers"
                        ? await getFollowers(userId)
                        : await getFollowing(userId);

                setUsers(
                    type === "followers"
                        ? data.followers
                        : data.following
                );
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [opened, userId, type]);

    return (
        <Modal
            opened={opened}
            onClose={onClose}
            title={type === "followers" ? "Followers" : "Following"}
            centered
        >
            {loading ? (
                <p className="text-center text-zinc-400">
                    Loading...
                </p>
            ) : users.length === 0 ? (
                <p className="text-center text-zinc-400 py-6">
                    No {type} yet
                </p>
            ) : (
                <div className="space-y-3">
                    {users.map((item) => (
                        <div
                            key={item._id}
                            className="flex items-center gap-3"
                        >
                            <img
                                src={
                                    item.profilePic ||
                                    defaultProfile
                                }
                                alt={item.username}
                                className="h-10 w-10 rounded-full object-cover"
                            />

                            <div>
                                <p className="font-medium text-zinc-100">
                                    {item.name}
                                </p>

                                <p className="text-sm text-zinc-400">
                                    @{item.username}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </Modal>
    );
};

export default FollowListModal;