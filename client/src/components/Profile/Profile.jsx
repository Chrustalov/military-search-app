import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FotoCard from "./FotoCard";
import SocialLinks from "./SocialLinks";
import UserInfo from "./UserInfo";

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const navigation = useNavigate();

  const editProfile = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const onEditProfile = useCallback((newProfile) => {
    console.log("Save new profile", newProfile);
    axios
      .patch(
        "PROFILE_URL" + "/" + newProfile.id,
        { profile: newProfile },
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((resp) => resp.data)
      .then((data) => {
        setProfile(data.profile);
        setIsEditing(false);
      })
      .catch((error) => {});
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      axios
        .get("PROFILE_URL" + (id ? "/" + id : ""), {
          headers: id
            ? { "content-type": "application/json" }
            : {
                "content-type": "application/json",
                authorization: localStorage.getItem("token"),
              },
        })
        .then((resp) => resp.data)
        .then((data) => {
          console.log(data);
          setUser(data.user);
          setProfile(data.profile);
        })
        .catch((error) => {
          navigation("/signin");
        });
    };
    fetchUser();
  }, [id, navigation]);

  const [links, setLinks] = useState([
    "https://www.facebook.com/",
    "https://www.g.com/",
    "https://www.instagram.com/",
  ]);

  const addLink = useCallback((newLink) => {
    setLinks((prev) => [...prev, newLink]);
  }, []);

  const removeLink = useCallback((index) => {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const editLink = useCallback((index, newLink) => {
    setLinks((prev) => prev.map((link, i) => (i === index ? newLink : link)));
  }, []);

  if (!user) {
    return (
      <div className="container py-5">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <main style={{ minHeight: "600px" }}>
      <section>
        <div className="container py-5">
          <div className="row">
            {!isEditing && (
              <FotoCard
                aboutMe={profile?.about_me}
                avatarUrl={profile?.avatar.url}
                name={user.name}
                isEditing={isEditing && !id}
                onEditProfile={editProfile}
              >
                <SocialLinks
                  links={links}
                  addLink={addLink}
                  editLink={editLink}
                  removeLink={removeLink}
                />
              </FotoCard>
            )}
            <UserInfo
              profile={profile}
              isEditing={isEditing}
              onEditProfile={onEditProfile}
              onCancel={onCancel}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
