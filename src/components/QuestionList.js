import React from "react";
// import { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({questionBank, onDeleteQuestion, onAnswerChange}) {

  const questionsToDisplay = questionBank.map(question => {
      return <QuestionItem key = {question.id} question = {question} onDeleteQuestion={onDeleteQuestion} onAnswerChange = {onAnswerChange}/>
  })
  
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionsToDisplay}</ul>
    </section>
  );
}

export default QuestionList;
