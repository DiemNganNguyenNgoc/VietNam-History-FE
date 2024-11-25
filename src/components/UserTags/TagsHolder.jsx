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
  {
    id: 4,
    tagsname: "Python",
    description: "dafafa",
    quantity: 1314,
  },
  {
    id: 5,
    tagsname: "Java",
    description: "dafafa",
    quantity: 1314,
  },
];

const TagsHolder = () => {
  return (
    <div className="container" style={{ padding: '20px' }}>
      <div className="row">
        {tags.map((tag) => (
          <div className="col-md-3 mb-4" key={tag.id}>
            <TagsBoxComponent
              tagsname={tag.tagsname}
              description={tag.description}
              quantity={tag.quantity}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TagsHolder;
