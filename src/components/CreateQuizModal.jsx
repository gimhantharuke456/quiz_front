import React from "react";
import { Modal, Form, Input, Button, message } from "antd";
import Service from "../controllers/quizController";
const CreateQuizModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();

  const handleOk = async () => {
    form
      .validateFields()
      .then(async (values) => {
        const body = {
          email: values.email,
          password: values.password,
        };
        await Service.createQuiz(body)
          .then(() => {
            message.success("Create quiz success");
          })
          .catch((err) => {
            message.error("Create quiz failed");
          });

        form.resetFields();
        onCancel();
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  return (
    <Modal
      open={visible}
      title="Create New Quiz"
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={handleOk}>
          Create
        </Button>,
      ]}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="password"
          label="Password"
          rules={[{ required: true, message: "Please enter the password" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please enter the email" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateQuizModal;
