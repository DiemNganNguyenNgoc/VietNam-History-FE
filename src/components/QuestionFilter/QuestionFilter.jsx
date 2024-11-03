// ChecklistFilter.js
import React from 'react';
import ApplyBtn from '../../components/ApplyBtn/ApplyBtn';

const QuestionFilter = ({ filters, onCheckboxChange }) => {

    const handleApplyClick = () => {
        alert('Nút đã được nhấn');
      };

  return (
    <div
      style={{
        marginTop: '30px',
        padding: '10px 20px',
        border: '1px solid #023E73',
        borderRadius: '16px',
        backgroundColor: '#F2F5FF',
        maxWidth: '1000px',
        width: '100%',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        left: '20px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {/* Cột đầu tiên */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h4 style={{ marginBottom: '15px', color: '#121212', fontSize: '20px', fontWeight: '700' }}>
          Filter by
        </h4>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="checkbox"
            name="no_answers"
            checked={filters.no_answers}
            onChange={onCheckboxChange}
          />
          <label style={{ marginLeft: '8px', color: '#121212' }}>No answers</label>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="checkbox"
            name="no_accepted_answer"
            checked={filters.no_accepted_answer}
            onChange={onCheckboxChange}
          />
          <label style={{ marginLeft: '8px', color: '#121212' }}>No accepted answer</label>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="checkbox"
            name="has_bounty"
            checked={filters.has_bounty}
            onChange={onCheckboxChange}
          />
          <label style={{ marginLeft: '8px', color: '#121212' }}>Has bounty</label>
        </div>
      </div>

      {/* Cột thứ hai */}
      <div style={{ flex: 1, marginRight: '20px' }}>
        <h4 style={{ marginBottom: '15px', color: '#121212', fontSize: '20px', fontWeight: '700' }}>
          Sorted by
        </h4>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="checkbox"
            name="newest"
            checked={filters.most_viewed}
            onChange={onCheckboxChange}
          />
          <label style={{ marginLeft: '8px', color: '#121212' }}>Newest</label>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="checkbox"
            name="recent_activity"
            checked={filters.recently_asked}
            onChange={onCheckboxChange}
          />
          <label style={{ marginLeft: '8px', color: '#121212' }}>Recent activity</label>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="checkbox"
            name="highest_score"
            checked={filters.has_media}
            onChange={onCheckboxChange}
          />
          <label style={{ marginLeft: '8px', color: '#121212' }}>Highest score</label>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="checkbox"
            name="most_frequent"
            checked={filters.most_frequent}
            onChange={onCheckboxChange}
          />
          <label style={{ marginLeft: '8px', color: '#121212' }}>Most frequent</label>
        </div>
        <div style={{ marginBottom: '12px' }}>
          <input
            type="checkbox"
            name="bounty_ending_soon"
            checked={filters.bounty_ending_soon}
            onChange={onCheckboxChange}
          />
          <label style={{ marginLeft: '8px', color: '#121212' }}>Bounty ending soon</label>
        </div>
      </div>

      {/* Cột thứ ba */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
  <div>
    <h4 style={{ marginBottom: '15px', color: '#121212', fontSize: '20px', fontWeight: '700' }}>
      Sorted by
    </h4>
    <div style={{ marginBottom: '12px' }}>
      <input
        type="checkbox"
        name="the_following_tags"
        checked={filters.the_following_tags}
        onChange={onCheckboxChange}
      />
      <label style={{ marginLeft: '8px', color: '#121212' }}>The following tags:</label>
    </div>
    <input
      className="form-control"
      type="text"
      placeholder="e.g. javascript, python, ..."
      style={{
        width: '100%',
        height: '35px',
        marginTop: '10px',
        border: '1px solid #023E73',
      }}
    />
  </div>
  <div style={{ position: 'absolute', bottom: '10px', right: '0px' }}>
        <ApplyBtn onClick={handleApplyClick} />
      </div>
    </div>
    </div>
  );
};

export default QuestionFilter;
