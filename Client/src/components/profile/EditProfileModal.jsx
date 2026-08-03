import { Button, Modal, TextInput, Textarea } from "@mantine/core";
import { useEffect, useState } from "react";
import { updateProfile } from "../../api/profileApi";

const EditProfileModal = ({ opened, close, user, fetchProfile }) => {
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setBio(user.bio || "");
        }
    }, [user, opened, close]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const res = await updateProfile({
                name,
                bio,
            });
            fetchProfile();
            close();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            opened={opened}
            onClose={close}
            title="Edit Profile"
            centered
            radius="md"
            size="md"
            padding="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <TextInput
                    label="Name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <Textarea
                    label="Bio"
                    placeholder="Tell something about yourself..."
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    minRows={3}
                    maxRows={6}
                    autosize
                />

                <Button
                    type="submit"
                    fullWidth
                    loading={loading}
                    disabled={loading}
                    mt="md"
                >
                    Save Changes
                </Button>
            </form>
        </Modal>
    );
};

export default EditProfileModal;