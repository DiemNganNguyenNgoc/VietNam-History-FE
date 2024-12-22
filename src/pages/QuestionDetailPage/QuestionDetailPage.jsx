import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Compressor from "compressorjs";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as message from "../../components/MessageComponent/MessageComponent";
import * as AnswerService from "../../services/AnswerService";
import * as UserService from "../../services/UserService";
import * as TagService from "../../services/TagService";
import * as QuestionService from "../../services/QuestionService";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate, useParams } from "react-router-dom";
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
  const [userAns, setIdUser] = useState("");
  const [userQues, setuserQues] = useState("");
  const [imageSrcs, setImageSrcs] = useState([]); // Chứa nhiều ảnh đã chọn
  const user = useSelector((state) => state.user);
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
        // console.log("Data Question:", data);
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

  const handleContentChange = useCallback((value) => {
    setContent(value);
  }, []);



  useEffect(() => {
    if (user?.id) {
      setIdUser(user.id);
    }
  }, [user]);

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
      alert('Question has been added successfully!');
    
    }
    if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handlePostAnswerClick = useCallback(async () => {
    if (!user?.id) {
      alert("User ID is missing. Please log in again.");
      return;
    }

    const answerData = {
      content,
      userAns: user.id,
      question: questionId,
      images: imageSrcs,
    };

    await mutation.mutateAsync(answerData);
  }, [content, imageSrcs, mutation, questionId, user]);


  const handleCancelClick = useCallback(() => {
    alert("Cancel adding the question!");
  }, []);
  const handleClickAnswer = useCallback(() => {
    setShowTextArea((prev) => !prev);
  }, []);

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
        <div className="border-bottom pb-2 mb-2">
          <div className="d-flex align-items-center mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Commenter Avatar"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <strong>Skware Folux</strong>
          </div>
          <p className="mb-1">
            The most dangerous feature of this construct is that it starts with
            9 instead of 10. The same is true for `for (int x = 10; x--{">"}
            0;)`.
          </p>
          <p className="text-muted" style={{ fontSize: "0.9em" }}>
            Friday 5:36 Apr 26
          </p>
        </div>
        <div className="border-bottom pb-2 mb-2">
          <div className="d-flex align-items-center mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Commenter Avatar"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <strong>Anonymous</strong>
          </div>
          <p className="mb-1">
            I think it's valid in any language which has postfix --. This is 40
            year-old running joke. Every 2-3 years there is a question about it
            XD
          </p>
          <p className="text-muted" style={{ fontSize: "0.9em" }}>
            Friday 5:36 Apr 26
          </p>
        </div>
      </div>

      {/* Danh sách câu trả lời */}
      <div>
        <h5 className="mb-3">{questionDetail.data?.answerCount} Answers</h5>
        <div className="p-3 border rounded mb-3">
          <div className="d-flex align-items-center mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Answerer Avatar"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <div>
              <strong>Bradley Mackey</strong>
              <p className="text-muted mb-0" style={{ fontSize: "0.9em" }}>
                Answered Nov 8, 2022 at 21:16
              </p>
            </div>
          </div>
          <p>
            This is not an operator. It is in fact two separate operators, --
            and &gt;.
          </p>
          <p>
            The code in the condition decrements x, while returning x's original
            (not decremented) value, and then compares the original value with
            0, using the &gt; operator.
          </p>
          <pre>
            <code>
              // To better understand, the statement could be written as
              follows:
              <br />
              while ((x--) &gt; 0)
            </code>
          </pre>
          <p>
            I think you wouldn’t really need the parentheses around --, though
            it does further enforce the separation.
          </p>
        </div>
        {/* Thêm các câu trả lời khác */}
        <ButtonComponent
          textButton="Add an answer"
          onClick={handleClickAnswer}
        ></ButtonComponent>
        {showTextArea && <AnswerEditor
          content={content}
          onContentChange={handleContentChange}
          onCancel={handleCancelClick}
          isLoading={isLoading}
          imageSrcs={imageSrcs}
          onImageUpload={handleImageUpload}
          onRemoveImage={handleRemoveImage}
          onSubmit={handlePostAnswerClick}

        />}
      </div>
    </div>
  );
};

export default QuestionDetails;
