import React from 'react';
import QuestionBoxAdmin from '../QuestionBoxAdmin/QuestionBoxAdmin';

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

const QuestionHolderAdmin = () => {
  return (
    <div style={{ padding: '20px' }}>
      {questions.map((question) => (
        <QuestionBoxAdmin
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
  );
};

export default QuestionHolderAdmin;
