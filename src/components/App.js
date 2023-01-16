import React, { useState,useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questionBank, setQuestionBank] = useState([])

  const url = "http://localhost:4000/questions";
  useEffect(() => {
    
    fetch(url)
      .then(resp => resp.json())
      .then(questions => setQuestionBank(questions))
    }, [questionBank]
  )

  function handleAddNewQuestion(newQ){
    setQuestionBank([...questionBank, newQ])
  }

  function handleDeleteQuestion(deletedQuestionId){
    const deletedQuestions = questionBank.filter((question) => question.id !== deletedQuestionId)
    setQuestionBank(deletedQuestions);
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then((r) => r.json())
      .then((updatedQuestion) => {
        const updatedQuestions = questionBank.map((q) => {
          if (q.id === updatedQuestion.id) return updatedQuestion;
          return q;
        });
        setQuestionBank(updatedQuestions);
      });
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? 
      <QuestionForm questionBank={questionBank} onAddNewQuestion = {handleAddNewQuestion}/> 
      : 
      <QuestionList questionBank = {questionBank} onDeleteQuestion = {handleDeleteQuestion} onAnswerChange = {handleAnswerChange}/>}
    </main>
  );
}

export default App;
