import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import StudentQuiz from "./components/StudentQuiz";
import TeacherQuiz from "./components/TeacherQuiz";
import "antd/dist/reset.css";
import Quiz from "./components/Quiz";

const { Header, Content, Footer, Sider } = Layout;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
        {" "}
        {/* Ensure full height */}
        <Sider collapsible>
          {" "}
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link to="/teacher-quiz">Quizes</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/student-quiz">Student Quiz</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header
            style={{
              padding: 0,
              background: "#141A37",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img src={`/logo.png`} alt="Logo" style={{ maxHeight: "44px" }} />
          </Header>
          <Content style={{ margin: "0 16px" }}>
            <Routes>
              <Route exact path="/student-quiz" element={<StudentQuiz />} />
              <Route path="/teacher-quiz" element={<TeacherQuiz />} />
              <Route path="/quiz/:id" element={<Quiz />} />
            </Routes>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            @CodeNexus All rights recieved
          </Footer>
        </Layout>
      </Layout>
    </Router>
  );
}

export default App;
