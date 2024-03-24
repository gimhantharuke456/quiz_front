import axios from "axios";

const API_URL = "http://localhost:8080/api";

const QuizService = {
  // Function to create a new quiz
  createQuiz: async (quizData) => {
    try {
      const response = await axios.post(`${API_URL}/quiz`, quizData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Function to get all quizzes
  getAllQuizzes: async () => {
    try {
      const response = await axios.get(`${API_URL}/quiz`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Function to get a single quiz by ID
  getQuizById: async (quizId) => {
    try {
      const response = await axios.get(`${API_URL}/quiz/${quizId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Function to update a quiz
  updateQuiz: async (quizId, quizData) => {
    try {
      const response = await axios.put(`${API_URL}/quiz/${quizId}`, quizData);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },

  // Function to delete a quiz
  deleteQuiz: async (quizId) => {
    try {
      const response = await axios.delete(`${API_URL}/quiz/${quizId}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  },
};

export default QuizService;
