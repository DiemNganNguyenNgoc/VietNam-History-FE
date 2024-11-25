import React from "react";
import "../../css/FollowingSubTab.css";
import FollowerComponent from "../../components/FollowerComponent/FollowerComponent";

const FollowingSubTab = (followerQuantity) => {
  followerQuantity = 6;
  return (
    <div>
      <div className="follower-title">
        <h3>Following {followerQuantity} </h3>
      </div>
      {/* content */}
      <div className="follower-list">
        <FollowerComponent></FollowerComponent>
        <FollowerComponent></FollowerComponent>
        <FollowerComponent></FollowerComponent>
        <FollowerComponent></FollowerComponent>
        <FollowerComponent></FollowerComponent>
        <FollowerComponent></FollowerComponent>
        <FollowerComponent></FollowerComponent>
      </div>
    </div>
  );
};

export default FollowingSubTab;
