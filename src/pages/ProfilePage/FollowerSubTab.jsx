import React from "react";
import FollowerComponent from "../../components/FollowerComponent/FollowerComponent";
import "../../css/FollowerSubTab.css";

const FollowerSubTab = (followerQuantity) => {
  followerQuantity = 6;
  return (
    <div>
      <div className="follower-title">
        <h3>Follower {followerQuantity} </h3>
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

export default FollowerSubTab;
