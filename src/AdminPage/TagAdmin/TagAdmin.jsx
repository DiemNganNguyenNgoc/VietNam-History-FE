import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as QuestionService from "../../services/QuestionService";
import * as TagService from "../../services/TagService";

function TagAdmin() {
  const [tagsWithCount, setTagsWithCount] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Lấy danh sách tag và số lượng câu hỏi liên quan
  useEffect(() => {
    const fetchTagsWithCount = async () => {
      setIsLoading(true);
      try {
        const res = await TagService.getAllTag();
        const tags = res.data;

        // Sau khi lấy danh sách tags, gọi API để lấy số lượng câu hỏi
        const updatedTags = await Promise.all(
          tags.map(async (tag) => {
            const questions = await getAllQues(tag._id);
            return { ...tag, usedCount: questions.length };
          })
        );

        setTagsWithCount(updatedTags);
      } catch (error) {
        console.error("Error fetching tags:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTagsWithCount();
  }, []);

  // Hàm lấy danh sách câu hỏi theo tagId
  const getAllQues = async (tagId) => {
    const res = await QuestionService.getAllQuesByTag(tagId);
    return res.data;
  };

  // click chọn để hiện chi tiết tag
  const handleTagClick = (tagId) => {
    navigate(`/tagsdetail/${tagId}`);
  };

  // Hàm xóa tag
  const handleDeleteTag = async (tagId, event) => {
    event.stopPropagation(); // Ngăn sự kiện cha chạy

    const confirmDelete = window.confirm("Are you sure you want to delete this tag?");
    if (confirmDelete) {
      try {
        const res = await TagService.deleteTag(tagId);
        if (res?.status === "OK") {
          alert("Tag deleted successfully!");
          // Sau khi xóa, cập nhật lại danh sách tag
          setTagsWithCount((prevTags) => prevTags.filter((tag) => tag._id !== tagId));
        } else {
          alert(res?.message || "Failed to delete the tag.");
        }
      } catch (error) {
        console.error("Error deleting tag:", error);
        alert("An error occurred while deleting the tag.");
      }
    } else {
      alert("Tag deletion canceled.");
    }
  };

  return (
    <div className="container my-4">
      <h1 className='title'>MANAGEMENT TAGS</h1>
      <p
        style={{
          color: "#323538",
          marginTop: "10px",
          marginLeft: "20px",
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        {tagsWithCount.length} tags
      </p>
      <div>
        <input
          type="text"
          className="form-control d-inline-block me-2"
          placeholder="Search by tag name..."
          style={{ width: "300px", marginBottom:'30px' }}
        />
      </div>

      {/* Tags Grid */}
      <div className="row">
        {isLoading ? (
          <LoadingComponent isLoading={isLoading} />
        ) : tagsWithCount && tagsWithCount.length > 0 ? (
          tagsWithCount.map((tag) => (
            <div
              className="col-md-4 mb-4"
              key={tag._id}
              onClick={() => handleTagClick(tag._id)}
            >
              <div className="card shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="card-title text-primary mb-0">{tag.name}</h5>
                    <div>
                      <button
                        className="btn btn-sm btn-light"
                        onClick={(event) => handleDeleteTag(tag._id, event)} // Truyền event vào hàm
                      >
                        <i className="bi bi-trash text-danger"></i>
                      </button>
                    </div>
                  </div>
                  <p className="card-text text-muted" style={{ fontSize: "14px" }}>
                    {tag.description}
                  </p>
                  <span className="text-secondary" style={{ fontSize: "13px" }}>
                    {tag.usedCount} questions
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <LoadingComponent isLoading={isLoading} />
        )}
      </div>
    </div>
  );
}

export default TagAdmin;
