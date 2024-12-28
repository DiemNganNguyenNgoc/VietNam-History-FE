import React, { useEffect, useState } from "react";
import { Styles } from "../../style";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import * as UserService from "../../services/UserService";
import * as AdminService from "../../services/AdminService";
import { resetUser } from "../../redux/slides/userSlide";
import { resetAdmin } from "../../redux/slides/adminSlide";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  console.log("user", user);

  const admin = useSelector((state) => state.admin);
  console.log("admin", admin);

  const dispatch = useDispatch();

  const [img, setImg] = useState("");
  const [name, setName] = useState("");

  const handleNavigateLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    try {
      (await UserService.logoutUser()) || AdminService.logoutAdmin();
      dispatch(resetUser()) || dispatch(resetAdmin());
      localStorage.clear();
      alert("Logout successful");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handleNavigateUserProfile = () => {
    if (admin?.isAdmin) {
      navigate("/admin/profile");
    } else {
      navigate("/profile");
    }
  };

  const content = (
    <div>
      {["Logout", "Profile"].map((item, index) => (
        <p
          key={index}
          onClick={
            item === "Logout"
              ? handleLogout
              : item === "Profile"
              ? handleNavigateUserProfile
              : null
          }
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#C5E3FC")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
          style={{
            padding: "10px",
            margin: 0,
            cursor: "pointer",
            transition: "background-color 0.3s",
          }}
        >
          {item}
        </p>
      ))}
    </div>
  );

  useEffect(() => {
    // console.log("User state:", user); // To debug the user state after logout
    setName(user?.name || admin?.name);
    setImg(user?.img || admin?.img);
  }, [user, admin]);

  return (
    <>
      <nav className="navbar" style={{ backgroundColor: "#023E73" }}>
        <div className="container">
          <a className="navbar-brand" href="#">
            SHARING-CODE
          </a>

          <input
            class="form-control"
            type="text"
            placeholder="Search question"
            style={{ width: "500px", height: "35px" }}
          ></input>

          <div>
            <div className="btn">
              {user?.name || admin?.name ? (
                <>
                  <Popover content={content} trigger="click">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <i
                        class="bi bi-person-circle"
                        style={Styles.iconHeader}
                      ></i>
                      <span
                        style={{
                          marginTop: "0px",
                          fontSize: "15px",
                          fontWeight: "500",
                          color: "#FFFFFF",
                        }}
                      >
                        {user.name || admin.name}
                      </span>
                    </div>
                  </Popover>
                </>
              ) : (
                <div
                  onClick={handleNavigateLogin}
                  style={{ cursor: "pointer" }}
                >
                  {img ? (
                    <img
                      src={img}
                      alt="avatar"
                      style={{
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <i
                      className="bi bi-person-circle"
                      style={Styles.iconHeader}
                    ></i>
                  )}
                </div>
              )}
            </div>
            <div className="btn">
              <i className="bi bi-bell-fill" style={Styles.iconHeader}></i>
            </div>
            <div className="btn">
              <i className="bi bi-trophy-fill" style={Styles.iconHeader}></i>
            </div>
            <div className="btn">
              <i
                className="bi bi-question-circle-fill"
                style={Styles.iconHeader}
              ></i>
            </div>
          </div>
        </div>
      </nav>

      {/* <hr style={{ background: 'black', height: '2px', border: 'none' }} /> */}

      {/* Tại chưa dẫn link nên nó cảnh báo thôi, kh sao đâu nha */}
      <nav
        className="navbar"
        style={{ backgroundColor: "#023E73", height: "65px" }}
      >
        <div class="container">
          <ul class="nav nav-underline">
            <li class="nav-item">
              <a class="nav-link" href="/" style={Styles.textHeader}>
                <i class="bi bi-house-door-fill" style={Styles.iconHeader}></i>
                Home
              </a>
            </li>
          </ul>
          <ul class="nav nav-underline">
            <li class="nav-item">
              <a class="nav-link" href="/question" style={Styles.textHeader}>
                <i class="bi bi-chat-left-fill" style={Styles.iconHeader}></i>
                Questions
              </a>
            </li>
          </ul>
          <ul class="nav nav-underline">
            <li class="nav-item">
              <a class="nav-link" href="/tag" style={Styles.textHeader}>
                <i class="bi bi-tags-fill" style={Styles.iconHeader}></i>
                Tags
              </a>
            </li>
          </ul>
          <ul class="nav nav-underline">
            <li class="nav-item">
              <a
                class="nav-link"
                href="/other-list-user"
                style={Styles.textHeader}
              >
                <i class="bi bi-people-fill" style={Styles.iconHeader}></i>
                Users
              </a>
            </li>
          </ul>
          {admin?.isAdmin && (
            <ul class="nav nav-underline">
              <li class="nav-item">
                <a
                  class="nav-link"
                  href="/admin/manage"
                  style={Styles.textHeader}
                >
                  <i class="bi bi-gear" style={Styles.iconHeader}></i>
                  Manage System
                </a>
              </li>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default HeaderComponent;
