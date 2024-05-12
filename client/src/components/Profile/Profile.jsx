import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FotoCard from "./FotoCard";
import SocialLinks from "./SocialLinks";
import UserInfo from "./UserInfo";
import { useToastNotification } from "../../hooks/useToastNotification";
import { useUser } from "../../contexts/UserContext";

const Profile = () => {
  const { id } = useParams();
  const { user, isCompany } = useUser();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { toastError, toastSuccess } = useToastNotification();

  const navigation = useNavigate();

  const editProfile = useCallback(() => {
    setIsEditing(true);
  }, []);

  const onCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const onEditProfile = useCallback(
    (newProfile) => {
      console.log("Save new profile", newProfile);
      axios
        .patch(
          process.env.REACT_APP_API_URL +
            "/api/v1/" +
            (!isCompany ? "volunteer" : "organization") +
            "/profiles/" +
            newProfile.id,
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
        .catch((error) => {
          toastError(error.message);
        });
    },
    [isCompany, toastError]
  );

  useEffect(() => {
    const fetchUser = async () => {
      axios
        .get(
          process.env.REACT_APP_API_URL +
            "/api/v1/" +
            (!isCompany ? "volunteer" : "organization") +
            "/profiles" +
            (id && !Number.isNaN(id) ? "/" + id : ""),
          {
            headers: id
              ? { "content-type": "application/json" }
              : {
                  "content-type": "application/json",
                  authorization: localStorage.getItem("token"),
                },
          }
        )
        .then((resp) => resp.data)
        .then((data) => {
          console.log(data);
          setProfile(data.profile);
          setLinks(
            Object.keys(data.profile)
              .filter((key) => key.includes("link"))
              .map((key) => ({
                key,
                [key]: data.profile[key],
              }))
          );
        })
        .catch((error) => {
          console.log(error);
          toastError(error?.message);
          // navigation("/signin");
        });
    };
    fetchUser();
  }, [id, isCompany, navigation, toastError, user]);

  const [links, setLinks] = useState([]);

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
                name={profile?.organization_name}
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
              isCompany={isCompany}
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
