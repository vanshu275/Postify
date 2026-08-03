import { useEffect, useState } from "react";
import { getMe } from "../api/authApi";

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileTabs from "../components/profile/ProfileTabs";
import MyPosts from "../components/profile/MyPosts";
import EditProfileModal from "../components/profile/EditProfileModal";
import SavedPosts from "../components/profile/SavedPosts";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [openedEditModal, setOpenedEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getMe();
      setUser(res.data);
    } catch (error) {
      console.log(error);
    }
  };


  if (!user) {
    return (
      <div className="py-20 text-center text-zinc-400">
        Loading Profile...
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
        <ProfileHeader
          user={user}
          onEditClick={() => setOpenedEditModal(true)}
        />

        <ProfileTabs
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {activeTab === "posts" && <MyPosts />}

        {activeTab === "saved" && <SavedPosts />}
      </div>

      <EditProfileModal
        opened={openedEditModal}
        close={() => setOpenedEditModal(false)}
        user={user}
        fetchProfile={fetchProfile}
      />
    </>
  );
};

export default Profile;