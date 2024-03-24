import axios from "axios";

const API_BASE_URL = "http://localhost:8080/api/questions";

const QuestionService = {
  // Create a new question
  createQuestion: async (questionData) => {
    try {
      const response = await axios.post(API_BASE_URL, questionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Get all questions
  getAllQuestions: async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Get a single question by id
  getQuestionById: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Update a question by id
  updateQuestion: async (id, questionData) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/${id}`, questionData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Delete a question by id
  deleteQuestion: async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};

export default QuestionService;
