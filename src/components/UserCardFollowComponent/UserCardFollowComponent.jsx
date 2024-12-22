import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { followUser } from "../../services/UserService"; // API để xử lý Follow

const UserCardFollowComponent = ({
  id,
  name,
  img,
  address,
  initialFollowerCount,
  isInitiallyFollowed,
}) => {
  const navigate = useNavigate();
  const [isFollowed, setIsFollowed] = useState(isInitiallyFollowed);
  const [followerCount, setFollowerCount] = useState(initialFollowerCount);

  // Xử lý khi người dùng click vào card
  const handleCardClick = () => {
    navigate(`/otheruserprofile/${id}`);
  };

  const handleFollowClick = async (e) => {
    e.stopPropagation(); // Ngăn chặn click vào card khi nhấn nút
    try {
      // Gọi API Follow
      await followUser(id, !isFollowed);
      // Cập nhật trạng thái nút và followerCount
      setIsFollowed(!isFollowed);
      setFollowerCount((prevCount) =>
        isFollowed ? prevCount - 1 : prevCount + 1
      );
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <div className="col-12 col-md-6 mb-4">
      {/* Card container */}
      <div
        className="card h-100"
        style={{
          cursor: "pointer",
          maxWidth: "600px",
          margin: "0 auto",
        }}
        onClick={handleCardClick}
      >
        <div className="row g-0 align-items-center">
          <div className="col-md-4">
            <img
              src={img || "https://via.placeholder.com/150"} // Ảnh mặc định nếu không có img
              alt={`${name}'s avatar`}
              className="img-fluid rounded-circle p-2"
              style={{
                maxHeight: "100px",
                objectFit: "cover",
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">{name || "Anonymous User"}</h5>
              <p className="card-text text-muted">
                {address || "Address not available"}
              </p>
              <p className="card-text">
                <small className="text-muted">{followerCount} Followers</small>
              </p>
              <button
                onClick={handleFollowClick}
                className={`btn btn-sm ${
                  isFollowed ? "btn-secondary" : "btn-primary"
                }`}
              >
                {isFollowed ? "Followed" : "Follow"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCardFollowComponent;
