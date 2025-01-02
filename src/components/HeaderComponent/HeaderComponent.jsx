import React, { useEffect, useState } from "react";
import { Styles } from "../../style";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import * as UserService from "../../services/UserService";
import * as AdminService from "../../services/AdminService";
import { resetUser } from "../../redux/slides/userSlide";
import { resetAdmin } from "../../redux/slides/adminSlide";
import * as  QuestionService from "../../services/QuestionService";
import * as  TagService from "../../services/TagService";
import './SearchButton.css';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [img, setImg] = useState("");
  const [name, setName] = useState("");
  const [searchKeyword, setSearchKeyword] = useState(""); // State to store the search input
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchTags = async () => {
  //     try {
  //       const tagsData = await TagService.getAllTag(); // Gọi API để lấy danh sách tags
  //       setTags(tagsData); // Lưu tags vào state
  //     } catch (error) {
  //       console.error("Error fetching tags:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchTags();
  // }, []);

  const checkIfTagExists = async (tag) => {
    try {
      // Gọi API để lấy danh sách tag (dựa trên API của bạn)
      const tags = await TagService.getAllTag();
      return tags.some(t => t.name.toLowerCase() === tag.toLowerCase());  // Kiểm tra xem tag có tồn tại không
    } catch (error) {
      console.error("Error checking if tag exists:", error);
      return false;
    }
  };

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
      window.location.assign("/admin/profile");
    } else {
      window.location.assign("/profile");
    }
  };

  const handleSearch = async () => {
    try {
      let tagList = [];
      let keyword = "";
  
      // Kiểm tra nếu người dùng nhập các tag phân tách bằng dấu phẩy
      if (searchKeyword.includes(",")) {
        tagList = searchKeyword
          .split(",") // Tách chuỗi theo dấu phẩy
          .map((tag) => tag.trim()) // Loại bỏ khoảng trắng thừa
          .filter((tag) => tag !== ""); // Loại bỏ tag rỗng
      } else {
        // Nếu không phải danh sách tag, kiểm tra từ khóa có phải là tag không
        const isTagSearch = await checkIfTagExists(searchKeyword);
        if (isTagSearch) {
          tagList = [searchKeyword];
        } else {
          keyword = searchKeyword; // Tìm kiếm theo từ khóa
        }
      }
  
      // Gửi yêu cầu tìm kiếm
      const results = await QuestionService.searchQuestion(
        tagList, // Danh sách các tag
        keyword, // Từ khóa tìm kiếm
        1, // Trang bắt đầu
        10, // Số lượng kết quả trên mỗi trang
        {} // Tuỳ chọn sắp xếp
      );
  
      setSearchResults(results); // Lưu kết quả tìm kiếm vào state
      navigate("/search-results", {
        state: { searchKeyword, searchResults: results },
      });
    } catch (error) {
      console.error("Search error:", error);
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
    setName(user?.name || admin?.name);
    setImg(user?.img || admin?.img);
  }, [user, admin]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <nav className="navbar" style={{ backgroundColor: "#023E73" }}>
        <div className="container">
          <a className="navbar-brand" href="/">
            SHARING-CODE
          </a>

          <div className="search-container">
      <input
        className="form-control search-input"
        type="text"
        placeholder="Search question"
        value={searchKeyword}
        onChange={(e) => setSearchKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSearch} className="search-button">Search</button>
    </div>

          {/* Display search results */}
          {searchResults.length > 0 && (
            <div>
              {searchResults.map((result, index) => (
                <div key={index}>
                  <a href={`/question/${result.id}`}>{result.title}</a>
                </div>
              ))}
            </div>
          )}

          <div>
          <div className="btn">
  {user?.name || admin?.name ? (
    <Popover content={content} trigger="click">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "20px"
        }}
      >
        <img
              src={img || "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"} // Ảnh mặc định nếu không có img
              alt={`${name}'s avatar`}
              className="img-fluid rounded-circle p-2"
              style={{
                height: "50px",
                width: "50px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
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
  ) : (
    <div
      onClick={handleNavigateLogin}
      style={{ cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}
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
      <span
        style={{
          fontSize: "16px",
          fontWeight: "100px",
          color: "#FFFFFF",
        }}
      >
        Login
      </span>
    </div>
  )}
</div>

            <div className="btn">
              <i className="bi bi-bell-fill" style={Styles.iconHeader}></i>
            </div>
          </div>
        </div>
      </nav>

      <nav
        className="navbar"
        style={{ backgroundColor: "#023E73", height: "65px" }}
      >
        <div className="container">
          <ul className="nav nav-underline">
            <li className="nav-item">
              <a className="nav-link" href="/" style={Styles.textHeader}>
                <i className="bi bi-house-door-fill" style={Styles.iconHeader}></i>
                Home
              </a>
            </li>
          </ul>
          <ul className="nav nav-underline">
            <li className="nav-item">
              <a className="nav-link" href="/question" style={Styles.textHeader}>
                <i className="bi bi-chat-left-fill" style={Styles.iconHeader}></i>
                Questions
              </a>
            </li>
          </ul>
          <ul className="nav nav-underline">
            <li className="nav-item">
              <a className="nav-link" href="/tag" style={Styles.textHeader}>
                <i className="bi bi-tags-fill" style={Styles.iconHeader}></i>
                Tags
              </a>
            </li>
          </ul>
          <ul className="nav nav-underline">
            <li className="nav-item">
              <a
                className="nav-link"
                href="/other-list-user"
                style={Styles.textHeader}
              >
                <i className="bi bi-people-fill" style={Styles.iconHeader}></i>
                Users
              </a>
            </li>
          </ul>
          {admin?.isAdmin && (
            <ul className="nav nav-underline">
              <li className="nav-item">
                <a
                  className="nav-link"
                  href="/admin/manage"
                  style={Styles.textHeader}
                >
                  <i className="bi bi-gear" style={Styles.iconHeader}></i>
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
