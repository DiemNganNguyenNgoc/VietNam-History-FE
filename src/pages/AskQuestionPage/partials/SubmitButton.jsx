import React from 'react';
import '../../../css/AskQuestionPage.css';

const SubmitButton = ({ onClick }) => {
  return (
    <button 
      onClick={onClick} 
      className="submit-button"
    >
      Submit Question
    </button>
  );
};

export default SubmitButton;
