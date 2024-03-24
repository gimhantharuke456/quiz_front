import { Button, Row } from "antd";
import React from "react";

const StudentQuiz = () => {
  return (
    <div style={{ padding: 16 }}>
      <Row justify={"space-between"}>
        <h4>Add Questions</h4>
        <Button type="primary">Add Question</Button>
      </Row>
    </div>
  );
};

export default StudentQuiz;
