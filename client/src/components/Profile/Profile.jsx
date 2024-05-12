import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import FotoCard from "./FotoCard";
import SocialLinks from "./SocialLinks";
import UserInfo from "./UserInfo";
import UserBroadcasts from "./UserBroadcasts";
import { useToastNotification } from "../../hooks/useToastNotification";
import { useUser } from "../../contexts/UserContext";

const Profile = () => {
  const { id } = useParams();
  const { user, isCompany, cities, setCities } = useUser();
  const [profile, setProfile] = useState(null);
  const [broadcasts, setBroadcasts] = useState([]);
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
    (newProfile, broadcast = null) => {
      console.log("Save new profile", newProfile);
      axios
        .patch(
          process.env.REACT_APP_API_URL +
            "api/v1/" +
            (!isCompany ? "volunteer" : "organization") +
            "/profiles/" +
            newProfile.id,
          {
            profile: newProfile,
            broadcast: broadcast,
          },
          {
            headers: {
              "Content-Type": "multipart/form-data",
              authorization: localStorage.getItem("token"),
            },
          }
        )
        .then((resp) => resp.data)
        .then((data) => {
          console.log(data, "data from server");
          setProfile(data.profile);
          setBroadcasts(data.broadcast);
          setIsEditing(false);
          toastSuccess("Профіль збережено");
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
            "api/v1/" +
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
          setBroadcasts(data.broadcast);
        })
        .catch((error) => {
          console.log(error);
          toastError(error?.message);
          // navigation("/signin");
        });
    };
    fetchUser();
  }, [id, isCompany, navigation, toastError, user]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API_URL + "api/v1/cities")
      .then((resp) => resp.data)
      .then((data) => {
        setCities(data.cities);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [links, setLinks] = useState([]);

  const addLink = useCallback((newLink) => {
    setLinks((prev) => [...prev, newLink]);
  }, []);

  const removeLink = useCallback((index) => {
    setLinks((prev) => {
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  const editLink = useCallback(
    (index, newLink) => {
      console.log(newLink, " link to save");
      onEditProfile({ ...profile, [newLink.key]: newLink[newLink.key] });
    },
    [onEditProfile, profile]
  );

  const onBroadcastEdit = useCallback(
    (newBroadcast) => {
      onEditProfile(profile, newBroadcast);
    },
    [onEditProfile, profile]
  );

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
          <div className="row">
            {!isCompany && (
              <UserBroadcasts broadcast={broadcasts} onEdit={onBroadcastEdit} />
            )}
          </div>
        </div>
      </section>
    </main>
  );
};

export default Profile;
