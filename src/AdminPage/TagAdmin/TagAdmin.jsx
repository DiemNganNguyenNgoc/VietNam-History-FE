import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function TagAdmin() {
  const tags = Array(12).fill({
    name: "javascript",
    description:
      "JavaScript (a dialect of ECMAScript) is a high-level, multi-paradigm, object-oriented, prototype-based, dynamically-typed, and interpreted language traditionally used for client-side scripting in web browsers.",
    questions: "2535460 questions",
  });

  return (
    <div className="container my-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Tags</h2>
        <div>
          <input
            type="text"
            className="form-control d-inline-block me-2"
            placeholder="Search by tag name..."
            style={{ width: "300px" }}
          />
          <button className="btn btn-primary">Add new tag</button>
        </div>
      </div>

      {/* Tags Grid */}
      <div className="row">
        {tags.map((tag, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h5 className="card-title text-primary mb-0">{tag.name}</h5>
                  <div>
                    <button className="btn btn-sm btn-light me-1">
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-light">
                      <i className="bi bi-trash text-danger"></i>
                    </button>
                  </div>
                </div>
                <p className="card-text text-muted" style={{ fontSize: "14px" }}>
                  {tag.description}
                </p>
                <span className="text-secondary" style={{ fontSize: "13px" }}>
                  {tag.questions}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagAdmin;
