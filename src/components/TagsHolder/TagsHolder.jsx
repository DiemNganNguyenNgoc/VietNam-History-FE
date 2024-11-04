import React from 'react';
import TagsBoxComponent from '../../components/TagsBoxComponent/TagsBoxComponent';
// import QuestionBox from '../QuestionBox/QuestionBox';

const tags = [
  {
    id: 1,
    tagsname: "javascript",
    description: "JavaScript (a dialect of ECMAScript) is a high-level, multi-paradigm, object-oriented, prototype-based, dynamically-typed, and interpreted language traditionally used for client-side scripting in web browsers.",
    quantity: 1314,
  },
  {
    id: 2,
    tagsname: "C++",
    description: "dafafa",
    quantity: 1314,
  },
  {
    id: 3,
    tagsname: "C#",
    description: "dafafa",
    quantity: 1314,
  },
];

const TagsHolder = () => {
  return (
    <div style={{ padding: '20px' }}>
      {tags.map((tags) => (
        <TagsBoxComponent
          key={tags.id}
          tagsname={tags.tagsname}
          description={tags.description}
          quantity={tags.quantity}
        />
      ))}
    </div>
  );
};

export default TagsHolder;

