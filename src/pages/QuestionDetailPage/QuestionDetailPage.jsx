import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import TextEditor from "../QuestionDetailPage/partials/TextEditor";
import Compressor from "compressorjs";
import { useDispatch, useSelector } from "react-redux";
import { useMutationHook } from "../../hooks/useMutationHook";
import * as message from "../../components/MessageComponent/MessageComponent";
import * as AnswerService from "../../services/AnswerService";
import * as UserService from "../../services/UserService";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useNavigate, useParams } from "react-router-dom";
import {
  setDetailAsker,
  setDetailQuestion,
} from "../../redux/slides/questionSlide";
import { setDetailUser } from "../../redux/slides/userSlide";
import * as QuestionService from "../../services/QuestionService";
import { setAllTag } from "../../redux/slides/tagSlide";

const QuestionDetails = () => {
  const navigate = useNavigate();

  const [showTextArea, setShowTextArea] = useState(false);
  const [content, setContent] = useState("");
  const [userAns, setIdUser] = useState("");
  const [idQues, setIdQues] = useState("");
  const [imageSrcs, setImageSrcs] = useState([]); // Chứa nhiều ảnh đã chọn
  const user = useSelector((state) => state.user);
  // console.log("user", user)

  const [userDetails, setUserDetails] = useState(null); // State lưu thông tin người hỏi

  // const question = useSelector((state) => state.question);
  const dispatch = useDispatch();
  const { questionId } = useParams(); // Lấy ID câu hỏi từ URL
  // Lấy dữ liệu chi tiết của câu hỏi từ Redux store
  const questionDetail = useSelector((state) => state.question.detailQuestion);
  console.log("Question Detail:", questionDetail);

  const detailAsker = useSelector((state) => state.question.detailAsker);
  console.log("detailAsker", detailAsker);

  const mutation = useMutationHook((data) => AnswerService.addAns(data));
  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        if (questionDetail.userQues) {
          const userDetails = await UserService.getDetailsUser(
            questionDetail.userQues
          );
          dispatch(setDetailAsker(userDetails)); // Lưu thông tin người hỏi vào Redux
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [dispatch, questionDetail.userQues]);

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

  //Lấy tên tag

  const getTagNameById = (tagId) => {
    const tag = setAllTag.find((t) => t._id === tagId); // `allTags` từ Redux hoặc API
    return tag ? tag.name : "Unknown Tag";
  };

  // useEffect(() => {
  //   if (!questionDetail?.id) {
  //     // Điều hướng về trang trước nếu không có dữ liệu
  //     navigate("/question");
  //   }
  // }, [questionDetail.detailQuestion, navigate]);

  const handleContent = (value) => {
    setContent(value);
  };

  useEffect(() => {
    if (isSuccess && data?.status !== "ERR") {
      message.success();
      alert("Answer has been added successfully!");
    }
    if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

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
          setImageSrcs((prevImages) => [...prevImages, compressedImage]); // Thêm ảnh vào mảng
        },
        error(err) {
          console.error(err);
        },
      });
    });
  };

  // Xử lý xóa ảnh
  const handleRemoveImage = (index) => {
    const newImageSrcs = [...imageSrcs];
    newImageSrcs.splice(index, 1);
    setImageSrcs(newImageSrcs);
  };

  //CLick de hien ra textEditor
  const handleClickAnswer = () => {
    setShowTextArea(!showTextArea);
  };

  //Xu li khi click add an answer thi xuat hien textEditor
  const ExtraComponent = () => (
    <div>
      <div className="input" style={{ marginTop: "30px" }}>
        <h1 className="label">Upload Images</h1>
        <input type="file" multiple onChange={handleImageUpload} />
        {imageSrcs.length > 0 && (
          <div>
            <h3>Preview Images</h3>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {imageSrcs.map((src, index) => (
                <div key={index} style={{ position: "relative" }}>
                  <img
                    src={src}
                    alt={`Uploaded preview ${index}`}
                    style={{
                      width: "500px", // Adjusted size
                      height: "auto", // Keep aspect ratio
                      margin: "10px",
                      objectFit: "cover", // To ensure images are properly scaled
                    }}
                  />
                  <button
                    style={{
                      position: "absolute",
                      top: "0",
                      right: "0",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      cursor: "pointer",
                      fontSize: "12px",
                    }}
                    onClick={() => handleRemoveImage(index)}
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="input" style={{ marginTop: "30px" }}>
        <h1 className="label">
          Problem details <span className="asterisk">*</span>
        </h1>
        <h2 className="description">
          Introduce the problem and expand on what you put in the title. Minimum
          20 characters.
        </h2>
        <TextEditor
          value={content}
          onChange={handleContent}
          placeholder="Describe the problem here..."
        />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        <ButtonComponent textButton="Cancel" onClick={handleCancelClick} />
        <LoadingComponent isLoading={isLoading}>
          <ButtonComponent
            textButton="Submit question"
            onClick={handlePostAnswerClick}
          />
        </LoadingComponent>
      </div>
    </div>
  );

  const handleCancelClick = () => {
    alert("Cancel adding the question!");
  };
  //them cau tra loi
  const handlePostAnswerClick = async () => {
    // Kiểm tra nếu không có ảnh được chọn
    if (imageSrcs.length > 0) {
      // Lưu ảnh vào câu hỏi trước khi gửi
      const imageUrls = imageSrcs.map((src) => src); // Tạm thời dùng src, thực tế sẽ cần upload ảnh nếu cần
    }

    if (!userAns) {
      alert("User ID is missing. Please log in again.");
      return;
    }
    // if (!idQues) {
    //   alert("Question ID is missing. Please log in again.");
    //   return;
    // }

    const answerData = {
      content,
      userAns,
      idQues: "11",
      //id:"1",
      images: imageSrcs, // Truyền mảng ảnh vào câu hỏi
    };

    await mutation.mutateAsync(answerData);
  };

  return (
    <div className="container my-4">
      {/* Phần người đăng */}
      <div className="d-flex align-items-center mb-4">
        <img
          src={detailAsker?.img || "https://via.placeholder.com/50"}
          alt="User Avatar"
          className="rounded-circle me-3"
          style={{
            height: "50px",
            width: "50px",
            borderRadius: "50%",
          }}
        />
        <div>
          <strong>{detailAsker?.name || "Anonymous"}</strong>
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
        <p>{questionDetail.content || "No content provided"}</p>
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
        <p className="mt-3">
          Where is this defined in the standard, and where has it come from?
        </p>

        {/* Tags chủ đề */}
        <div className="mt-4">
          {questionDetail.tags?.map((tagId, index) => (
            <span key={index} className="badge bg-primary me-2">
              {getTagNameById(tagId)}
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
        {showTextArea && <ExtraComponent />}
      </div>
    </div>
  );
};

export default QuestionDetails;
