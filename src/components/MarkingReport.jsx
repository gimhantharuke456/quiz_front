import React, { useEffect, useState } from "react";
import { Button, Row, Table } from "antd";
import QuizService from "../controllers/quizController";
import "jspdf-autotable";
import moment from "moment";
import jsPDF from "jspdf";
const MarkingReport = () => {
  const [markings, setMarkings] = useState([]);

  useEffect(() => {
    fetchMarkings();
  }, []);

  const fetchMarkings = async () => {
    try {
      const res = await QuizService.getAllQuizzes();
      setMarkings(res);
    } catch (error) {
      console.error("Error fetching markings:", error);
    }
  };

  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Marks",
      dataIndex: "marks",
      key: "marks",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "date",
      render: (createdAt) => new Date(createdAt).toLocaleString(),
    },
  ];

  const generateMarkings = async () => {
    try {
      const response = await QuizService.getAllQuizzes();
      const report = response.map((quiz) => ({
        Email: quiz.email,
        Marks: quiz.marks,
        Date: moment(quiz.createdAt).format("MMMM DD, YYYY"),
      }));
      console.log(report);
      return report;
    } catch (error) {
      console.error("Error generating report:", error);
      return [];
    }
  };

  const generatePDFReport = async () => {
    const report = await generateMarkings();

    const doc = new jsPDF();

    doc.text("Quiz Report", 10, 10);

    const tableData = report.map(({ Email, Marks, Date }) => [
      Email,
      Marks,
      Date,
    ]);

    doc.autoTable({
      startY: 20,
      head: [["Email", "Marks", "Date"]],
      body: tableData,
    });

    doc.save("quiz_report.pdf");
  };

  return (
    <div style={{ padding: 16 }}>
      <Row justify={"space-between"}>
        <h2>Marking Report</h2>
        <Button
          type={"primary"}
          onClick={() => {
            generatePDFReport();
          }}
        >
          Download Report
        </Button>
      </Row>
      <Table dataSource={markings} columns={columns} />
    </div>
  );
};

export default MarkingReport;
