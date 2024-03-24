import React, { useEffect, useState } from "react";
import QuizService from "../controllers/quizController";
import { useNavigate, useParams } from "react-router-dom";
import QuestionService from "../controllers/quesionController";
import { Button, Card, Spin, message, Radio } from "antd";

const Quiz = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [quiz, setQuiz] = useState();
  const [questions, setQuestions] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [started, setStarted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState(new Map());
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitLoading, setSubmitLoading] = useState(false);
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setDataLoading(true);
      const quiz = await QuizService.getQuizById(params.id);
      const questions = await QuestionService.getAllQuestions();
      setQuestions(questions);
      setQuiz(quiz);
    } catch (error) {
      message.error("Failed to load data.");
    } finally {
      setDataLoading(false);
    }
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setSelectedAnswers(
      (prevAnswers) => new Map(prevAnswers.set(questionId, answerIndex))
    );
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) =>
      Math.min(prevIndex + 1, questions.length - 1)
    );
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const handelQuizSubmit = async () => {
    setSubmitLoading(true);
    try {
      let marks = 0;
      selectedAnswers.forEach((answer, questionId) => {
        const question = questions.find(
          (question) => question._id === questionId
        );
        if (question && answer !== undefined) {
          if (question.correctAnswerIndex === answer) {
            marks++;
          }
        }
      });
      const body = {
        password: quiz.password,
        marks: marks,
        email: quiz.email,
      };
      await QuizService.updateQuiz(quiz._id, body);
      message.success("Quiz submitted successfully");
      navigate("/success");
    } catch (error) {
      message.error("Error submitting your quiz");
    } finally {
      setSubmitLoading(false);
    }
  };

  if (dataLoading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Spin />
      </div>
    );
  }

  return (
    <div style={{ padding: 16, height: "100vh" }}>
      {!started && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button type="primary" onClick={() => setStarted(true)}>
            Start Quiz
          </Button>
        </div>
      )}

      {started && (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Card style={{ width: "80%", marginBottom: 16 }}>
            <p>{questions[currentQuestionIndex].question}</p>
            <Radio.Group
              onChange={(e) =>
                handleAnswerSelect(
                  questions[currentQuestionIndex]._id,
                  e.target.value
                )
              }
              value={selectedAnswers.get(questions[currentQuestionIndex]._id)}
            >
              <div style={{ marginBottom: 8 }}>
                <Radio key={questions[currentQuestionIndex].option_1} value={1}>
                  {questions[currentQuestionIndex].option_1}
                </Radio>
              </div>
              <div style={{ marginBottom: 8 }}>
                <Radio key={questions[currentQuestionIndex].option_2} value={2}>
                  {questions[currentQuestionIndex].option_2}
                </Radio>
              </div>
              <div style={{ marginBottom: 8 }}>
                <Radio key={questions[currentQuestionIndex].option_3} value={3}>
                  {questions[currentQuestionIndex].option_3}
                </Radio>
              </div>
              <div>
                <Radio key={questions[currentQuestionIndex].option_4} value={4}>
                  {questions[currentQuestionIndex].option_4}
                </Radio>
              </div>
            </Radio.Group>
          </Card>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              onClick={handleNextQuestion}
              disabled={currentQuestionIndex === questions.length - 1}
            >
              Next
            </Button>
          </div>
          {currentQuestionIndex === questions.length - 1 && (
            <Button
              loading={submitLoading}
              onClick={handelQuizSubmit}
              type="primary"
            >
              Submit
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
