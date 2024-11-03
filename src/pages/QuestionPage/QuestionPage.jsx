import React, { useState } from 'react';
import AskQuestionBtn from '../../components/AskQuestionBtn/AskQuestionBtn';
import SortBtn from '../../components/SortBtn/SortBtn';
import QuestionFilter from '../../components/QuestionFilter/QuestionFilter';
import QuestionHolder from '../../components/QuestionHolder/QuestionHolder';

const QuestionPage = () => {
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

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setFilters({
      ...filters,
      [name]: checked,
    });
  };

  const handleAskQuestionClick = () => {
    alert('Nút đã được nhấn');
  };

  return (
    <div
      style={{
        color: '#023E73',
        marginTop: '20px',
        marginLeft: '20px',
        height: 'auto',
        paddingRight: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h1 style={{ 
          fontSize: '30px',
          marginLeft: '20px',
          marginTop: '20px',
          }}
          >
            All Questions
          </h1>
        <AskQuestionBtn onClick={handleAskQuestionClick} />
      </div>
      <p
        style={{
          color: '#323538',
          marginTop: '10px',
          marginLeft: '20px',
          fontSize: '20px',
          fontWeight: '600',
        }}
      >
        2,535,460 questions
      </p>
      <SortBtn />

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', width: '100%' }}>
        <QuestionFilter filters={filters} onCheckboxChange={handleCheckboxChange} />
      </div>
      <QuestionHolder />
    </div>
  );
};

export default QuestionPage;
