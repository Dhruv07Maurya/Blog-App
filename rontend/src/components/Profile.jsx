import React from "react";
import Edit from "./ui/Edit";

const Profile = () => {
  const profileData = {
    name: "John Doe",
    username: "john_doe123",
    creationDate: "2023-01-01",
    avatarUrl: "https://www.example.com/avatar.jpg", // Replace with actual avatar URL
  };

  return (
    <center className="mt-32 ml-[20rem]">
      <div className="profile-card">
        <div className="avatar-container">
          <img
            src={profileData.avatarUrl}
            alt="Profile Avatar"
            className="avatar"
          />
        </div>
        <div className="profile-details">
          <div className="profile-item">
            <label className="profile-label">Name:</label>
            <span className="profile-value">{profileData.name}</span>
          </div>
          <div className="profile-item">
            <label className="profile-label">Username:</label>
            <span className="profile-value">{profileData.username}</span>
          </div>
          <div className="profile-item">
            <label className="profile-label">Date of Creation:</label>
            <span className="profile-value">{profileData.creationDate}</span>
          </div>
        </div>
        <Edit/>
      </div>
    </center>
  );
};

export default Profile;
