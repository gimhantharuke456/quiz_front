import React, { useEffect, useState } from "react";
import { Button, Card, Input, Row, Form, message } from "antd";
import QuizService from "../controllers/quizController";
import { useNavigate } from "react-router-dom";

const StudentQuiz = () => {
  const navigate = useNavigate();
  const [quizes, setQuizes] = useState([]);
  const onFinish = (values) => {
    const quiz = quizes.find(
      (quiz) =>
        quiz.email === values.email && quiz.password === values.enrollmentKey
    );
    if (quiz) {
      navigate("/quiz/" + quiz._id);
    } else {
      message.error("Your credentials are wrong");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Validation failed:", errorInfo);
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
    },
  };

  useEffect(() => {
    QuizService.getAllQuizzes().then((res) => setQuizes(res));
  }, []);

  return (
    <div style={{ padding: 16 }}>
      <Row justify="center">
        <Card title="Enroll to Quiz" style={{ width: 400 }}>
          <Form
            name="student_quiz"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            validateMessages={validateMessages}
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="enrollmentKey"
              label="Enrollment Key"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter enrollment key" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Enroll
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Row>
    </div>
  );
};

export default StudentQuiz;
