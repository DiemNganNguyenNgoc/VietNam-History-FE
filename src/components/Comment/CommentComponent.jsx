import React from 'react';
import { useDispatch, useSelector } from "react-redux";
//const user = useSelector((state) => state.user);

//const commentDetail = useSelector((state) => state.question.detailComment);
  //console.log("Question Detail:", questionDetail);
const Comment = ({id, name,img, text, date }) => {
    return (
      <div className="border-bottom pb-2 mb-2">
        <div className="d-flex align-items-center mb-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Commenter Avatar"
            className="rounded-circle me-2"
            width="40"
            height="40"
          />
          <strong>{name}</strong>
        </div>
        <p className="mb-1">{text}</p>
        <p className="text-muted" style={{ fontSize: "0.9em" }}>
          {date}
        </p>
      </div>
    );
  };
  
  export default Comment;