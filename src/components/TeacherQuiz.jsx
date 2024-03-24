import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  Collapse,
  Row,
  Input,
  Pagination,
  Modal,
  Form,
  Spin,
  message,
  Popconfirm,
} from "antd";
import Title from "antd/es/typography/Title";
import QuestionService from "../controllers/quesionController";
import CreateQuizModal from "./CreateQuizModal";

const { Panel } = Collapse;
const { Search, TextArea } = Input;

const pageSize = 5;

const TeacherQuiz = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dummyQuestions, setDummyQuestions] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState();
  const [createQuizModalOpen, setCreateQuizModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    const filteredQuestions = dummyQuestions.filter((question) =>
      question.question.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const start = (currentPage - 1) * pageSize;
    const currentQuestionsSlice = filteredQuestions.slice(
      start,
      start + pageSize
    );
    setCurrentQuestions(currentQuestionsSlice);
  }, [searchTerm, currentPage, dummyQuestions]);

  const handleEdit = (question) => {
    setSelectedQuestion(question);
    form.setFieldsValue(question);
    showModal();
  };

  const handleDelete = async (question) => {
    setDataLoading(true);
    await QuestionService.deleteQuestion(question._id);
    setDataLoading(false);
    window.location.reload();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        setAddLoading(true);
        if (selectedQuestion) {
          await QuestionService.updateQuestion(selectedQuestion._id, values);
          message.success("Question updated successfully");
        } else {
          await QuestionService.createQuestion({
            ...values,
          });
          message.success("Question added succesfully");
        }
        await QuestionService.getAllQuestions();

        setAddLoading(false);
        setIsModalVisible(false);
        form.resetFields();
        window.location.reload();
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
        setAddLoading(false);
        setIsModalVisible(false);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    try {
      setDataLoading(true);
      QuestionService.getAllQuestions().then((res) => {
        setDummyQuestions(res);
      });
    } catch (err) {
    } finally {
      setDataLoading(false);
    }
  }, []);

  if (dataLoading) {
    return <Spin />;
  }

  return (
    <div style={{ padding: 16 }}>
      <Row justify="space-between">
        <Title>Add Questions</Title>
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            type="primary"
            onClick={() => {
              setCreateQuizModalOpen(true);
            }}
          >
            Mark Report
          </Button>
          <Button
            type="primary"
            onClick={() => {
              setCreateQuizModalOpen(true);
            }}
          >
            Create Quiz
          </Button>

          <Button type="primary" onClick={showModal}>
            Add Question
          </Button>
        </div>
      </Row>
      <Search
        placeholder="Search by question"
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ marginBottom: 16, width: 300 }}
      />
      {currentQuestions.map((question, index) => (
        <Card key={index} style={{ marginTop: 16 }}>
          <Collapse>
            <Panel header={question.question} key={index}>
              <p>{`1. ${question.option_1}`}</p>
              <p>{`2. ${question.option_2}`}</p>
              <p>{`3. ${question.option_3}`}</p>
              <p>{`4. ${question.option_4}`}</p>
              <Button
                onClick={() => handleEdit(question)}
                style={{ marginRight: 8 }}
              >
                Edit
              </Button>

              <Popconfirm
                title="Are you sure you want to delete this question?"
                onConfirm={() => handleDelete(question)}
                okText="Yes"
                cancelText="No"
              >
                <Button danger>Delete</Button>
              </Popconfirm>
            </Panel>
          </Collapse>
        </Card>
      ))}
      <Pagination
        current={currentPage}
        onChange={handlePageChange}
        total={dummyQuestions.length}
        pageSize={pageSize}
        style={{ marginTop: 16, textAlign: "center" }}
      />
      <Modal
        title={selectedQuestion ? "Edit Question" : "Add New Question"}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form form={form} layout="vertical" onFinish={handleOk}>
          <Form.Item
            label="Question"
            name="question"
            rules={[{ required: true, message: "Please input the question!" }]}
          >
            <TextArea rows={2} />
          </Form.Item>
          <Form.Item
            label="Option 1"
            name="option_1"
            rules={[{ required: true, message: "Please input option 1!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Option 2"
            name="option_2"
            rules={[{ required: true, message: "Please input option 2!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Option 3"
            name="option_3"
            rules={[{ required: true, message: "Please input option 3!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Option 4"
            name="option_4"
            rules={[{ required: true, message: "Please input option 4!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Correct Answer Index"
            name="correctAnswerIndex"
            rules={[
              {
                required: true,
                message: "Please select the correct answer index!",
              },
            ]}
          >
            <Input type="number" min={1} max={4} />
          </Form.Item>
          <Form.Item>
            <Button loading={addLoading} type="primary" htmlType="submit">
              {selectedQuestion ? "Edit Question" : "Add Question"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <CreateQuizModal
        visible={createQuizModalOpen}
        onCancel={() => {
          setCreateQuizModalOpen(false);
        }}
      />
    </div>
  );
};

export default TeacherQuiz;
