import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Comment from "../../components/Comment/CommentComponent"
import Compressor from "compressorjs";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as message from "../../components/MessageComponent/MessageComponent";
import * as AnswerService from "../../services/AnswerService";
import * as UserService from "../../services/UserService";
import * as TagService from "../../services/TagService";
import * as QuestionService from "../../services/QuestionService";
import * as CommentService from "../../services/CommentService";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { addAnswer } from '../../redux/slides/AnswerSlice'; // Import action


import {
  setDetailAsker,
  setDetailQuestion,
} from "../../redux/slides/questionSlide";
import { setDetailUser } from "../../redux/slides/userSlide";
import { setAllTag } from "../../redux/slides/tagSlide";
import AnswerEditor from "../../components/AnswerComponent/AnswerComponent"

const QuestionDetails = () => {
  const navigate = useNavigate();
  const [showTextArea, setShowTextArea] = useState(false);
  const [content, setContent] = useState("");
  const [userAns, setIdUser] = useState('');
  const [imageSrcs, setImageSrcs] = useState([]); // Chứa nhiều ảnh đã chọn
  const user = useSelector((state) => state.user);
  const [answers, setAnswers] = useState([]); // State để lưu trữ danh sách câu trả lời
  const [idQues, setIdQues] = useState("");
  const [userCom, setIdUserCom] = useState('');
  const [TextCom, setTextCom] = useState('');
  // console.log("user", user)

  // const [userDetails, setUserDetails] = useState(null); // State lưu thông tin người hỏi

  // const question = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const { questionId } = useParams(); // Lấy ID câu hỏi từ URL
  // Lấy dữ liệu chi tiết của câu hỏi từ Redux store
  const questionDetail = useSelector((state) => state.question.detailQuestion);
  console.log("Question Detail:", questionDetail);

  const detailAsker = useSelector((state) => state.question.detailAsker);
  console.log("detailAsker", detailAsker);

  const allTags = useSelector((state) => state.tag.allTag);
  console.log("allTags", allTags);

  const mutation = useMutationHook(data => AnswerService.addAns(data));
  const { data, isLoading, isSuccess, isError } = mutation;

  const mutationComment = useMutationHook(dataCom => CommentService.addComment(dataCom));
  const { dataCom, isLoadingCom, isSuccessCom, isErrorCom } = mutationComment;

  //lấy thông tin người hỏi
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (questionDetail?.data?.userQues) {
          const userDetails = await UserService.getDetailsUser(
            questionDetail.data.userQues
          );
          console.log("userDetails", userDetails);
          dispatch(setDetailAsker(userDetails)); // Lưu thông tin người hỏi vào Redux
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };



    fetchUserDetails();
  }, [dispatch, questionDetail?.data?.userQues]);

  //lấy thông tin câu hỏi
  useEffect(() => {
    // console.log("Question ID:", questionId);
    const fetchQuestionDetail = async () => {
      try {
        const data = await QuestionService.getDetailsQuestion(questionId); // Gọi API để lấy chi tiết câu hỏi
        console.log("Data Question:", data);
        dispatch(setDetailQuestion(data)); // Lưu dữ liệu vào Redux
      } catch (error) {
        console.error("Error fetching question detail:", error);
      }
    };

    fetchQuestionDetail();
  }, [dispatch, questionId]);

  //Lấy thông tin tag
  useEffect(() => {
    const fetchTagsDetails = async () => {
      if (questionDetail?.data?.tags?.length) {
        try {
          const tagDetails = await Promise.all(
            questionDetail.data.tags.map((tagId) =>
              TagService.getDetailsTag(tagId)
            )
          );
          dispatch(setAllTag(tagDetails));
        } catch (error) {
          console.error("Error fetching tag details:", error);
        }
      }
    };

    console.log("");
    fetchTagsDetails();
  }, [dispatch, questionDetail?.data?.tags]);

  // useEffect(() => {
  //   if (!questionDetail?.id) {
  //     // Điều hướng về trang trước nếu không có dữ liệu
  //     navigate("/question");
  //   }
  // }, [questionDetail.detailQuestion, navigate]);
  // Lấy danh sách câu trả lời
  const fetchAnswers = async () => {
    
    try {
      console.log("questionId from useParams:", questionDetail.data);

      const response = await AnswerService.getAnswersByQuestionId( questionId);
      console.log("Fetched answers:", response);
      setAnswers(response.data); // Cập nhật danh sách câu trả lời
    } catch (error) {
      console.error("Error fetching answers:", error);
    }
  };



  const handleContentChange = (value) => {
    setContent(value);
  };



  useEffect(() => {
    console.log("user:", user);
    if (user?.id) {
      setIdUser(user.id);
    }
  }, [user]);

  // Nhận text comment
  const handleTextCom = (value) => {
    setTextCom(value);
  };

  // useEffect(() => {
  //   if (question?.id) {
  //     setIdQues(question.id);
  //   }
  // }, [question]);

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    files.forEach((file) => {
      new Compressor(file, {
        quality: 0.6, // Quality (60%)
        maxWidth: 800, // Max width
        maxHeight: 800, // Max height
        success(result) {
          // Tạo URL tạm cho các ảnh đã nén
          const compressedImage = URL.createObjectURL(result);
          setImageSrcs(prevImages => [...prevImages, compressedImage]); // Thêm ảnh vào mảng
        },
        error(err) {
          console.error(err);
        }
      });
    });
  };

  // Xử lý xóa ảnh
  const handleRemoveImage = useCallback((index) => {
    setImageSrcs((prev) => prev.filter((_, i) => i !== index));
  }, []);


  //them cau tra loi
  useEffect(() => {
    if (isSuccess && data?.status !== 'ERR') {
      message.success();
      alert('Answer has been added successfully!');
      fetchAnswers(); // Cập nhật danh sách câu trả lời sau khi thêm
    }
    if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handlePostAnswerClick = useCallback(async () => {
    if (!user?.id) {
      alert("User  ID is missing. Please log in again.");
      return;
    }

    const answerData = {
      content,
      userAns,
      question: questionId,
      images: imageSrcs,
    };

    await mutation.mutateAsync(answerData);
  }, [content, imageSrcs, mutation, questionId, user]);
  
    useEffect(() => { 
    fetchAnswers(); // Gọi hàm để lấy danh sách câu trả lời khi component mount
  }, [ questionId]);


  const handleCancelClick = useCallback(() => {
    alert("Cancel adding the question!");
  }, []);


  useEffect(() => {
    if (isSuccessCom && dataCom?.status !== 'ERR') {
      message.success();
      alert('Comment has been added successfully!');
      navigate("/Comment")
    }
    if (isErrorCom) {
      message.error();
    }
  }, [isSuccessCom, isErrorCom]);

  //Lấy tất cả comment
  const getAllCom = async () => {
    const res = await CommentService.getAllComment(questionId);
    return res.data;
  };

  const {
    isLoading: isLoadingQues,
    data: commentQuess,
    error,
  } = useQuery({
    queryKey: ["commentQuess"],
    queryFn: getAllCom,
  });

  const handleAddCommentClick = useCallback( async () => {

    if (!userAns) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    const commentData = {

      content : TextCom,
      user : userAns,
      answer : questionId

    };

    await mutationComment.mutateAsync(commentData);
    TextCom = "";
  }, [content, mutationComment, answers, user]);


  return (
    <div className="container my-4">
      {/* Phần người đăng */}
      <div className="d-flex align-items-center mb-4">
        <img
          src={detailAsker.data?.img || "https://via.placeholder.com/50"}
          alt="User Avatar"
          className="rounded-circle me-3"
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
          }}
        />
        <div>
          <strong>{detailAsker.data?.name || "Anonymous"}</strong>
          <p className="text-muted mb-0" style={{ fontSize: "0.9em" }}>
            Asked {questionDetail.data?.createdAt || "Unknown time"}
          </p>
        </div>
      </div>

      {/* Phần tiêu đề câu hỏi */}
      <div className="mb-4">
        <h3>{questionDetail.data?.title || "Question Title"}</h3>
        <p className="text-secondary">
          <span className="me-3">{questionDetail.data?.view} views</span>
          <span className="text-success me-3">
            +{questionDetail.data?.upVoteCount}
          </span>
          <span className="text-danger">
            -{questionDetail.data?.downVoteCount}
          </span>
        </p>
      </div>

      {/* Nội dung bài viết */}
      <div className="bg-light p-4 rounded mb-4">
        <p>{questionDetail.data?.content || "No content provided"}</p>
        <div className="bg-dark text-white p-3 rounded">
          {questionDetail.data?.images?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Question Image ${index}`}
              className="img-fluid rounded my-2"
            />
          ))}
        </div>
        <p className="mt-3">Output:</p>
        <div className="bg-light border rounded p-2">
          <code>9 8 7 6 5 4 3 2 1 0</code>
        </div>
        <p className="mt-3">{questionDetail.data?.note || ""}</p>

        {/* Tags chủ đề */}
        <div className="mt-4">
          {questionDetail.tags?.map((tag, index) => (
            <span
              key={tag.id || tag._id || index}
              className="badge bg-primary me-2"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Phần bình luận */}
      <div className="mb-4">
        <h5 className="mb-3">Comments</h5>
        {Array.isArray(commentQuess) && commentQuess.length > 0 ? (
          commentQuess.map((commentQues) => {
            //const user = userInfo[commentQues._id] || {}; // Tránh truy cập vào undefined

            return (
              <div
                key={commentQues._id}
                onClick={() => handleAddCommentClick(userAns)}
              >
                <Comment

                />
              </div>
            );
          })
        ) : (
          <p>No conmment available.</p>
        )}
      </div>
      <div className="mt-4">
        <textarea
          className="form-control"
          placeholder="Add a comment"
          rows="2"
          value={TextCom}
          onChange={(e) => handleTextCom(e.target.value)}
        ></textarea>
      </div>
      <ButtonComponent
        textButton="Submit comment"
        onClick={handleAddCommentClick}
      />

      {/* Danh sách câu trả lời */}
      <div>
        <h5 className="mb-3">{questionDetail.data?.answerCount} Answers</h5>
        {Array.isArray(answers) && answers.length > 0 ? (
          answers.map((answer, index) => (
            <div key={index} className="p-3 border rounded mb-3">
              <div className="d-flex align-items-center mb-2">
                <img
                  src="https://via.placeholder.com/40"
                  alt="Answerer Avatar"
                  className="rounded-circle me-2"
                  width="40"
                  height="40"
                />
                <div>
                  <strong>{user.userName}</strong>
                  <p className="text-muted mb-0" style={{ fontSize: "0.9em" }}>
                    Answered {new Date(answer.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
              <p>{answer.content}</p>
              {answer.images && answer.images.map((img, imgIndex) => (
                <img key={imgIndex} src={img} alt={`Answer Image ${imgIndex}`} className="img-fluid rounded my-2" />
              ))}
            </div>
          ))
        ) : (
          <p>No answers available.</p>
        )}
        {/* Thêm các câu trả lời khác */}
        <AnswerEditor
          content={content}
          onContentChange={handleContentChange}
          onCancel={handleCancelClick}
          isLoading={isLoading}
          imageSrcs={imageSrcs}
          onImageUpload={handleImageUpload}
          onRemoveImage={handleRemoveImage}
          onSubmit={handlePostAnswerClick}

        />
      </div>
    </div>
  );
};

export default QuestionDetails;
