import React from "react";

function QuestionItem({ question, onDeleteQuestion, onAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;
  const url = "http://localhost:4000/questions";

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDeleteClick(){
    fetch(url + `/${id}`,{
      method:"DELETE"
    })
    .then((r) => r.json())
    .then(question => onDeleteQuestion(question.id))    
  }
  function handleAnswerChange(event) {
    onAnswerChange(id, parseInt(event.target.value));

  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleAnswerChange}>{options} </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
