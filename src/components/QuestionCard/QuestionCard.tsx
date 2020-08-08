import React from 'react';
import { Wrapper, BottomWrapper } from './QuestionCard.styles';
import { AnswerObject } from '../../TypeScript/types';
type QuestionCardProps = {
  question: string;
  answers: string[];
  callback: (event: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  score: number;
  questionNumber: number;
  totalQuestions: number;
};
const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  answers,
  score,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  return (
    <>
      {question ? (
        <Wrapper>
          <div className='question-card-top'>
            <p className='number'>
              Question: {questionNumber}/{totalQuestions}
            </p>
            <p className='quiz-current-score'>Score: {score}</p>
          </div>
          <p dangerouslySetInnerHTML={{ __html: question }} />
          <div className='answers'>
            {answers.map((answer: string) => (
              <BottomWrapper
                key={answer}
                correct={userAnswer?.correctAnswer === answer}
                userClicked={userAnswer?.answer === answer}>
                <button
                  value={answer}
                  disabled={userAnswer ? true : false}
                  onClick={callback}>
                  <span dangerouslySetInnerHTML={{ __html: answer }} />
                </button>
              </BottomWrapper>
            ))}
          </div>
        </Wrapper>
      ) : (
        <p>There are no questions for this category</p>
      )}
    </>
  );
};

export default QuestionCard;
