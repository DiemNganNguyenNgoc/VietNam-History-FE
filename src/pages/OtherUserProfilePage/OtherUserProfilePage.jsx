import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import FormComponent from "../../components/FormComponent/FormComponent";
import QuestionBox from "../../components/QuestionBox/QuestionBox";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsUser } from "../../services/UserService";
import { setDetailUser } from "../../redux/slides/userSlide";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

function OtherUserProfilePage() {
  const { userId } = useParams(); // Lấy userId từ URL
  const dispatch = useDispatch();
  const { detailUser } = useSelector((state) => state.user); // Lấy chi tiết user từ Redux
  const [isLoading, setIsLoading] = useState(true);

  // Lấy dữ liệu người dùng từ API
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getDetailsUser(userId); // Gọi API để lấy thông tin chi tiết
        dispatch(setDetailUser(response.data)); // Lưu vào Redux
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId, dispatch]);

  if (isLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      <div className="container mt-4">
        {/* Avatar và Tên */}
        <div className="row">
          <div className="col-3">
            <img
              src={detailUser.img || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
          <div className="col-9">
            <div className="row">
              <h2 className="mt-3">{detailUser.name || "Anonymous User"}</h2>
            </div>
            <div className="row">
              <div className="col">
                <i className="bi bi-calendar"></i>
                <p>
                  Member since:{" "}
                  {new Date(detailUser.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="col">
                <i className="bi bi-clock-history"></i>
                <p>
                  Recent access:{" "}
                  {new Date(detailUser.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-3">
            <h3 className="title-profile">Summary</h3>
            <div className="card-profile" style={{ padding: "0 10px" }}>
              <table className="table table-borderless">
                <tbody style={{ verticalAlign: "middle" }}>
                  <tr>
                    <td className="fw-bold fs-5">{detailUser.score || 0}</td>
                    <td className="fw-bold fs-5">
                      {detailUser.followerCount || 0}
                    </td>
                  </tr>
                  <tr className="row-2">
                    <td className="text-muted">Reputation</td>
                    <td className="text-muted">Followers</td>
                  </tr>
                  <tr>
                    <td className="fw-bold fs-5">
                      {detailUser.savedCount || 0}
                    </td>
                    <td className="fw-bold fs-5">
                      {detailUser.followingCount || 0}
                    </td>
                  </tr>
                  <tr className="row-2">
                    <td className="text-muted">Saved</td>
                    <td className="text-muted">Following</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="col-9">
            <div>
              <h3 className="title-profile">Profile</h3>
              <div className="card-profile " style={{ padding: "0 20px" }}>
                <div style={{ marginTop: "30px" }}>
                  <FormComponent
                    id="emailInput"
                    label="Address"
                    type="text"
                    value={detailUser.address || "No address provided"}
                    disabled
                  />
                  <FormComponent
                    id="birthdayInput"
                    label="Birthday"
                    type="date"
                    value={
                      new Date(detailUser.birthday)
                        .toISOString()
                        .split("T")[0] || ""
                    }
                    disabled
                  />
                  <FormComponent
                    id="noteInput"
                    label="About me"
                    type="text"
                    value={detailUser.note || "No introduction provided"}
                    disabled
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="title-profile" style={{ marginTop: "30px" }}>
                Links
              </h3>
              <div className="card-profile " style={{ padding: "0 20px" }}>
                <div className="row">
                  <div className="col-6">
                    <FormComponent
                      id="facebookInput"
                      label="Facebook"
                      type="link"
                      value={detailUser.facebookLink || "No Facebook link"}
                      disabled
                    />
                  </div>
                  <div className="col-6">
                    <FormComponent
                      id="githubInput"
                      label="Github"
                      type="link"
                      value={detailUser.githubLink || "No Github link"}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="title-profile" style={{ marginTop: "30px" }}>
                Top questions
              </h3>
              <div className="card-profile " style={{ padding: "0 20px" }}>
                {detailUser.questions && detailUser.questions.length > 0 ? (
                  detailUser.questions.map((question) => (
                    <QuestionBox
                      key={question.id}
                      title={question.title}
                      tags={question.tags}
                      date={question.date}
                      views={question.views}
                      answers={question.answers}
                      likes={question.likes}
                      username={detailUser.name}
                    />
                  ))
                ) : (
                  <p>No questions available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtherUserProfilePage;
