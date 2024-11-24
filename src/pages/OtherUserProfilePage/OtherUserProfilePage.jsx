import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import FormComponent from "../../components/FormComponent/FormComponent";
import QuestionBox from "../../components/QuestionBox/QuestionBox";


function OtherUserProfilePage() {

    const questions = [
        {
            id: 1,
            title: "Câu hỏi 1",
            tags: ["javascript", "css"],
            username: "User123",
            reputation: "200",
            followers: "200",
            date: "14:59, 01/11/2024",
            views: 150,
            answers: 200,
            likes: 20,
        },
        {
            id: 2,
            title: "Câu hỏi 2",
            tags: ["python"],
            username: "User456",
            reputation: "200",
            followers: "200",
            date: "12:00, 02/11/2024",
            views: 200,
            answers: 200,
            likes: 45,
        },
        {
            id: 3,
            title: "Câu hỏi 3",
            tags: ["C++"],
            username: "User789",
            reputation: "200",
            followers: "200",
            date: "9:45, 03/11/2024",
            views: 350,
            answers: 200,
            likes: 30,
        },
    ];

    return (
        <>
            <div className="container mt-4">
                {/* Avatar và Tên */}
                <div className="row ">
                    <div className="col-3">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Avatar"
                            className="rounded-circle"
                        />
                    </div>
                    <div className="col-9">
                        <div className="row">
                            <h2 className="mt-3">Nguyễn Văn A</h2>
                        </div>
                        <div className="row">
                            <div className="col">
                                <i class="bi bi-calendar"></i>
                                <p>Member for 10 days</p>
                            </div>
                            <div className="col">
                                <i class="bi bi-clock-history"></i>
                                <p>Recent access history: 01/01/2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="container">
                <div className="row">
                    <div className="col-3">
                        <h3 className="title-profile">Summary</h3>

                        <div className="card-profile" style={{ padding: '0 10px' }}>
                            <table className="table table-borderless">
                                <tbody style={{ verticalAlign: 'middle' }}>
                                    <tr>
                                        <td className="fw-bold fs-5">280</td>
                                        <td className="fw-bold fs-5">20</td>
                                    </tr>
                                    <tr className="row-2">
                                        <td className="text-muted">reputation</td>
                                        <td className="text-muted">followers</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold fs-5">11</td>
                                        <td className="fw-bold fs-5">20</td>
                                    </tr>
                                    <tr className="row-2">
                                        <td className="text-muted">saved</td>
                                        <td className="text-muted">following</td>
                                    </tr>
                                    <tr>
                                        <td className="fw-bold fs-5">12</td>
                                        <td className="fw-bold fs-5">12</td>
                                    </tr>
                                    <tr className="row-2">
                                        <td className="text-muted">questions</td>
                                        <td className="text-muted">answers</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="col-9">
                        <div>
                            <h3 className="title-profile">Profile</h3>
                            <div className="card-profile " style={{ padding: '0 20px' }}>
                                <div style={{ marginTop: '30px' }}>
                                    <FormComponent
                                        id="emailInput"
                                        label="Address"
                                        type="text"
                                        placeholder="Enter your address"
                                    />
                                    <FormComponent
                                        id="emailInput"
                                        label="Birthday"
                                        type="date"
                                        placeholder="Enter your birthday"
                                    />
                                    <FormComponent
                                        id="emailInput"
                                        label="About me"
                                        type="text"
                                        placeholder="Introduce yourself"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="title-profile" style={{ marginTop: '30px' }}>Links</h3>
                            <div className="card-profile " style={{ padding: '0 20px' }}>
                                <div className="row">
                                    <div className="col-6">
                                        <FormComponent
                                            id="emailInput"
                                            label="Facebook"
                                            type="link"
                                            placeholder="Enter your Facebook link"
                                            icon={<i class="bi bi-facebook"></i>}
                                        />
                                    </div>
                                    <div className="col-6">
                                        <FormComponent
                                            id="emailInput"
                                            label="Github"
                                            type="link"
                                            placeholder="Enter your Github link"
                                            icon={<i class="bi bi-github"></i>}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="title-profile" style={{ marginTop: '30px' }}>Top questions</h3>
                            <div className="card-profile " style={{ padding: '0 20px' }}>
                                {questions.map((question) => (
                                    <QuestionBox
                                        key={question.id}
                                        title={question.title}
                                        tags={question.tags}
                                        date={question.date}
                                        views={question.views}
                                        answers={question.answers}
                                        likes={question.likes}
                                        username={question.username}
                                        reputation={question.reputation}
                                        followers={question.followers}
                                    />
                                ))}

                            </div>
                        </div>

                        <div>
                            <h3 className="title-profile" style={{ marginTop: '30px' }}>Top answers</h3>
                            <div className="card-profile " style={{ padding: '0 20px' }}>
                                {questions.map((question) => (
                                    <QuestionBox
                                        key={question.id}
                                        title={question.title}
                                        tags={question.tags}
                                        date={question.date}
                                        views={question.views}
                                        answers={question.answers}
                                        likes={question.likes}
                                        username={question.username}
                                        reputation={question.reputation}
                                        followers={question.followers}
                                    />
                                ))}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OtherUserProfilePage;
