import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const QuestionDetails = () => {
  return (
    <div className="container my-4">
      {/* Phần người đăng */}
      <div className="d-flex align-items-center mb-4">
        <img
          src="https://via.placeholder.com/50"
          alt="User Avatar"
          className="rounded-circle me-3"
          width="50"
          height="50"
        />
        <div>
          <strong>iamRabbit</strong>
          <p className="text-muted mb-0" style={{ fontSize: "0.9em" }}>
            Asked 2 days ago
          </p>
        </div>
      </div>

      {/* Phần tiêu đề câu hỏi */}
      <div className="mb-4">
        <h3>What is the '→' operator in C/C++?</h3>
        <p className="text-secondary">
          <span className="me-3">+20k views</span>
          <span className="text-success me-3">+10k</span>
          <span className="text-danger">-1k</span>
        </p>
      </div>

      {/* Nội dung bài viết */}
      <div className="bg-light p-4 rounded mb-4">
        <p>
          After reading *Hidden Features and Dark Corners of C/C++* on comp.lang.c.moderated, I was
          completely surprised that the following snippet compiled and worked in both Visual Studio
          2008 and G++ 4.4. I would assume this is also valid C since it works in GCC as well.
        </p>
        <div className="bg-dark text-white p-3 rounded">
          <code>
            #include &lt;stdio.h&gt;
            <br />
            int main() &#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;int x = 10;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;while (x --&gt; 0) // x goes to 0
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#123;
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;printf("%d ", x);
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#125;
            <br />
            &#125;
          </code>
        </div>
        <p className="mt-3">Output:</p>
        <div className="bg-light border rounded p-2">
          <code>9 8 7 6 5 4 3 2 1 0</code>
        </div>
        <p className="mt-3">
          Where is this defined in the standard, and where has it come from?
        </p>

        {/* Tags chủ đề */}
        <div className="mt-4">
          <span className="badge bg-primary me-2">C++</span>
          <span className="badge bg-success me-2">Operators</span>
          <span className="badge bg-secondary me-2">Coding Standards</span>
          <span className="badge bg-info text-dark">GCC</span>
        </div>
      </div>

      {/* Phần bình luận */}
      <div className="mb-4">
        <h5 className="mb-3">Comments</h5>
        <div className="border-bottom pb-2 mb-2">
          <div className="d-flex align-items-center mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Commenter Avatar"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <strong>Skware Folux</strong>
          </div>
          <p className="mb-1">
            The most dangerous feature of this construct is that it starts with 9 instead of 10. The
            same is true for `for (int x = 10; x--{'>'}0;)`.
          </p>
          <p className="text-muted" style={{ fontSize: "0.9em" }}>
            Friday 5:36 Apr 26
          </p>
        </div>
        <div className="border-bottom pb-2 mb-2">
          <div className="d-flex align-items-center mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Commenter Avatar"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <strong>Anonymous</strong>
          </div>
          <p className="mb-1">
            I think it's valid in any language which has postfix --. This is 40 year-old running
            joke. Every 2-3 years there is a question about it XD
          </p>
          <p className="text-muted" style={{ fontSize: "0.9em" }}>
            Friday 5:36 Apr 26
          </p>
        </div>
      </div>

      {/* Danh sách câu trả lời */}
      <div>
        <h5 className="mb-3">26 Answers</h5>
        <div className="p-3 border rounded mb-3">
          <div className="d-flex align-items-center mb-2">
            <img
              src="https://via.placeholder.com/40"
              alt="Answerer Avatar"
              className="rounded-circle me-2"
              width="40"
              height="40"
            />
            <div>
              <strong>Bradley Mackey</strong>
              <p className="text-muted mb-0" style={{ fontSize: "0.9em" }}>
                Answered Nov 8, 2022 at 21:16
              </p>
            </div>
          </div>
          <p>
            This is not an operator. It is in fact two separate operators, -- and &gt;.
          </p>
          <p>
            The code in the condition decrements x, while returning x's original (not decremented)
            value, and then compares the original value with 0, using the &gt; operator.
          </p>
          <pre>
            <code>
              // To better understand, the statement could be written as follows:
              <br />
              while ((x--) &gt; 0)
            </code>
          </pre>
          <p>
            I think you wouldn’t really need the parentheses around --, though it does further
            enforce the separation.
          </p>
        </div>
        {/* Thêm các câu trả lời khác */}
      </div>
    </div>
  );
};

export default QuestionDetails;
