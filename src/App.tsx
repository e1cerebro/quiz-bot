import React, { useState, useEffect, Fragment } from 'react';
//components
import QuestionCard from './components/QuestionCard/QuestionCard';
import QuizSummary from './components/QuizSummary/QuizSummary';
// Styles
import {
  GlobalStyle,
  Wrapper,
  SelectWrapper,
  ImageWrapper,
  DisplayFlex,
} from './App.styles';
//images
import Logo from './images/logo.png';
//utilities
import {
  fetchQuizQuestions,
  QUESTIONSTATE,
  DIFFICULTY,
  fetchcategories,
} from './utils/API';
//Typescript types
import { AnswerObject, categoryObject } from './TypeScript/types';
import Button from './components/button/Button';

const TOTAL_QUESTIONS = 10;

const App = () => {
  //APP States
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QUESTIONSTATE[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [remaining, setRemaining] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);
  const [categories, setCategories] = useState<categoryObject[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number>(-1);
  const [difficulty, setDifficulty] = useState<DIFFICULTY>(DIFFICULTY.Easy);

  //Fetch the categories when the components are loaded
  useEffect(() => {
    (async () => {
      const cats = await fetchcategories();
      setCategories(cats.trivia_categories);
    })();
  }, []);

  //Start the quiz
  const startQuiz = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions: QUESTIONSTATE[] = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      difficulty,
      selectedCategory
    );

    if (newQuestions) {
      setQuestions(newQuestions);
      startTimer();
    }

    //reset quiz stats
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const startTimer = () => {
    let startTime: number = 3;

    // Update the count down every 1 second
    let timer = setInterval(function () {
      let seconds: number = startTime--;

      // Output the result in an element with id="demo"
      setRemaining(seconds);

      // If the count down is over, write some text
      if (seconds <= 0) {
        clearInterval(timer);
        setRemaining(0);
        nextQuestion();
      }
    }, 1000);
  };
  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>): void => {
    if (!gameOver) {
      const answer: string = event.currentTarget.innerText;
      //Check if answer matches the correct answer
      let correct = answer === questions[number].correct_answer;
      if (correct) setScore((prev: number) => prev + 1);
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

  const nextQuestion = () => {
    //move to the next if not the last in the array
    const nextQuestion = number + 1;
    //End question if the next question is equal to the total questions length
    if (nextQuestion === TOTAL_QUESTIONS) setGameOver(true);
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
    const difficulty: DIFFICULTY = event.currentTarget.value as DIFFICULTY;
    setDifficulty(difficulty);
  };

  const restartQuiz = () => {
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
    setQuestions([]);
    setGameOver(true);
  };

  return (
    <Fragment>
      <GlobalStyle />
      <Wrapper>
        <ImageWrapper>
          <img alt={'Quiz Bot'} src={Logo} />
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
          <Button type='start' callback={startQuiz}>
            Start Quiz
          </Button>
        ) : null}
        {loading && <p className='loading'>Loading Questions...</p>}
        {!loading && !gameOver && number !== TOTAL_QUESTIONS - 1 && (
          <QuestionCard
            questionNumber={number + 1}
            score={score}
            remaining={remaining}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number]?.question}
            answers={questions[number]?.answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        <DisplayFlex>
          {!gameOver &&
            !loading &&
            userAnswers.length === number + 1 &&
            number !== TOTAL_QUESTIONS - 1 && (
              <Button type='next' callback={nextQuestion}>
                Next
              </Button>
            )}
          {!gameOver && !loading && (
            <Button type='end-game' callback={restartQuiz}>
              Restart
            </Button>
          )}
        </DisplayFlex>
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
