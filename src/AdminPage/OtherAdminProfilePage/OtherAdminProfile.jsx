import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import FormComponent from "../../components/FormComponent/FormComponent";
import QuestionBox from "../../components/QuestionBox/QuestionBox";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetailsAdmin } from "../../services/AdminService";
import { setDetailAdmin} from "../../redux/slides/adminSlide"
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";

function OtherAdminProfilePage() {
    const token = localStorage.getItem("access_token");
    
  const { id } = useParams(); // Lấy userId từ URL
  const dispatch = useDispatch();
  const { detailAdmin } = useSelector((state) => state.admin); // Lấy chi tiết user từ Redux
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      console.log("ADID", id)
      setIsLoading(true);
      const response = await getDetailsAdmin(id, token); // Gọi API để lấy thông tin chi tiết
      console.log("DATA", response.data)
      dispatch(setDetailAdmin(response.data)); // Lưu vào Redux
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setIsLoading(false);
    }
  };
  // Lấy dữ liệu người dùng từ API
  useEffect(() => {
  

    fetchUserDetails();
  }, [id, dispatch]);

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
              src={detailAdmin.img || "https://via.placeholder.com/150"}
              alt="Avatar"
              className="rounded-circle"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>
          <div className="col-9">
            <div className="row">
              <h2 className="mt-3">{detailAdmin.name || "Anonymous User"}</h2>
            </div>
            <div className="row">
              <div className="col">
                <i className="bi bi-calendar"></i>
                <p>
                  Member since:{" "}
                  {new Date(detailAdmin.createdAt).toLocaleDateString()}
                </p>
              </div>
              <div className="col">
                <i className="bi bi-clock-history"></i>
                <p>
                  Recent access:{" "}
                  {new Date(detailAdmin.updatedAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">

          <div className="col-9">
            <div>
              <h3 className="title-profile">Profile</h3>
              <div className="card-profile " style={{ padding: "0 20px" }}>
                <div style={{ marginTop: "30px" }}>
                  <FormComponent
                    id="emailInput"
                    label="Address"
                    type="text"
                    value={detailAdmin.address || "No address provided"}
                    disabled
                  />
                  <FormComponent
  id="birthdayInput"
  label="Birthday"
  type="date"
  value={
    detailAdmin.birthday
      ? new Date(detailAdmin.birthday).toISOString().split("T")[0]
      : "" // Giá trị mặc định nếu không hợp lệ
  }
  disabled
/>
                  <FormComponent
                    id="noteInput"
                    label="About me"
                    type="text"
                    value={detailAdmin.note || "No introduction provided"}
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
                      value={detailAdmin.facebookLink || "No Facebook link"}
                      disabled
                    />
                  </div>
                  <div className="col-6">
                    <FormComponent
                      id="githubInput"
                      label="Github"
                      type="link"
                      value={detailAdmin.githubLink || "No Github link"}
                      disabled
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* <div>
              <h3 className="title-profile" style={{ marginTop: "30px" }}>
                Top questions
              </h3>
              <div className="card-profile " style={{ padding: "0 20px" }}>
                {detailAdmin.questions && detailAdmin.questions.length > 0 ? (
                  detailAdmin.questions.map((question) => (
                    <QuestionBox
                      key={question.id}
                      title={question.title}
                      tags={question.tags}
                      date={question.date}
                      views={question.views}
                      answers={question.answers}
                      likes={question.likes}
                      username={detailAdmin.name}
                    />
                  ))
                ) : (
                  <p>No questions available.</p>
                )}
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default OtherAdminProfilePage;
