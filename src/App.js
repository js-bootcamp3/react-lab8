import { useState } from 'react'
import { v4 as uuid } from 'uuid';
import './App.css';

function App() {
  const [question, setQuestion] = useState('')
  const [questionError, setQuestionError] = useState('') 
  const [questionList, setQuestionList] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null)

  const handleChangeQuestion = (event) => {
    const { value } = event.target
    setQuestion(value)
  }

  const handleAddQuestion = () => {
    const trimmed = question.trim();
    if (!trimmed) {
      setQuestionError("Question can't be empty")
      return;
    }

    const payload = {
      name: question,
      id: uuid()
    }
    const updatedQuestion = [...questionList, payload];
    
    setQuestionList(updatedQuestion)
    setQuestion('')
    setQuestionError('')
  }

  const handleRemoveQuestion = (id) => {
    // const filtered = questionList.filter(q => q.id !== id)
    const updatedQuestion = [...questionList];
    const targetIndex = questionList.findIndex(q => q.id === id);
    updatedQuestion.splice(targetIndex, 1)

    setQuestionList(updatedQuestion);
  }

  const handleQuestionClick = (question) => {
    setActiveQuestion(question)
  }

  return (
    <div className="container">
      <h1>Quiz</h1>
      <div className='quiz-form'>
        <input value={question} onChange={handleChangeQuestion} type="text"/>
        <button onClick={handleAddQuestion}>Add</button>
        {questionError && <div className={'error'}>{questionError}</div>}
      </div>

      <div className='questions'>
        {questionList.map(q => (
          <div key={q.id}>
            <span className="question-name" onClick={() => handleQuestionClick(q)}>{q.name}</span> 
            <button onClick={() => handleRemoveQuestion(q.id)}>x</button>
          </div>
        ))}
      </div>

      {activeQuestion && <div id="myModal" className="modal">
        <div className="modal-content">
          <span className="close" onClick={() => setActiveQuestion(null)}>&times;</span>
          <p>{activeQuestion.id}</p>
          <p>{activeQuestion.name}</p>
        </div>
      </div>
      }
    </div>
  );
}

export default App;
