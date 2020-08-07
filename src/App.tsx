import React, { useState, useEffect, Fragment } from 'react';
//components
import QuestionCard from './components/QuestionCard';
import {
  fetchQuizQuestions,
  QUESTIONSTATE,
  DIFFICULTY,
  fetchcategories,
} from './utils/API';
import {
  GlobalStyle,
  Wrapper,
  ActionControls,
  SelectWrapper,
  ImageWrapper,
} from './App.styles';
import Logo from './images/logo.png';
import QuizSummary from './components/QuizSummary/QuizSummary';

const TOTAL_QUESTIONS = 20;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

export type categoryObject = {
  id: number;
  name: string;
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
  const [categories, setCategories] = useState<categoryObject[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const [difficulty, setDifficulty] = useState<DIFFICULTY>(DIFFICULTY.Easy);

  useEffect(() => {
    (async () => {
      const cats = await fetchcategories();
      setCategories(cats.trivia_categories);
    })();
  }, []);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      difficulty,
      selectedCategory
    );

    if (newQuestions) {
      setQuestions(newQuestions);
    }

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

  const categorySelected = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const category: number = parseInt(event.currentTarget.value);
    setSelectedCategory(category);
  };
  const difficultySelected = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const difficulty = event.currentTarget.value as DIFFICULTY;
    setDifficulty(difficulty);
  };

  const restartQuiz = () => {
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    setQuestions([]);
    setGameOver(true);
    setAnswerStatus(ANSWER_STATUS.nothing);
  };

  return (
    <Fragment>
      <GlobalStyle />
      <Wrapper>
        <ImageWrapper>
          <img
            alt={'Quiz Bot'}
            src={Logo}
            style={{ width: '310px', margin: '10px auto' }}
          />
        </ImageWrapper>
        {gameOver && !loading && (
          <Fragment>
            <SelectWrapper>
              <select className='select' onChange={categorySelected}>
                <option value=''>All Categories</option>
                {categories &&
                  categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
              </select>
            </SelectWrapper>
            <SelectWrapper>
              <select
                className='select'
                id='difficulty'
                onChange={difficultySelected}>
                <option value=''>Select Difficulty</option>
                <option value='easy'>Easy</option>
                <option value='medium'>Medium</option>
                <option value='hard'>Hard</option>
              </select>
            </SelectWrapper>
          </Fragment>
        )}
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <ActionControls>
            <button className='start' onClick={startTrivia}>
              Start Quiz
            </button>
          </ActionControls>
        ) : null}
        {loading && <p className='loading'>Loading Questions...</p>}
        {!loading && !gameOver && number !== TOTAL_QUESTIONS - 1 && (
          <QuestionCard
            questionNumber={number + 1}
            score={score}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number]?.question}
            answers={questions[number]?.answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        <ActionControls>
          {!gameOver &&
            !loading &&
            userAnswers.length === number + 1 &&
            number !== TOTAL_QUESTIONS - 1 && (
              <button className='next' onClick={nextQuestion}>
                Next
              </button>
            )}
          {!gameOver && !loading && (
            <button className='end-game' onClick={restartQuiz}>
              Restart
            </button>
          )}
        </ActionControls>{' '}
        {number === TOTAL_QUESTIONS - 1 && (
          <QuizSummary
            callback={restartQuiz}
            totalScore={score}
            totalQuestions={questions.length}
          />
        )}
      </Wrapper>
    </Fragment>
  );
};

export default App;
