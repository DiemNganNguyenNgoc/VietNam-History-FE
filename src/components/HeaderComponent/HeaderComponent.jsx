import React, { useEffect, useState, useRef } from "react";
import { Styles } from "../../style";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Popover } from "antd";
import * as UserService from "../../services/UserService";
import * as AdminService from "../../services/AdminService";
import * as NotificationService from "../../services/NotificationService";
import { resetUser } from "../../redux/slides/userSlide";
import { resetAdmin } from "../../redux/slides/adminSlide";
import * as QuestionService from "../../services/QuestionService";
import * as TagService from "../../services/TagService";
import Modal from "react-modal";
import "./SearchButton.css";
import ButtonComponent from "../ButtonComponent/ButtonComponent";

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const admin = useSelector((state) => state.admin);
  const [notifications, setNotifications] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const buttonRef = useRef(null);
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
      return tags.some((t) => t.name.toLowerCase() === tag.toLowerCase()); // Kiểm tra xem tag có tồn tại không
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

  // Hàm lấy thông báo của người dùng
  const fetchNotifications = async () => {
    try {
      const data = await NotificationService.getNotificationsByUserId(user?.id); // Gọi API để lấy thông báo

      // Duyệt qua từng thông báo để kiểm tra và xóa nếu không có answer_id hoặc quesVote_id
      for (const notification of data.notifications) {
        if (!notification.metadata?.answer_id && !notification.metadata?.quesVote_id) {
          // Nếu không có answer_id hoặc quesVote_id, xóa thông báo
          await NotificationService.deleteNotification(notification._id);
        }
      }

      // Sau khi xóa, lấy lại danh sách thông báo mới
      const filteredNotifications = data.notifications.filter(notification =>
        notification.metadata?.answer_id || notification.metadata?.quesVote_id
      );
      setNotifications(filteredNotifications); // Lưu thông báo hợp lệ vào state
      setLoading(false);

    } catch (err) {
      setLoading(false);
      console.error('Error fetching or deleting notifications:', err);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchNotifications(); // Gọi hàm khi component được mount
    }
  }, [user?.id]);


  // Hàm đánh dấu thông báo đã đọc
  const handleMarkAsRead = async (notificationId, questionId) => {
    try {
      await NotificationService.markAsRead(notificationId);
      fetchNotifications();
      // Đánh dấu thông báo đã đọc
      setNotifications((prevNotifications) =>
        prevNotifications.map((notif) =>
          notif._id === notificationId ? { ...notif, read: true } : notif
        )
      );
      if (questionId) {
        navigate(`/question-detail/${questionId}`);
        closeModal();
      }
    } catch (error) {
      console.error("Error marking notification as read:", error.message);
    }
  };
  // Mở modal
  const openModal = () => {
    setModalIsOpen(true);
  };

  // Đóng modal
  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <nav className="navbar" style={{ backgroundColor: "#023E73" }}>
        <div className="container">
          <a
            className="navbar-brand"
            href="/"
            style={{ color: "#FFFFFF", fontSize: "2rem", fontWeight: "bold" }}
          >
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
            <button onClick={handleSearch} className="search-button">
              Search
            </button>
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
                      marginTop: "20px",
                    }}
                  >
                    <img
                      src={
                        img ||
                        "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y"
                      } // Ảnh mặc định nếu không có img
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
                  style={{
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
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

              {/* Icon thông báo */}
              <div className="btn" onClick={openModal} ref={buttonRef} style={{ position: 'relative', marginTop:'15px' }}>
                <i className="bi bi-bell-fill" style={{ fontSize: "30px", cursor: "pointer", color: "white" }}>
                  {notifications.some((notification) => !notification.is_read) && (
                    <span
                      style={{
                        position: "absolute",
                        top: "12px",
                        right: "11px",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "red",
                        display: "inline-block",
                      }}
                    />
                  )}
                </i>
              </div>
            </div>



            {/* Modal hiển thị thông báo */}
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Thông báo"
              ariaHideApp={false}
              className="notification-modal"
              overlayClassName="notification-overlay"
              style={{
                content: {
                  position: "absolute",
                  top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 10 : 0, // Đặt vị trí modal dưới button
                  left: buttonRef.current ? Math.min(buttonRef.current.getBoundingClientRect().left, window.innerWidth - 310) : 0, // Đặt cùng vị trí ngang với button
                  width: "280px",
                  backgroundColor: "white",
                  padding: "20px",
                  borderRadius: "8px",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                },
                overlay: {
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "rgba(0, 0, 0, 0.3)",
                },
              }}
            >
              <h2 style={{ fontSize: "18px" }} >Notifications</h2>
              {loading && <p>Loading notifications....</p>}
              {!loading && notifications.length === 0 && <p>No notifications.</p>}

              <div className="notification-list">
                {notifications.map((notification) => {
                  let message = '';

                  if (notification.type === 'answer' && notification.metadata.answer_id) {
                    // Trường hợp trả lời câu hỏi
                    const userName = notification.metadata.answer_id.userAns?.name; // Lấy tên người trả lời
                    const questionTitle = notification.metadata.question_id?.title;
                    message = `${userName} answered your question: "${questionTitle}"`;
                  } else if (notification.type === 'vote' && notification.metadata.quesVote_id) {
                    // Trường hợp vote câu hỏi
                    const userName = notification.metadata.quesVote_id.user?.name; // Lấy tên người đã vote
                    const questionTitle = notification.metadata.question_id?.title;
                    message = `${userName} voted your question: "${questionTitle}" `;
                  } else {
                    // Trường hợp khác, sử dụng message gốc
                    message = notification.message;
                  }

                  return (
                    <div
                      key={notification._id}
                      className={`notification-item ${notification.is_read ? 'read' : 'unread'}`}
                      onClick={() => handleMarkAsRead(notification._id, notification.metadata.question_id._id)}
                    >
                      <p>{message}</p>
                      {!notification.is_read && <span>(Unread)</span>}
                    </div>
                  );
                })}
              </div>

              <ButtonComponent
                textButton="Close"
                onClick={closeModal} />
            </Modal>
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
                <i
                  className="bi bi-house-door-fill"
                  style={Styles.iconHeader}
                ></i>
                Home
              </a>
            </li>
          </ul>
          <ul className="nav nav-underline">
            <li className="nav-item">
              <a
                className="nav-link"
                href="/question"
                style={Styles.textHeader}
              >
                <i
                  className="bi bi-chat-left-fill"
                  style={Styles.iconHeader}
                ></i>
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
