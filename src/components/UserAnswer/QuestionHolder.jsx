import React from 'react';
import QuestionBox from '../../components/UserAnswer/QuestionBox';

const questions = [
  {
    id: 1,
    title: "Câu hỏi 1",
    tags: ["javascript", "css"],
    date: "14:59, 01/11/2024",
    comments: 2,
    likes: 20,
  },
  {
    id: 2,
    title: "Câu hỏi 2",
    tags: ["python"],
    date: "12:00, 02/11/2024",
    comments: 7,
    likes: 45,
  },
  {
    id: 3,
    title: "Câu hỏi 3",
    tags: ["C++"],
    date: "9:45, 03/11/2024",
    comments: 0,
    likes: 30,
  },
];

const QuestionHolder = () => {
  return (
    <div style={{ padding: '20px' }}>
      {questions.map((question) => (
        <QuestionBox
          key={question.id}
          title={question.title}
          tags={question.tags}
          date={question.date}
          comments={question.comments}
          likes={question.likes} 
        />
      ))}
    </div>
  );
};

export default QuestionHolder;
