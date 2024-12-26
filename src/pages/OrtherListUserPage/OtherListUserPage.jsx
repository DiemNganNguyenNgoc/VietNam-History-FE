import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserCardFollowComponent from "../../components/UserCardFollowComponent/UserCardFollowComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { getAllUser } from "../../services/UserService"; // API để lấy allUser
import { setAllUser } from "../../redux/slides/userSlide";
import "./OtherListUserPage.css";

const OtherListUserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  // console.log("user", user);
  
  const { allUser } = useSelector((state) => state.user);
  console.log("allUser", allUser);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getAllUser(); // Gọi API lấy toàn bộ người dùng
        dispatch(setAllUser(response.data)); // Lưu vào Redux
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [dispatch]);

  // Lọc bỏ người dùng hiện tại ra khỏi danh sách
  const filteredUsers = allUser.filter((u) => u._id !== user.id);

  return (
    <>
      <div className="container text-left">
        <h1 className="my-4" style={{ color: "#033F74" }}>
          User List
        </h1>
        <div className="row">
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div className="col-md-6 mb-4" key={user._id}>
                {/* Mỗi card sẽ nằm trong 1 cột */}
                <UserCardFollowComponent
                  id={user._id}
                  name={user.name}
                  img={user.img}
                  address={user.address}
                  followerCount={user.followerCount}
                />
              </div>
            ))
          ) : (
            <p>Không có dữ liệu để hiển thị.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default OtherListUserPage;
