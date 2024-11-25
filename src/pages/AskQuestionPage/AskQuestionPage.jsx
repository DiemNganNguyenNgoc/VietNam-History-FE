import React, { useState } from 'react';
import '../../css/AskQuestionPage.css';
import SubmitButton from './partials/SubmitButton';
import TextEditor from './partials/TextEditor';

const AskQuestionPage = () => {
  const [titleValue, setTitleValue] = useState('');
  const [problemDetails, setProblemDetails] = useState('');
  const [triedExpecting, setTriedExpecting] = useState('');
  const [tags, setTags] = useState('');

  const handleAskQuestionClick = () => {
    alert('Nút đã được nhấn');
  };

  const handleTitleChange = (e) => {
    setTitleValue(e.target.value);
  };

  const handleTagsChange = (e) => {
    setTags(e.target.value);
  };
  return (
    <div>
      <div className="title-container">
        <h1 className="title">Ask a Question</h1>
      </div>

      <div className="input-container">
        <h1 className="label">
          Question title <span className="asterisk">*</span>
        </h1>
        <h2 className="description">
          Be specific and imagine you're asking a question to another person.
        </h2>
        <input
          type="text"
          className="input-field"
          value={titleValue}
          onChange={handleTitleChange}
        />
      </div>

      <div className="input-container">
        <h1 className="label">
          Problem details <span className="asterisk">*</span>
        </h1>
        <h2 className="description">
          Introduce the problem and expand on what you put in the title. Minimum 20 characters.
        </h2>
        <TextEditor
          value={problemDetails}
          onChange={setProblemDetails}
          placeholder="Describe the problem here..."
        />
      </div>

      <div className="input-container">
        <h1 className="label">
          What did you try and what where you expecting?
        </h1>
        <h2 className="description">
          Describe what you tried, what you expected to happen, and what actually resulted. Minimum 20 characters.
        </h2>
        <TextEditor
          value={triedExpecting}
          onChange={setTriedExpecting}
          placeholder="Describe what you tried and expected here..."
        />
      </div>
      
      <div className="input-container">
        <h1 className="label">Tags</h1>
        <h2 className="description">
        Add up to 5 tags to describe what your question is about. Start typing to see suggestions.
        </h2>
        <input
          type="text"
          className="input-field"
          value={tags}
          onChange={handleTagsChange}
        />
      </div>

      <SubmitButton onClick={handleAskQuestionClick} />
    </div>
  );
};

export default AskQuestionPage;
