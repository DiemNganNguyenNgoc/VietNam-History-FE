import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import QuestionFilter from "../../components/QuestionFilter/QuestionFilter";
import SortBtn from "../../components/SortBtn/SortBtn";
import * as TagService from "../../services/TagService";
import * as QuestionService from "../../services/QuestionService";
import * as UserService from "../../services/UserService"; // Giả sử bạn có dịch vụ này để lấy thông tin người dùng
import { useQuery } from "@tanstack/react-query";
import QuestionBox from "../../components/QuestionBox/QuestionBox";

const TagsDetailPage = () => {
    const { tagId } = useParams();
    const navigate = useNavigate();
    const [tagDetails, setTagDetails] = useState(null);
    const [filters, setFilters] = useState({
        no_answers: false,
        no_accepted_answer: false,
        has_bounty: false,
        newest: false,
        recent_activity: false,
        highest_score: false,
        most_frequent: false,
        bounty_ending_soon: false,
        the_following_tags: false,
    });
    const [users, setUsers] = useState({});
    const [tags, setTags] = useState({});

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setFilters({
            ...filters,
            [name]: checked,
        });
    };

    // Lấy thông tin tag
    useEffect(() => {
        const fetchTagDetails = async () => {
            try {
                const res = await TagService.getDetailsTag(tagId);
                setTagDetails(res.data);
                //setUsedCount (res.data.length), // Lưu dữ liệu vào state
            } catch (error) {
                console.error("Error fetching tag details:", error);
            }
        };

        if (tagId) fetchTagDetails();
    }, [tagId]);

    // Lấy danh sách câu hỏi theo tag
    const getAllTag = async (tagId) => {
        const res = await QuestionService.getAllQuesByTag(tagId);
        return res.data;
    };

    const { isLoading: isLoadingQues, data: questions } = useQuery({
        queryKey: ["questions", tagId],
        queryFn: () => getAllTag(tagId),
    });

    // Lấy thông tin người dùng dựa trên userId từ câu hỏi
    const getUserDetails = async (userId) => {
        if (!userId) return null; 
        const res = await UserService.getDetailsUser(userId);
        return res.data; 
    };

    // Lấy thông tin tag dựa trên tagId
    const getTagDetails = async (tagId) => {
        const res = await TagService.getDetailsTag(tagId);
        return res.data;
    };

    useEffect(() => {
        const fetchUsersAndTags = async () => {
            const userMap = {};
            const tagMap = {};

            if (Array.isArray(questions)) {
                for (let question of questions) {
                    // Lấy thông tin người dùng từ userId
                    if (question.userQues) {
                        const user = await getUserDetails(question.userQues);
                        userMap[question.userQues] = user;
                    }

                    // Lấy thông tin tag từ tagId
                    if (question.tags) {
                        for (let tagId of question.tags) {
                            if (!tagMap[tagId]) {
                                const tag = await getTagDetails(tagId);
                                tagMap[tagId] = tag;
                            }
                        }
                    }
                }
            }

            setUsers(userMap);
            setTags(tagMap);
        };

        if (questions) {
            fetchUsersAndTags();
        }
    }, [questions]);

    // Xử lý trạng thái loading
    if (isLoadingQues || !tagDetails || !tags) {
        return <p>Loading...</p>;
    }

    const handleQuestionClick = (questionId) => {
        navigate(`/question-detail/${questionId}`);
    };

    return (
        <div
            className="container"
            style={{
                color: "#023E73",
                marginTop: "20px",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1
                    style={{
                        fontSize: "30px",
                        marginTop: "20px",
                    }}
                >
                    [{tagDetails.name}]
                </h1>
            </div>
            <p>
                {tagDetails.name}: {tagDetails.description}
            </p>
            <div className="row" style={{ marginTop: "30px" }}>
                <div className="col">
                    <p style={{ fontSize: "25px", color: "#666666" }}>
                        {questions.length} questions
                    </p>
                </div>
                <div className="col">
                    <SortBtn />
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "20px",
                    width: "100%",
                }}
            >
                <QuestionFilter filters={filters} onCheckboxChange={handleCheckboxChange} />
            </div>
            <div style={{ marginTop: "20px" }}>
                {Array.isArray(questions) && questions.length > 0 ? (
                    questions.map((question) => {
                        const user = users[question.userQues]; // Lấy thông tin người dùng từ state
                        return (
                            <div
                                key={question._id}
                                onClick={() => handleQuestionClick(question._id)}
                            >
                                <QuestionBox
                                    username={user?.name || "Unknown"}
                                    reputation={user?.reputation || 0}
                                    followers={user?.followerCount || 0}
                                    title={question.title}
                                    tags={question.tags ? question.tags.map(tagId => tags[tagId]?.name || tagId) : []} // Lấy tên tag từ tags map
                                    date={question.updatedAt}
                                    views={question.view}
                                    answers={question.answerCount}
                                    likes={question.upVoteCount}
                                />
                            </div>
                        );
                    })
                ) : (
                    <p>No questions available.</p>
                )}
            </div>
        </div>
    );
};

export default TagsDetailPage;
