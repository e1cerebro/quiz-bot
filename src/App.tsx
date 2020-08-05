import React, { useState, useEffect } from 'react';
//components
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions, QUESTIONSTATE, DIFFICULTY } from './utils/API';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

export enum ANSWER_STATUS {
  'correct' = 'Correct Answer',
  'wrong' = 'Wrong Answer',
  nothing = '',
}

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QUESTIONSTATE[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [answerStatus, setAnswerStatus] = useState<ANSWER_STATUS>(
    ANSWER_STATUS.nothing
  );

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      DIFFICULTY.Easy
    );

    console.log(newQuestions);

    setQuestions(newQuestions);

    //reset quiz stats
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };
  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!gameOver) {
      const answer: string = event.currentTarget.innerText;
      //Check if answer matches the correct answer
      let correct = answer === questions[number].correct_answer;
      if (correct) {
        setScore((prev: number) => prev + 1);
        setAnswerStatus(ANSWER_STATUS.correct);
      } else {
        setAnswerStatus(ANSWER_STATUS.wrong);
      }
      //save answer in the array of answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };

      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = async () => {
    //move to the next if not the last in the array
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
    setNumber(nextQuestion);
  };

  return (
    <div className='App'>
      <h1>Trivy Trivia</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className='start' onClick={startTrivia}>
          Start Trivia
        </button>
      ) : null}
      {!gameOver && !loading && <p className='score'>Score:{score}</p>}
      {!gameOver && !loading && answerStatus !== ANSWER_STATUS.nothing && (
        <p className='answer-status'> {answerStatus}</p>
      )}
      {loading && <p className='loading'>Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
        !loading &&
        userAnswers.length === number + 1 &&
        number !== TOTAL_QUESTIONS - 1 && (
          <button className='next' onClick={nextQuestion}>
            Next
          </button>
        )}
    </div>
  );
};

export default App;

//font-family: 'Catamaran', sans-serif;
//font-family: 'Fascinate Inline', cursive;
