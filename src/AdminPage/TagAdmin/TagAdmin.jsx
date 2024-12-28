import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import * as TagService from "../../services/TagService";
import * as QuestionService from "../../services/QuestionService";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";

function TagAdmin() {
  const [tagsWithCount, setTagsWithCount] = useState([]);
  const navigate = useNavigate();

  // Lấy danh sách tag từ API
  const getAllTag = async () => {
    const res = await TagService.getAllTag();
    return res.data;
  };

  // Dùng react-query để lấy dữ liệu tags
  const { isLoading: isLoadingTag, data: tags } = useQuery({
    queryKey: ["tags"],
    queryFn: getAllTag,
    onSuccess: async (tags) => {
      // Sau khi lấy danh sách tags, gọi API để lấy số lượng câu hỏi
      const updatedTags = await Promise.all(
        tags.map(async (tag) => {
          const questions = await getAllQues(tag._id);
          return { ...tag, usedCount: questions.length };
        })
      );
      setTagsWithCount(updatedTags);
    },
  });

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
      {/* Header */}
      <div div style={{ color: "#023E73", marginTop: "20px", marginBottom: "20px", marginLeft: "20px", height: "auto", paddingRight: "20px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "30px", marginLeft: "20px", marginTop: "20px" }}>
            All Tags
          </h1>
        </div>
        <p style={{ color: "#323538", marginTop: "10px", marginLeft: "20px", fontSize: "20px", fontWeight: "600" }}>
          {tags.length} tags
        </p>
        <div>
          <input
            type="text"
            className="form-control d-inline-block me-2"
            placeholder="Search by tag name..."
            style={{ width: "300px" }}
          />
        </div>
      </div>

      {/* Tags Grid */}
      <div className="row">
        {isLoadingTag ? (
          <LoadingComponent isLoading={isLoadingTag} />
        ) : tagsWithCount && tagsWithCount.length > 0 ? (
          tagsWithCount.map((tag) => (
            <div className="col-md-4 mb-4" key={tag._id}
              onClick={() => handleTagClick(tag._id)}>
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
          <LoadingComponent isLoading={isLoadingTag} />
        )}
      </div>
    </div>
  );
}

export default TagAdmin;
