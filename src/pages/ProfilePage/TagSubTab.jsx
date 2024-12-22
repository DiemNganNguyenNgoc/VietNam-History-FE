import React, { useEffect, useState } from "react";
import "../../css/TagSubTab.css";
import * as TagService from '../../services/TagService';
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import TagsBoxComponent from "../../components/TagsBoxComponent/TagsBoxComponent";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import FormComponent from "../../components/FormComponent/FormComponent";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as message from "../../components/MessageComponent/MessageComponent";
import { useNavigate } from "react-router-dom";

const TagSubTab = () => {
  const user = useSelector((state) => state.user);
  const userId = user.id;

  // Lấy danh sách tag từ API
  const getAllTagByUser = async (userId) => {
    try {
      const res = await TagService.getAllTagByUser(userId);
      //console.log("API Response:", res);  // Kiểm tra toàn bộ phản hồi API

      // Kiểm tra nếu phản hồi từ API có dữ liệu
      if (res && res.data) {
        //console.log("API Response Data:", res.data); // In dữ liệu trả về từ API
        if (Array.isArray(res.data)) {
          return res.data;
        } else {
          throw new Error("API response data is not an array");
        }
      } else {
        throw new Error("No data received from the API");
      }
    } catch (error) {
      console.error("Error fetching tags:", error);
      return [];
    }
  };



  const { isLoading: isLoadingTag, data: tags } = useQuery(
    ["tags", userId],
    () => getAllTagByUser(userId),
    { enabled: !!userId }
  );

  // Đếm số lượng tag
  const tagQuantity = tags ? tags.length : 0;

  ////Thêm tag
  // State cho form
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        userTag: "",
    });
    const [showModal, setShowModal] = useState(false);

    // Sử dụng useNavigate để chuyển trang
    const navigate = useNavigate();

    // Hàm cập nhật state từ input
    useEffect(() => {
        if (user?.id) {
            setFormData((prev) => ({ ...prev, userTag: user.id }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Hàm reset form
    const resetForm = () => {
        setFormData({
            name: "",
            description: "",
            userTag: user?.id || "",
        });
    };

    // Mutation để thêm tag
    const mutation = useMutationHook(data => TagService.addTag(data));
    const { data, isLoading, isSuccess, isError } = mutation;

    // Xử lý kết quả sau khi thêm tag
    useEffect(() => {
        if (isSuccess && data?.status !== 'ERR') {
            message.success();
            alert('Add new tag successfully!');
            resetForm();
            setShowModal(false);
        }
        if (isError) {
            message.error();
        }
    }, [isSuccess, isError, navigate]);

    // Mở modal thêm tag
    const handleAddTag = () => {
        setShowModal(true);
    };

    // Lưu tag mới
    const onSave = async () => {
        //console.log('form', formData)

        if (!formData.userTag) {
            alert("User ID is missing. Please log in again.");
            return;
        }


        await mutation.mutateAsync(formData);
    };

    // Đóng modal và reset form
    const onCancel = () => {
        alert('Cancel adding the tag!');
        resetForm();
        setShowModal(false);
    };

    // click chọn để hiện chi tiết tag
    const handleTagClick = (tagId) => {
        navigate(`/tagsdetail/${tagId}`); 
    };

  return (
    <div className="container">
      <ButtonComponent
        textButton="Add new tag"
        icon={<i className="bi bi-plus-circle"></i>}
        onClick={handleAddTag}
      />
      <div className="title">
        <h3>Tags {tagQuantity}</h3>
      </div>
      <div className="container">
        <div className="d-flex flex-wrap justify-content-center align-items-center gap-5">
          {isLoadingTag ? (
            <LoadingComponent />
          ) : tags && tags.length > 0 ? (
            tags.map((tag) => (
              <div className="col-6 col-md-5 col-lg-3 mb-3" 
              key={tag._id}
              onClick={() => handleTagClick(tag._id)}>
                <TagsBoxComponent
                  tagsname={tag.name}
                  description={tag.description}
                  quantity={tag.usedCount}
                />
              </div>
            ))
          ) : (
            <p>Không có dữ liệu để hiển thị.</p>
          )}
        </div>
      </div>

      {/* Modal thêm tag mới */}
      <ModalComponent
        isOpen={showModal}
        title="ADD NEW TAG"
        body={
          <>
            <FormComponent
              id="nameTagInput"
              label="Name"
              type="text"
              placeholder="Enter tag's name"
              value={formData.name}
              onChange={(e) => handleChange({ target: { name: 'name', value: e.target.value } })}
            />
            <FormComponent
              id="descTagInput"
              label="Description"
              type="text"
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => handleChange({ target: { name: 'description', value: e.target.value } })}
            />
            {data?.status === 'ERR' &&
              <span style={{ color: "red", fontSize: "16px" }}>{data?.message}</span>}
          </>
        }
        textButton1="Add"
        onClick1={onSave}
        onClick2={onCancel}
      />
    </div>
  );
};

export default TagSubTab;
